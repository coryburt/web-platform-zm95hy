<?php
/*
 *
 *  deleteSecurity.php
 * 
 * =============================================================== */

if( (@include '../../includes/local_functions.php') != TRUE ):
        require_once 'D:/wamp64/www/external/functions.php';
endif;

require_once 'common.php';
require_once 'connect_sqlsrv.php';
require_once 'D:/wamp64/bin/composer/vendor/autoload.php';

activate_error_reporting();
session_start();

set_time_limit(60*3);      // 3-minute timeout
$_POST = json_decode(file_get_contents('php://input'), true);

$userID = $_SESSION['hr_stipends']['staffID'];
$secID = $_POST['ID'];

$query = <<<EOF
  DELETE FROM sec.USER_CATEGORY
  WHERE BADGE_NUM = '{$secID}'
EOF;

$db = new HR_Stipends_Connect($connection);

if($db->Update($query)) {
  // echo "Successfully deleted security categories from db.";

  $query = <<<EOF
    DELETE FROM sec.USER_ROLES
    WHERE BADGE_NUM = '{$secID}'
  EOF;

  if($db->Update($query)) {
    // echo "Successfully deleted security role from db.";
  } else {
    // echo "Failed to delete security role from db.";
  }

} else {
  // echo "Failed to delete security categories from db.";
};
?>
