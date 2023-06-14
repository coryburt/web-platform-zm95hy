<?php
/*
 *
 *  addPicklist.php
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
      INSERT INTO bsd.ACCOUNT_CODE (ACCOUNT_CODE_GU, ADD_DATE_TIME_STAMP, ADD_ID_STAMP, SUBSET, GENDER, CERTIFICATED, SUBSET_VALUE)
      VALUES (newid(),{$currTimestamp},'{$userID}','{$_POST['SUBSET']}','{$_POST['GENDER']}','{$_POST['CERTIFICATED_CODE']}','{$_POST['SUBSET_VALUE']}')
    EOF;
    break;

  case 'fy':
    $query = <<<EOF
      INSERT INTO bsd.FISCAL_YEAR (YEAR_GU, YEAR_RANGE, ADD_DATE_TIME_STAMP, ADD_ID_STAMP)
      VALUES (newid(),'{$_POST['YEAR_RANGE']}',{$currTimestamp},'{$userID}')
    EOF;
    break;

  case 'loc':
    $query = <<<EOF
      INSERT INTO bsd.LOCATIONS (LOCATION_GU, ADD_DATE_TIME_STAMP, ADD_ID_STAMP, LOCATION_CODE, LOCATION_NAME, STATE_CODE, LOCATION_SHORT_NAME, GRADE_EMH, GRADE_EMH_DESC, GRADE_EMH_SORT)
      VALUES (newid(),{$currTimestamp},'{$userID}','{$_POST['LOCATION_CODE']}','{$_POST['LOCATION_NAME']}','{$_POST['STATE_CODE']}','{$_POST['LOCATION_SHORT_NAME']}','{$_POST['GRADE_EMH']}','{$_POST['GRADE_EMH_DESC']}','{$_POST['GRADE_EMH_SORT']}')
    EOF;
    break;

  case 'prg':
    $query = <<<EOF
      INSERT INTO bsd.PROGRAM (PROGRAM_GU, ADD_DATE_TIME_STAMP, ADD_ID_STAMP, DESCRIPTION, IS_ACTIVITY, IS_SPORT, JOB_DESCRIPTION)
      VALUES (newid(),{$currTimestamp},'{$userID}','{$_POST['DESCRIPTION']}','{$_POST['IS_ACTIVITY']}','{$_POST['IS_SPORT']}','{$_POST['JOB_DESCRIPTION']}')
    EOF;
    break;

  case 'szn':
    $query = <<<EOF
      INSERT INTO bsd.SEASONS (SEASON_GU, ADD_DATE_TIME_STAMP, ADD_ID_STAMP, DESCRIPTION, SORT, START_DATE, END_DATE, YEAR_GU)
      VALUES (newid(),{$currTimestamp},'{$userID}','{$_POST['DESCRIPTION']}','{$_POST['SORT']}','{$_POST['START_DATE']}','{$_POST['END_DATE']}','{$fygu}')
    EOF;
    break;

  case 'stp':
    $query = <<<EOF
      INSERT INTO bsd.STIPENDS (STIPEND_GU, ADD_DATE_TIME_STAMP, ADD_ID_STAMP, DESCRIPTION, PROGRAM_GU, STIPEND_POSITION, SEASON_GU, STIPEND_GRADE, STEP_A, STEP_B, STEP_C, STEP_D, STEP_E, COVID)
      VALUES (newid(),{$currTimestamp},'{$userID}'
        ,'{$_POST['STIPEND_DESCRIPTION']}','{$_POST['PROGRAM_DESCRIPTION']}','{$_POST['STIPEND_POSITION']}'
        ,'{$_POST['SEASON_DESCRIPTION']}','{$_POST['STIPEND_GRADE']}'
        ,'{$_POST['STEP_A']}','{$_POST['STEP_B']}','{$_POST['STEP_C']}'
        ,'{$_POST['STEP_D']}','{$_POST['STEP_E']}','{$_POST['COVID']}')
    EOF;
    break;

  default :
    $query = <<<EOF
      INSERT INTO bsd.LOOKUP_TABLE_VALUE (VALUE_GU, LOOKUP_DEF_GU, VALUE_CODE, VALUE_DESCRIPTION, LOCKED)
      VALUES (newid(),'{$_POST['LOOKUP_DEF_CODE']}','{$_POST['VALUE_CODE']}','{$_POST['VALUE_DESCRIPTION']}','{$_POST['LOCKED']}')
    EOF;
    break;
}

if($db->Insert($query)) {
  echo "Successfully queried db.";
} else {
  echo "Failed to query db.";
};

?>
