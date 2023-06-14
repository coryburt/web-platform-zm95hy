<?php
/*
 *  getRequiredCerts.php
 * 
 *  Gets a Badge Number and fetches a grid-full of required
 *  certifications for that staff member
 * 
 ************************************************************************************** */

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

set_time_limit(60*3);      // 3-minute timeout

if( (@include '../../includes/local_functions.php') != TRUE ):
    require_once 'D:/wamp64/www/external/functions.php';
endif;

require_once 'common.php';
require_once 'connect_sqlsrv.php';

activate_error_reporting();
session_start();

$badge_id = ( isset($_REQUEST['id']) ) ? $_REQUEST['id'] : "";

if( strlen($badge_id) == 0 )
{
    echo "Misconfigured call to getRequiredCerts.php: badge number is required";
    exit();
}
  
$query =<<<EOQ
SELECT DISTINCT
    c.DESCRIPTION                          AS 'CERTIFICATION'
    , CASE c.IS_REQUIRED
    	WHEN '1' THEN 'Y'
    	ELSE 'N'
      END                                  AS 'CURRENT'
    , CONVERT(varchar, sc.START_DATE, 107) AS 'EXP_MID'
    , CONVERT(varchar, sc.END_DATE, 107)   AS 'EXPIRY'
FROM bsd.STIPENDS s 
JOIN bsd.CERTIFICATIONS_REQUIRED cr on s.PROGRAM_GU = cr.PROGRAM_GU 
JOIN bsd.CERTIFICATIONS c ON cr.CERTIFICATION_GU = c.CERTIFICATION_GU 
JOIN bsd.STAFF_CERTS sc ON c.CERTIFICATION_GU = sc.CERTIFICATION_GU 
WHERE sc.END_DATE >= GETDATE() AND sc.BADGE_NUM = '${badge_id}'
EOQ;

$data = array();
$db = new HR_Stipends_Connect($connection);

if( $db->Query($query) ) 
{
    $data = $db->Rows();
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);

?>