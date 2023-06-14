<?php
/*
 *
 *  fetchAppSession.php
 *  Put stuff into $_SESSION...
 * 
 * **************************************************************************** */

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
 
set_time_limit(60*3);      // 3-minute timeout

if( (@include '../../includes/local_functions.php') != TRUE ):
    require_once 'D:/wamp64/www/external/functions.php';
endif;
require_once 'common.php';
require_once 'connect_sqlsrv.php';

activate_error_reporting();
session_start();

$app = ( isset($_REQUEST['appname']) && $_REQUEST['appname'] ) ? $_REQUEST['appname'] : 'hr_stipends';

$staffID = $_SESSION[$app]['staffID'];

//  Use $staffID to query the database to get the
//  "role" and "category" values for this staff
//  member.  These are then added to $_SESSION[$app]

$db = new HR_Stipends_Connect($connection);
$year = (isset($_SESSION[$app]['fiscalYear']) ) ? $_SESSION[$app]['fiscalYear'] : "";

if( strlen($year) == 0 && $db->FiscalYear() )
{
    $tmp = $db->Rows();
    $year = $tmp[0]['YEAR_RANGE'];
}

$_SESSION[$app]['fiscalYear'] = $year;

header('Content-Type: application/json, charset=UTF-8');
echo( json_encode( $_SESSION[$app] ) );

?>