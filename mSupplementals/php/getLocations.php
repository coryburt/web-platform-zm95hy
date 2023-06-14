<?php
/*
 *  getLocations.php
 *  Version for HR Stipends (and hr_stipends_prototype)
 *  Returns the appropriate locations in JSON suitable
 *  for a combo widget or form control.
 * 
 * =============================================================== */


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

$db = new HR_Stipends_Connect($connection);

$data = array();

$sql  = "SELECT LOCATION_GU, LOCATION_NAME ";
$sql .= "FROM bsd.LOCATIONS ";
$sql .= "WHERE GRADE_EMH NOT IN ('D', 'E') ";
$sql .= "ORDER BY GRADE_EMH_SORT desc, LOCATION_CODE asc";

if( $db->Query($sql) )
{
    foreach($db->Rows() as $row)
    {
        $data[] = array(
        'id' => $row['LOCATION_GU'],
        'value' => $row['LOCATION_NAME']);
    }
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);

?>
