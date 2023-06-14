<?php
/*
 *  getComboYear.php
 * 
 * =============================================================== */

set_time_limit(60*3);      // 3-minute timeout

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

if( (@include '../../includes/local_functions.php') != TRUE ):
     require_once 'D:/wamp64/www/external/functions.php';
endif;

require_once 'common.php';
require_once 'connect_sqlsrv.php';

activate_error_reporting();
session_start();

$db = new HR_Stipends_Connect($connection);

$current_future = (  isset($_REQUEST['current_future']) )
            ? $_REQUEST['current_future'] : 1;

$data = array();

$clause = "";
$top = "";
if(!$current_future) 
{
    $clause = "WHERE substring(YEAR_RANGE,0,5) <= (SELECT substring(YEAR_RANGE,0,5) FROM bsd.CurrentFiscalYearRange) ";
    $top = "TOP 10";
} 

$sql  = "SELECT ${top} YEAR_GU, YEAR_RANGE ";
$sql .= "FROM bsd.FISCAL_YEAR ${clause}";
$sql .= "ORDER BY YEAR_RANGE DESC";

if( $db->Query($sql) )
{
    foreach($db->Rows() as $row)
    {
        $data[] = array(
        'id' => $row['YEAR_GU'],
        'value' => $row['YEAR_RANGE']);
    }
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);

?>