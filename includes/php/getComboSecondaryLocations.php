<?php
/*
 *  getComboSecondaryLocations.php
 *  If ID is populated, returns taht building Location_GU and Name
 *  Else Returns a list of secondary schools (middle/high) for combo boxes
 * 
 *  By Lucas
 * 
 * =============================================================== */

set_time_limit(60*3);      // 3-minute timeout

if( (@include '../../includes/local_functions.php') != TRUE ):
    require_once 'D:/wamp64/www/external/functions.php';
endif;

require_once 'common.php';
require_once 'connect_sqlsrv.php';

activate_error_reporting();
session_start();

$db = new HR_Stipends_Connect($connection);

$location_code = (isset($_REQUEST['id']) ) ? $_REQUEST['id'] : '';

$html = "";
$data = array();

if( strlen($location_code) > 0 )
{
    if( $db->Query("SELECT * FROM bsd.LOCATIONS l WHERE l.LOCATION_CODE = '${location_code}'") )
    {
        foreach($db->Rows() as $row)
        {
            $data[] = $row;
        }
    }
}
else
{
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
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);

?>
