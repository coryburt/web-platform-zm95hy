<?php
/*
 *  getExperience.php
 * 
 *  Gets a Badge Number and fetches a grid-full of experience
 *  info for that staff member.  It's purpose is to populate
 *  the experience grid in the athletic supplementals form.
 * 
 *  Built from a product of "Query by Lucas," (pat pend);
 *  
************************************************************************************** */

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

$where_clause = "";

if( isset($_REQUEST['id']) && isset($_REQUEST['stip']) )
{
	$where_clause  = "WHERE e.BADGE_NUM = '" . $_REQUEST['id'] . "' ";
	$where_clause .= "AND e.STIPEND_GU = '" . $_REQUEST['stip'] . "'";
}
  
$query =<<<EOQ
SELECT 
	e.EXPERIENCE
	, e.STEP
	, isnull(
		FORMAT(e.STEP_AMOUNT, 'C'), 
		'$0.00'
	  )											AS STEP_AMOUNT
	, isnull(e.LONGEVITY, 'N')					AS LONGEVITY
	, isnull(
		FORMAT(e.LONGEVITY_AMOUNT, 'C'), 
		'$0.00'
	  )											AS LONGEVITY_AMOUNT
	, isnull(
		FORMAT(
			isnull(e.STEP_AMOUNT,0) + 
				isnull(e.LONGEVITY_AMOUNT,0), 
			'C'
		),
		'$0.00'
	  ) 										AS TOTAL
FROM bsd.Experience e
${where_clause}
EOQ;

$data = array();
$db = new HR_Stipends_Connect($connection);

if( $db->Query($query) ) 
{
    $tmp = $db->Rows();
	if( count($tmp)>0 ) $data = array_pop($tmp);
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);

?>