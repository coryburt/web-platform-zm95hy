<?php
/*
 *  getActiveCerts.php
 * 
 *  Gets a Badge Number and fetches a grid-full of active
 *  certifications for that staff member
 * 
 *  Built from a product of "Query by Lucas," (pat pend);
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

$where_clause = ( isset($_REQUEST['id']) ) 
                    ? " WHERE ca.BADGE_NUM = '" . $_REQUEST['id'] . "'"
                    : "";

$query =<<<EOQ
SELECT DISTINCT
	c.DESCRIPTION                           AS 'CERTIFICATION'
	, ca.CERT_AQUIRED                       AS 'REQUIRED'
	, CONVERT(varchar, sc.START_DATE, 107)  AS 'VALID'
	, CONVERT(varchar, sc.END_DATE, 107)    AS 'EXPIRY'
FROM bsd.Certs_Aquired ca 
JOIN bsd.CERTIFICATIONS c  ON ca.CERTIFICATION_GU = c.CERTIFICATION_GU 
JOIN bsd.STAFF_CERTS    sc ON ca.CERTIFICATION_GU = sc.CERTIFICATION_GU 
                              AND ca.BADGE_NUM = sc.BADGE_NUM 
${where_clause}
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