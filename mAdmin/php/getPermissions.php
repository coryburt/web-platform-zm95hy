<?php
/*
 *  getPermissions.php
 * 
 *  Receives a Badge Number and echos a
 *  JSON-formatted permissions setd.
 * 
 ************************************************************************************** */

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
    echo "Misconfigured call to getPermissions.php: badge number is required";
    exit();
}
  
$query =<<<EOQ
SELECT 
     ff.FEATURE_CODE 
   , ff.CATEGORY_CODE 
   , ff.IS_PERMITTED 
FROM sec.USER_ROLES ur  
LEFT JOIN sec.USER_CATEGORY uc ON ur.BADGE_NUM = uc.BADGE_NUM 
LEFT JOIN sec.FEATURE_FLAG ff ON uc.CATEGORY_CODE = ff.CATEGORY_CODE 
WHERE ur.BADGE_NUM = '${badge_id}'
EOQ;

$data = array();
$db = new HR_Stipends_Connect($connection);

if( $db->Query($query) ) 
{
    foreach($db->Rows() as $row)
    {
        if( !array_key_exists($row['CATEGORY_CODE'], $data) )
        {
            $data[$row['CATEGORY_CODE']] = array();
        }
        $data[$row['CATEGORY_CODE']][] = array(
            $row['FEATURE_CODE'] => $row['IS_PERMITTED']
        );
    }
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);

?>