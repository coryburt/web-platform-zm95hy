<?php
/*
 *
 *  getAccountCodes.php
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

$YEAR_GU = $_POST['year'];

$db = new HR_Stipends_Connect($connection);

$result = $db->Year_Rollover($YEAR_GU);

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($result);
?>
