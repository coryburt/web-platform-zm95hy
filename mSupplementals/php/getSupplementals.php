<?php
/*
 *  getSupplementals.php
 *  Version for HR Stipends (and HR Stipends Prototype)
 *  Returns the list of supplementals in a format
 *  suitable for rendering as a DHTMLX grid.
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

//  -----------------------------------------------------------------

$suppType = ( isset($_REQUEST['type']) ) ? $_REQUEST['type'] : '';
$allYears = ( isset($_REQUEST['all']) ) ? true : false;
$athOK = ( isset($_REQUEST['athOK']) ) ? true : false;
$oth1OK = ( isset($_REQUEST['oth1OK']) ) ? true : false;

//  -----------------------------------------------------------------

$where_clause = "";
$ath_template = "";
$oth_template = "";

$athButtonTemplate1 =<<<EOB3
    <div class="grid-button">
      <span onClick="SUP.func.ViewAthletic('XXX');">View</span>
    </div>
EOB3;

$othButtonTemplate1 =<<<EOB4
    <div class="grid-button">
      <span onClick="SUP.func.ViewOther('XXX');">View</span>
    </div>
EOB4;

$athButtonTemplate2 =<<<EOB1
    <div class="grid-button">
      <span onClick="SUP.func.EditAthletic('XXX');">Edit</span>
      <span>&puncsp;&#9475;&puncsp;</span>
      <span onClick="SUP.func.CloneAthletic('XXX');">Clone</span>
    </div>
EOB1;

$othButtonTemplate2 =<<<EOB2
    <div class="grid-button">
      <span onClick="SUP.func.EditOther('XXX');">Edit</span>
      <span>&puncsp;&#9475;&puncsp;</span>
      <span onClick="SUP.func.CloneOther('XXX');">Clone</span>
    </div>
EOB2;

//  -----------------------------------------------------------------

if($allYears)
{   // No limiting WHERE-clause: get all years; view-only...
  if( $suppType == "oth" ):
    $where_clause = "WHERE p.IS_SPORT = '0' ";
  elseif( $suppType == "ath" ):
    $where_clause = "WHERE p.IS_SPORT = '1' ";
  endif;
  $ath_template = $athButtonTemplate1;
  $oth_template = $othButtonTemplate1;
}
else // Limiting WHERE-clause: just the current year; editing enabled...
{
  $where_clause = 'WHERE s.YEAR_GU = (SELECT YEAR_GU FROM bsd.CurrentFiscalYearGU)';
  if( $suppType == "oth" ):
    $where_clause .= " AND p.IS_SPORT = '0' ";
  elseif( $suppType == "ath" ):
    $where_clause .= " AND p.IS_SPORT = '1' ";
  endif;
  $ath_template = ($athOK) ? $athButtonTemplate2 : $athButtonTemplate1;
  $oth_template = ($oth1OK) ? $othButtonTemplate2 : $othButtonTemplate1;
}

//  -----------------------------------------------------------------
/*
FROM bsd.SUPPLEMENTALS s
JOIN bsd.STIPENDS s2            ON s.STIPEND_GU = s2.STIPEND_GU 
JOIN bsd.GetLookupValues('STIPENDS','GENDER') g 
*/

$query =<<<EOF
SELECT
    'NA'                                      AS 'SELECTOR'
  , CONCAT(si.LAST_NAME, ', ', si.FIRST_NAME) AS 'STAFF_MEMBER'
  , l.LOCATION_NAME                           AS 'SCHOOL'
  , CASE 
     	WHEN s2.STIPEND_POSITION = 'A' THEN 'ASSISTANT'
     	WHEN s2.STIPEND_POSITION = 'H' THEN 'HEAD'
     	ELSE 'GENERAL'
    END                                       AS 'POSITION'
  , p.DESCRIPTION                             AS 'PROGRAM'
  , g.VALUE_DESCRIPTION                       AS 'GENDER'
  , cc.IS_CLEARED                             AS 'CERTSCLEAR'
  , f.YEAR_RANGE                              AS 'YEAR'
  , s.SUPPLEMENTAL_GU
  , p.IS_SPORT


FROM bsd.SUPPLEMENTALS s
JOIN bsd.SEASONS se ON se.YEAR_GU = s.YEAR_GU
JOIN bsd.STIPENDS s2            ON s.STIPEND_GU = s2.STIPEND_GU 
                                AND s2.SEASON_GU = se.SEASON_GU
JOIN bsd.GetLookupValues('STIPENDS','GENDER') g 
                                ON g.VALUE_CODE = s.STIPEND_GENDER
JOIN bsd.PROGRAM p              ON s2.PROGRAM_GU = p.PROGRAM_GU 
JOIN bsd.StaffInfo si           ON s.BADGE_NUM = si.BADGE_NUM 
JOIN bsd.LOCATIONS l            ON s.LOCATION_GU = l.LOCATION_GU 
LEFT JOIN bsd.Certs_Cleared cc  ON cc.BADGE_NUM = s.BADGE_NUM
			                              AND cc.SUPPLEMENTAL_GU = s.SUPPLEMENTAL_GU
LEFT JOIN bsd.FISCAL_YEAR f     ON s.YEAR_GU = f.YEAR_GU
${where_clause}
ORDER BY si.LAST_NAME ASC
EOF;

$db = new HR_Stipends_Connect($connection);
$data = array();

if( $db->Query($query) )
{
    foreach($db->Rows() as $row)
    {
        $param = $row['SUPPLEMENTAL_GU'];
        if( $row['IS_SPORT'] == 1 ):
          $row['SELECTOR'] = str_replace("XXX", $param, $ath_template);
        else:
          $row['SELECTOR'] = str_replace("XXX", $param, $oth_template);
        endif;
        $data[] = $row;
    }
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);

?>
