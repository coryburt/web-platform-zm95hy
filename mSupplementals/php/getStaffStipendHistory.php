<?php
/*
 *  getStaffStipendHistory.php
 * 
 *  Gets a Badge Number and Stipend GUID and fetches a list
 *  of year-ranges where that badge number received that
 * 	stipend.  Based on bsd.GetExperienceYears, by Lucas,
 * 	(pat pend);
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

$data = array();
$id = $stip = "";

if( isset($_REQUEST['id']) && isset($_REQUEST['stip']) &&
	is_numeric($_REQUEST['id']) && strlen($_REQUEST['stip']) > 0 )
{
	$query  = "SELECT fy.YEAR_RANGE FROM bsd.GetExperienceYears('";
	$query .= $_REQUEST['id']; 
	$query .= "', '";
	$query .= $_REQUEST['stip'];
	$query .= "') g join bsd.FISCAL_YEAR fy ";
	$query .= "ON g.YEAR_GU = fy.YEAR_GU AND fy.IS_CURRENT_YEAR <> 1";
	$db = new HR_Stipends_Connect($connection);
	if( $db->Query($query) ) $data = $db->Rows();
}

header('Content-Type: application/json, charset=UTF-8');
if( count($data) > 0 )
{
	echo json_encode($data);
}
else 
{
	echo json_encode('No Data');
}

?>