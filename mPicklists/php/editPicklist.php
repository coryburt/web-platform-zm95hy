<?php
/*
 *
 *  editPicklist.php
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
$fygu = "";

$db = new HR_Stipends_Connect($connection);
if($db->Query($fyQuery)) {
  foreach($db->Rows() as $row)
  {
      $fygu = $row['YEAR_GU'];
  }
};

switch($plType) {
  case 'ac':
    $query = <<<EOF
      UPDATE bsd.ACCOUNT_CODE
      SET   SUBSET = '{$_POST['SUBSET']}'
          , GENDER = '{$_POST['GENDER']}'
          , CERTIFICATED = '{$_POST['CERTIFICATED_CODE']}'
          , SUBSET_VALUE = '{$_POST['SUBSET_VALUE']}'
          , CHANGE_DATE_TIME_STAMP = {$currTimestamp}
          , CHANGE_ID_STAMP = '{$userID}'
      WHERE ACCOUNT_CODE_GU = '{$plGUID}'
    EOF;
    break;

  case 'fy':
    $query = <<<EOF
    UPDATE bsd.FISCAL_YEAR
    SET   YEAR_RANGE = '{$_POST['YEAR_RANGE']}'
        , CHANGE_DATE_TIME_STAMP = {$currTimestamp}
        , CHANGE_ID_STAMP = '{$userID}'
    WHERE YEAR_GU = '{$plGUID}'
    EOF;
    break;

  case 'loc':
    $query = <<<EOF
      UPDATE bsd.LOCATIONS
      SET   LOCATION_CODE = '{$_POST['LOCATION_CODE']}'
          , LOCATION_NAME = '{$_POST['LOCATION_NAME']}'
          , STATE_CODE = '{$_POST['STATE_CODE']}'
          , LOCATION_SHORT_NAME = '{$_POST['LOCATION_SHORT_NAME']}'
          , GRADE_EMH = '{$_POST['GRADE_EMH']}'
          , GRADE_EMH_DESC = '{$_POST['GRADE_EMH_DESC']}'
          , GRADE_EMH_SORT = '{$_POST['GRADE_EMH_SORT']}'
          , CHANGE_DATE_TIME_STAMP = {$currTimestamp}
          , CHANGE_ID_STAMP = '{$userID}'
      WHERE LOCATION_GU = '{$plGUID}'
    EOF;
    break;

  case 'prg':
    $query = <<<EOF
      UPDATE bsd.PROGRAM
      SET   DESCRIPTION = '{$_POST['DESCRIPTION']}'
          , IS_ACTIVITY = '{$_POST['IS_ACTIVITY']}'
          , IS_SPORT = '{$_POST['IS_SPORT']}'
          , JOB_DESCRIPTION = '{$_POST['JOB_DESCRIPTION']}'
          , CHANGE_DATE_TIME_STAMP = {$currTimestamp}
          , CHANGE_ID_STAMP = '{$userID}'
      WHERE PROGRAM_GU = '{$plGUID}'
    EOF;
    break;

  case 'szn':
    $query = <<<EOF
      UPDATE bsd.SEASONS
      SET   DESCRIPTION = '{$_POST['DESCRIPTION']}'
          , SORT = '{$_POST['SORT']}'
          , START_DATE = '{$_POST['START_DATE']}'
          , END_DATE = '{$_POST['END_DATE']}'
          , CHANGE_DATE_TIME_STAMP = {$currTimestamp}
          , CHANGE_ID_STAMP = '{$userID}'
      WHERE SEASON_GU = '{$plGUID}'
    EOF;
    break;

  case 'stp':
    $query = <<<EOF
      UPDATE bsd.STIPENDS
      SET   DESCRIPTION = '{$_POST['STIPEND_DESCRIPTION']}'
          , PROGRAM_GU = '{$_POST['PROGRAM_DESCRIPTION']}'
          , STIPEND_POSITION = '{$_POST['STIPEND_POSITION']}'
          , SEASON_GU = '{$_POST['SEASON_DESCRIPTION']}'
          , STIPEND_GRADE = '{$_POST['STIPEND_GRADE']}'
          , STEP_A = '{$_POST['STEP_A']}'
          , STEP_B = '{$_POST['STEP_B']}'
          , STEP_C = '{$_POST['STEP_C']}'
          , STEP_D = '{$_POST['STEP_D']}'
          , STEP_E = '{$_POST['STEP_E']}'
          , COVID = '{$_POST['COVID']}'
          , CHANGE_DATE_TIME_STAMP = {$currTimestamp}
          , CHANGE_ID_STAMP = '{$userID}'
      FROM bsd.STIPENDS s
      JOIN bsd.SEASONS se ON se.SEASON_GU = s.SEASON_GU
      WHERE STIPEND_GU = '{$plGUID}' AND se.YEAR_GU = '{$fygu}'
    EOF;
    break;

  default :
    $query = <<<EOF
      UPDATE bsd.LOOKUP_TABLE_VALUE
      SET   VALUE_CODE = '{$_POST['VALUE_CODE']}'
          , VALUE_DESCRIPTION = '{$_POST['VALUE_DESCRIPTION']}'
          , LOCKED = '{$_POST['LOCKED']}'
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
