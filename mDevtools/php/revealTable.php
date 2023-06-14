<?php
/*
 *  revealTable.php
 *  Version for HR Stipends Prototype
 *  Returns an HTML list of database tables in the project, OR
 *  returns the contents of those tables for display.
 * 
 * =============================================================== */

set_time_limit(60*3);      // 3-minute timeout

if( session_status() != PHP_SESSION_ACTIVE ):
endif;

if( (@include '../../includes/local_functions.php') != TRUE ):
    require_once 'D:/wamp64/www/external/functions.php';
endif;
require_once 'common.php';

activate_error_reporting();
session_start();

include_once 'connect_sqlsrv.php';

$specific_table = (isset($_REQUEST['table']) ) ? $_REQUEST['table'] : '';

$SS = new HR_Stipends_Connect($connection);
$sqlsrv_tableList = $SS->Tables();

if( strlen($specific_table) == 0 )
{
    $all_tables = array();
    $html = "";
    $data = array();

    foreach($sqlsrv_tableList as $table)
    {
        $y[] = '<div class="link-like" onClick="GetTable(\''.$table.'\')">'.$table.'</div>';
    }
    $html  = '<div id="meta-data-nav">';
    $html .= '<div id="meta-data-nav-header">TABLE LIST</div>';
    $html .= implode("\n", $y);
    $html .= '</div>';
    echo $html;
}
else
{
    if( in_array($specific_table, $sqlsrv_tableList) )
    {
        list($data['columns'], $data['data']) = $SS->TableToGrid($specific_table);
    }

    header('Content-Type: application/json, charset=UTF-8');
    echo json_encode($data);
}

?>
