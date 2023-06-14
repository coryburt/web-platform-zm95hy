<?php
/*
 *  getComboLookup.php
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

$db = new HR_Stipends_Connect($connection);


$lookup_table = (isset($_REQUEST['id']) ) ? $_REQUEST['id'] : '';

$html = "";
$result = array();

$sql  = "SELECT VALUE_CODE, VALUE_DESCRIPTION ";
$sql .= "FROM bsd.GetLookupValues('SECURITY','{$lookup_table}') WHERE VALUE_CODE != 'SUPER' ORDER BY VALUE_CODE";

if( $db->Query($sql) )
{
    $rows = $db->Rows();
    if( count($rows) > 0 )
    {
        foreach($rows as $row)
        {
            $result[] = array(
                'id'    => $row['VALUE_CODE'],
                'value' => $row['VALUE_DESCRIPTION']
            );
        }
    }
    else 
    {
        $result[] = array( 'id' => "ERROR", 'value' => 'No data' );
    }
}
else 
{
    $result[] = array( 'id' => "ERROR", 'value' => $db->LastError() );
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($result);

?>