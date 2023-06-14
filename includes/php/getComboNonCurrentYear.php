<?php
/*
 *  getComboNonCurrentYear.php
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

$data = array();

$sql  = "SELECT YEAR_GU, YEAR_RANGE ";
$sql .= "FROM bsd.FISCAL_YEAR ";
$sql .= "WHERE YEAR_GU NOT IN (SELECT YEAR_GU FROM bsd.CurrentFiscalYearGU) ";
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