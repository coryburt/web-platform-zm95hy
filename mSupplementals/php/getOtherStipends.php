<?php
/*
 *  getOtherStipends.php
 * 
 *  Gets a Badge Number and fetches a grid-full of stipend
 *  info for that staff member
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

$where_clause = ( isset($_REQUEST['id']) ) 
                    ? " AND s.BADGE_NUM = '" . $_REQUEST['id'] . "'"
                    : "";

// $columns = [
//     [
//         "id" => "SSN",
//         "header" => [ ["text" => "School"] ]
//     ],
//     [  
//         "id" => "POSITION",
//         "header" => [ ["text" => "Position"] ],
//         "width" => 70
//     ], 
//     [
//         "id" => "PROGRAM",
//         "header" => [ ["text" => "Program"] ],
//         "width" => 90
//     ],
//     [
//         "id" => "GENDER",
//         "header" => [ ["text" => "Gender"] ],
//         "width" => 120
//     ],
// ];
  
$query =<<<EOQ
SELECT 
      l.LOCATION_NAME                        AS SSN
      , CASE 
            WHEN s2.STIPEND_POSITION = 'A' 
                THEN 'ASSISTANT'
            WHEN s2.STIPEND_POSITION = 'H' 
                THEN 'HEAD'
            ELSE 'GENERAL'
        END                                  AS POSITION
    , p.DESCRIPTION                          AS PROGRAM
    , g.VALUE_DESCRIPTION                    AS GENDER
FROM bsd.SUPPLEMENTALS s
JOIN bsd.STIPENDS s2            ON s.STIPEND_GU = s2.STIPEND_GU 
JOIN bsd.GetLookupValues('STIPENDS','GENDER') g 
                                ON g.VALUE_CODE = s.STIPEND_GENDER
JOIN bsd.PROGRAM p              ON s2.PROGRAM_GU = p.PROGRAM_GU 
JOIN bsd.LOCATIONS l            ON s.LOCATION_GU = l.LOCATION_GU 
WHERE s.YEAR_GU = (SELECT cfyg.YEAR_GU YEAR_GU FROM bsd.CurrentFiscalYearGU cfyg)
${where_clause}
EOQ;

$data = array();
$db = new HR_Stipends_Connect($connection);

if( $db->Query($query) ) 
{
    $data = $db->Rows();
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);

?>