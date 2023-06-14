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

$user = $_SESSION['STIPEND']['USER_ID'];
$badge = $_POST['badge_id'];
$stipend = $_POST['stipend'];
$year = $_POST['year'];
$location = $_POST['location'];
$gender = $_POST['gender'];
$pay_frequency = $_POST['frequency'];
$is_noncontinuing = $_POST['non_continuing'];
$split = $_POST['split'];
$distribution = $_POST['distribution'];
$comments = $_POST['comments'];

$split_other_ammount = $_POST['LOCATION_GU'];


$query =<<<EOF
exec bsd.Supplemental_Transact null,$user,$badge,$stipend,null,$location,$gender,$pay_frequency,$is_noncontinuing,$split,$distribution,$comments,$split_other_ammount,null;
EOF;

$db = new HR_Stipends_Connect($connection);

$db->Query($query);

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);

?>
