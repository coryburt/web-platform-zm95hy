<?php
/*
 *  otherSupplementalSubmit.php
 * 
 *  Form handler to save "other" supplementals to the database.
 * 
 * ********************************************************************************** */

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

$data = array(
    'POST'  => array(),
    'OK'    => "",
    'ERR'   => ""
);

$data['POST'] = json_decode(file_get_contents('php://input'), true);

$supp_data = array();

array_push($supp_data, (strlen($data['POST']['supp_gu'])>0) 
    ? $data['POST']['supp_gu'] : null
);

array_push($supp_data, $_SESSION['hr_stipends']['staffID']);
array_push($supp_data, $data['POST']['badge_id']);
array_push($supp_data, $data['POST']['stipend_vc']);
array_push($supp_data, $data['POST']['supp_year_vc']);
array_push($supp_data, $data['POST']['location_vc']);
array_push($supp_data, 'X');    // @STIPEND_GENDER
array_push($supp_data, $data['POST']['freq_vc']);
array_push($supp_data, 0);      // @IS_NONCONTINUING
array_push($supp_data, $data['POST']['split_vc']);
array_push($supp_data, $data['POST']['distrib_vc']);
array_push($supp_data, $data['POST']['comments']);
if( $data['POST']['split_amt'] == "" ):
    array_push($supp_data, 0);
else:
    array_push($supp_data, (int) $data['POST']['split_amt'] );
endif;
array_push($supp_data, 0);      // @IS_EXPERIENCE

//  -------------------------------------------------------------

$db = new HR_Stipends_Connect($connection);

$data['OK'] = $db->Save_Other_Supplemental($supp_data);

if( $data['OK'] < 0 )
{
    $data['ERR'] = $db->LastError();
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);
