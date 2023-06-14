<?php
/*
 *
 *  addSecurity.php
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

$query = <<<EOF
  IF NOT EXISTS(SELECT * FROM sec.USER_ROLES WHERE BADGE_NUM = '{$_POST['NAME']}')
  BEGIN
    INSERT INTO sec.USER_ROLES (BADGE_NUM, ROLE_CODE)
    VALUES ('{$_POST['NAME']}','{$_POST['ROLE_CODE']}')
  END
EOF;

$db = new HR_Stipends_Connect($connection);

if($db->Insert($query)) {
  echo "Successfully added security role to db.";

  // INSERT All Category
  if ($_POST['CATEGORY_ALL']) {
    $query = <<<EOF
      IF NOT EXISTS(SELECT * FROM sec.USER_CATEGORY WHERE BADGE_NUM = '{$_POST['NAME']}' AND CATEGORY_CODE = 'ALL')
      BEGIN
        INSERT INTO sec.USER_CATEGORY (BADGE_NUM, CATEGORY_CODE)
        VALUES ('{$_POST['NAME']}','ALL')
      END
    EOF;

    if($db->Insert($query)) {
      echo "Successfully added All category to db.";
    } else {
      echo "Failed to add All category to db.";
    };
  }

  // INSERT Athletic Category
  if ($_POST['CATEGORY_ATH']) {
    $query = <<<EOF
      IF NOT EXISTS(SELECT * FROM sec.USER_CATEGORY WHERE BADGE_NUM = '{$_POST['NAME']}' AND CATEGORY_CODE = 'ATH')
      BEGIN
        INSERT INTO sec.USER_CATEGORY (BADGE_NUM, CATEGORY_CODE)
        VALUES ('{$_POST['NAME']}','ATH')
      END
    EOF;

    if($db->Insert($query)) {
      echo "Successfully added Athletic category to db.";
    } else {
      echo "Failed to add Athletic category to db.";
    };
  }

  // INSERT Other Category
  if ($_POST['CATEGORY_OTH']) {
    $query = <<<EOF
      IF NOT EXISTS(SELECT * FROM sec.USER_CATEGORY WHERE BADGE_NUM = '{$_POST['NAME']}' AND CATEGORY_CODE = 'OTH')
      BEGIN
        INSERT INTO sec.USER_CATEGORY (BADGE_NUM, CATEGORY_CODE)
        VALUES ('{$_POST['NAME']}','OTH')
      END
    EOF;

    if($db->Insert($query)) {
      echo "Successfully added Other category to db.";
    } else {
      echo "Failed to add Other category to db.";
    };
  }

} else {
  echo "Failed to add security role to db.";
};


?>
