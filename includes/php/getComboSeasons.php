<?php
/*
 *  getComboSeasons.php
 *  Version for HR Stipends (and hr_stipends_prototype)
 *  Returns the Seasons list in JSON suitable
 *  for a combo widget or form control.
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

$db = new HR_Stipends_Connect($connection);

$table = (isset($_REQUEST['id']) ) ? $_REQUEST['id'] : '';

$html = "";
$data = array();

$sql  = "SELECT s.SEASON_GU, s.DESCRIPTION 
        FROM bsd.SEASONS s
        WHERE s.INACTIVE = 0 
        AND s.YEAR_GU = (SELECT YEAR_GU FROM bsd.CurrentFiscalYearGU)
        ORDER BY s.SORT asc";

if( $db->Query($sql) )
{
    foreach($db->Rows() as $row)
    {
        $data[] = array(
        'id' => $row['SEASON_GU'],
        'value' => $row['DESCRIPTION']);
    }
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);

?>