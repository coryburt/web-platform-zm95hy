<?php
/*
 *  getPicklist.php
 * 
 * =============================================================== */

set_time_limit(60*3);      // 3-minute timeout

if( session_status() != PHP_SESSION_ACTIVE ):
    session_start();
endif;

if( (@include '../../includes/local_functions.php') != TRUE ):
    require_once 'D:/wamp64/www/external/functions.php';
endif;
require_once 'common.php';
activate_error_reporting();
include_once 'connect_sqlsrv.php';

// $specific_table = 'hr_stipends.bsd.ACCOUNT_CODE';
$specific_table = "hr_stipends.bsd." . ((isset($_REQUEST['table']) ) ? $_REQUEST['table'] : '');
$SS = new HR_Stipends_Connect($connection);
$sqlsrv_tableList = $SS->Tables();

if( in_array($specific_table, $sqlsrv_tableList) )
{
    list($data['columns'], $data['data']) = $SS->TableToGrid($specific_table);
} else {
    list($data['columns'], $data['data']) = $SS->TableToGrid("hr_stipends.bsd.LOOKUP_TABLE_VALUE");
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);


?>
