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

$from = $_GET['from'];
$limit = $_GET['limit'];
$prepare = $_GET['prepare'];
$form = $_GET['query'];

$field_options = array(
    'badge_id'=>' sf.BADGE_NUM = ',
    'stipend_gu'=>' st.STIPEND_GU = ',
    'year'=>' yr.YEAR_GU = ',
    'location'=>' lo.LOCATION_GU = ',
    'gender'=>' g.VALUE_CODE = ',
    'non_continuing'=>' su.IS_NONCONTINUING = ',
    'distribution'=>' su.DISTRIBUTION = ',
    'frequency'=>' su.PAY_FREQUENCY = ',
    'split'=>' su.SPLIT_TYPE = '

);

$where_list = array();

$form_fields = json_decode($form);

foreach($form_fields as $key=>$value) {
    if($value!='' && isset($field_options[$key])) {
        if(sizeof($where_list) < 1)
        {
            $insert = (" WHERE " . $field_options[$key]."'".$value."'");
            array_push($where_list,$insert);
        } else {
            $insert = (" and " . $field_options[$key]."'".$value."'");
            array_push($where_list,$insert);
        }
    }
}

$where = implode($where_list);

$query =<<<EOF
SELECT su.SUPPLEMENTAL_GU as id, sf.BADGE_NUM, CONCAT(sf.FIRST_NAME, ' ', sf.LAST_NAME) as COACH,
lo.LOCATION_NAME, pr.DESCRIPTION as PROGRAM_DESC, g.VALUE_DESCRIPTION as GENDER,
p.VALUE_DESCRIPTION as POSITION_DESC, yr.YEAR_RANGE
FROM bsd.SUPPLEMENTALS su 
JOIN bsd.StaffInfo sf ON sf.BADGE_NUM = su.BADGE_NUM
JOIN bsd.STIPENDS st ON st.STIPEND_GU = su.STIPEND_GU
JOIN bsd.PROGRAM pr ON pr.PROGRAM_GU = st.PROGRAM_GU
JOIN bsd.LOCATIONS lo ON lo.LOCATION_GU = su.LOCATION_GU
JOIN bsd.FISCAL_YEAR yr ON yr.YEAR_GU = su.YEAR_GU
JOIN bsd.GetLookupValues('STIPENDS','GENDER') g ON g.VALUE_CODE = su.STIPEND_GENDER
JOIN bsd.GetLookupValues('STIPENDS','POSITION') p ON p.VALUE_CODE = st.STIPEND_POSITION
$where
ORDER BY sf.BADGE_NUM, lo.LOCATION_CODE, pr.DESCRIPTION, yr.YEAR_RANGE
EOF;

$db = new HR_Stipends_Connect($connection);
$data = array( 'data' => array(), 'total_count' => '', 'from' => intval($from) );

if( $db->Query($query) )
{
    foreach($db->Rows() as $row)
    {
        // $row['SELECTOR'] = str_replace("XXX", $row['SUPPLEMENTAL_GU'], $buttonTemplate);
        $data['data'][] = $row;
    }
}

$data['total_count'] = intval(sizeof($data['data']));

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);

?>
