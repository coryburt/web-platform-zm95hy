<?php
/*
 *  athleticSupplementalSubmit.php
 * 
 *  Form handler to save athletic supplementals to the database.
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

// ---------------------------------------------------------------------------
function Nil($str)
{
    if( strlen($str) == 0 ) return(null);
    return $str;
}
// ---------------------------------------------------------------------------

$db = new HR_Stipends_Connect($connection);

$post = array();
$results = array(
    'RCVD'  => array(),
    'SENT'  => array(),
    'OK'    => array(),
    'ERR'   => array()
);

$post = json_decode(file_get_contents('php://input'), true);

$post['id_stamp'] = $_SESSION['hr_stipends']['staffID'];

foreach($post['supp_year'] as $supp_year_vc)
{
    $supp_data = array();

    $post['supp_year_vc'] = $supp_year_vc;

    array_push($supp_data, Nil($post['supp_gu']));
    array_push($supp_data, $post['id_stamp']);
    array_push($supp_data, $post['badge_id']);
    array_push($supp_data, $post['stipend_vc']);
    array_push($supp_data, $supp_year_vc);
    array_push($supp_data, $post['location_vc']);
    array_push($supp_data, $post['gender_vc']);
    array_push($supp_data, $post['freq_vc']);
    array_push($supp_data, (int) $post['non_cont']);
    array_push($supp_data, Nil($post['split_vc']));
    array_push($supp_data, Nil($post['distrib_vc']));
    array_push($supp_data, Nil($post['comments']));
    
    if( $post['split_amt'] == "" ):
        array_push($supp_data, 0);
    else:
        array_push($supp_data, (int) $post['split_amt'] );
    endif;
    
    array_push($supp_data, (int) $post['is_expr']);

    $results['SENT'][] = $supp_data;
    $results['RCVD'][] = $post;
       
    $ok = $db->Save_Athletic_Supplemental($supp_data);

    array_push($results['OK'], $ok);
    array_push($results['ERR'], $db->LastError());
}


// ------------------------------------------------------------------------

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($results);