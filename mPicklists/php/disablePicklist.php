<?php
/*
 *
 *  disablePicklist.php
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
$plGUID = $_POST['GUID'];
$plType = $_POST['TYPE'];
$query = "";
$currTimestamp = "convert(smalldatetime,CURRENT_TIMESTAMP)";
$fyQuery = "SELECT YEAR_GU FROM bsd.CurrentFiscalYearGU";

$db = new HR_Stipends_Connect($connection);
if($db->Query($fyQuery)) {
  foreach($db->Rows() as $row)
  {
      $fygu = $row['YEAR_GU'];
  }
};

/* 
 * Picklists w/Locks or inactive:
 * 
 * Account Codes - None
 * Fiscal Year - None
 * Locations - INACTIVE
 * Program - INACTIVE
 * Season - INACTIVE
 * Stipend - INACTIVE
 * Lookup Table Values - INACTIVE & LOCKED
 * 
 * */

switch($plType) {
  case 'ac':
    // SKIP: No disabled/inactive fields present in table
    break;

  case 'fy':
    // SKIP: No disabled/inactive fields present in table
    break;

  case 'loc':
    $query = <<<EOF
      UPDATE bsd.LOCATIONS
      SET INACTIVE = 1, CHANGE_DATE_TIME_STAMP = {$currTimestamp}, CHANGE_ID_STAMP = '{$userID}'
      WHERE LOCATION_GU = '{$plGUID}'
    EOF;
    break;

  case 'prg':
    $query = <<<EOF
      UPDATE bsd.PROGRAM
      SET INACTIVE = 1, CHANGE_DATE_TIME_STAMP = {$currTimestamp}, CHANGE_ID_STAMP = '{$userID}'
      WHERE PROGRAM_GU = '{$plGUID}'
    EOF;
    break;

  case 'szn':
    $query = <<<EOF
      UPDATE bsd.SEASONS
      SET INACTIVE = 1, CHANGE_DATE_TIME_STAMP = {$currTimestamp}, CHANGE_ID_STAMP = '{$userID}'
      WHERE SEASON_GU = '{$plGUID}'
    EOF;
    break;

  case 'stp':
    $query = <<<EOF
      UPDATE bsd.STIPENDS
      SET INACTIVE = 1, CHANGE_DATE_TIME_STAMP = {$currTimestamp}, CHANGE_ID_STAMP = '{$userID}'
      FROM bsd.STIPENDS s
      JOIN bsd.SEASONS se ON se.SEASON_GU = s.SEASON_GU
      WHERE STIPEND_GU = '{$plGUID}' AND se.YEAR_GU = '{$fygu}'
    EOF;
    break;

  default :
    $query = <<<EOF
      UPDATE bsd.LOOKUP_TABLE_VALUE
      SET INACTIVE = 1
      WHERE VALUE_GU = '{$plGUID}'
    EOF;
    break;
}

if($db->Update($query)) {
  echo "Successfully queried db.";
} else {
  echo "Failed to query db.";
};
?>
