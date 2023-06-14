<?php
/*
 *  getSupplementalDetails.php
 *  Version for HR Stipends (and HR Stipends Prototype)
 *  Returns the data from a supplemental in a form
 *  suitable for loading into an edit form.
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

$gu = (isset($_REQUEST['gu']) ) 
        ? " WHERE s.SUPPLEMENTAL_GU = '".$_REQUEST['gu']."'" 
        : '';

$data = [ 'data' => [], 'error' => "" ];

if( strlen($gu) == 0 )
{
  $data['error'] = "Request misconfigured; must pass a supplement guid";
  header('Content-Type: application/json, charset=UTF-8');
  echo json_encode($ret);
  exit();
}

$columns = [
  "badge_id", "name", 
  "location",
  "non_cont", "distrib", 
  "freq", "split", 
  "comments", "gender",
  "stipend_vc", "stipend",
  "location_vc", "supp_year",
  "supp_year_vc", "is_expr",
  "supp_gu"
];

$query =<<<EOQ
SELECT
    s.BADGE_NUM                               AS '{$columns[0]}'
  , CONCAT(si.LAST_NAME, ', ', si.FIRST_NAME) AS '{$columns[1]}'
  , l.LOCATION_NAME                           AS '{$columns[2]}'
  , s.IS_NONCONTINUING                        AS '{$columns[3]}'
  , s.DISTRIBUTION                            AS '{$columns[4]}'
  , s.PAY_FREQUENCY                           AS '{$columns[5]}'
  , s.SPLIT_TYPE                              AS '{$columns[6]}'
  , s.COMMENTS                                AS '{$columns[7]}'
  , s.STIPEND_GENDER                          AS '{$columns[8]}'
  , s.STIPEND_GU                              AS '{$columns[9]}'
  , st.DESCRIPTION                            AS '{$columns[10]}'
  , s.LOCATION_GU                             AS '{$columns[11]}'
  , f.YEAR_RANGE                              AS '{$columns[12]}'
  , s.YEAR_GU                                 AS '{$columns[13]}'
  , s.IS_EXPERIENCE                           AS '{$columns[14]}'
  , s.SUPPLEMENTAL_GU                         AS '{$columns[15]}'
FROM bsd.SUPPLEMENTALS s
JOIN bsd.StaffInfo si           ON s.BADGE_NUM = si.BADGE_NUM 
JOIN bsd.STIPENDS st            ON s.STIPEND_GU = st.STIPEND_GU
JOIN bsd.LOCATIONS l            ON s.LOCATION_GU = l.LOCATION_GU
LEFT JOIN bsd.FISCAL_YEAR f     ON s.YEAR_GU = f.YEAR_GU 
${gu}
EOQ;

$db = new HR_Stipends_Connect($connection);

if( $db->Query($query) )
{
  $data['data'] = array_pop($db->Rows());
}
else
{
  $data['error'] = sprintf("No Data [%s]", $db->LastError());
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);

?>
