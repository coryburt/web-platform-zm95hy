<?php
/*
 *  getCurrentYear.php
 *  Version for HR Stipends (and hr_stipends_prototype)
 *  Returns the current fiscal year.
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

if( $db->FiscalYear() )
{
    $data = $db->Rows();
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode( $data );

?>
