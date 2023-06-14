<?php
/*
 *  getComboStaff.php
 * 
 *  By: Lucas
 *  Mods: Cory
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

$result_type = "staff";
$where_clause = "";

$and_clauses = array();

if(isset($_REQUEST['type']) && stristr($_REQUEST['type'], 'badge') !== false ):
    $result_type = "badge";
endif;

if( isset($_REQUEST['id']) ):
    $and_clauses[] = "si.BADGE_NUM = '".$_REQUEST['id']."'";
endif;

if( ! isset($_REQUEST['all']) ):
    $and_clauses[] = "si.HAS_REGULAR_CONTRACT = '1'";
endif;

if( count($and_clauses) > 0 ):
    $where_clause = "WHERE " . implode(' AND ', $and_clauses);
endif;

$query =<<<EOQ
SELECT
    si.BADGE_NUM
  , si.LAST_NAME
  , si.FIRST_NAME
  , si.MIDDLE_NAME
FROM bsd.StaffInfo si
${where_clause}
ORDER BY si.LAST_NAME, si.FIRST_NAME
EOQ;

$html = "";
$data = array();

try {
    $db = new HR_Stipends_Connect($connection);
    if( $db->Query($query) )
    {
        $next = array();
        foreach($db->Rows() as $row)
        {
            $next['id'] = $row['BADGE_NUM'];
            $next['value'] = ($result_type == "staff")
                                ? Sort_Name($row['LAST_NAME'], $row['FIRST_NAME'], $row['MIDDLE_NAME'])
                                : $row['BADGE_NUM'];
            $data[] = $next;
        }
    }
} catch(Exception $e) {
    $data[] = array( 
        'id' => 'ERR', 
        'value' => $e->getMessage()
    );
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);

?>