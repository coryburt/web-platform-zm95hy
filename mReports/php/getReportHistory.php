<?php
/*
 *
 *  getStipendPicklist.php
 * 
 *  Retreives the list of stipends for populating a stipends picklist
 * 
 *  Built from a product of "Query by Lucas," (pat pend);
 *  
************************************************************************************** */

set_time_limit(60*3);      // 3-minute timeout

if( (@include '../../includes/local_functions.php') != TRUE ):
    require_once 'D:/wamp64/www/external/functions.php';
endif;

require_once 'common.php';
require_once 'connect_sqlsrv.php';

activate_error_reporting();
session_start();

$columns = [
    [
        "id" => "SELECTOR",
        "htmlEnable" => true,
        "width" => 65,
        "header" => [ ["text" => ""] ],
        "tooltip" => false,
    ],
    [
        "id" => "CREATED",
        "header" => [ ["text" => "Created"], ["content" => "inputFilter"] ],
        "width" => 200,
    ],
    [
        "id" => "SEASON",
        "header" => [ ["text" => "Season"], ["content" => "inputFilter"] ],
        "width" => 125,
    ],
    [
        "id" => "LOCATION",
        "header" => [ ["text" => "Location"], ["content" => "inputFilter"] ],
        "width" => 200,
    ],
    [  
        "id" => "REPORT",
        "header" => [ ["text" => "Report"], ["content" => "selectFilter"] ],
    ], 
];
  
$buttonTemplate =<<<EOB
    <div class="grid-button">
      <span onClick="RPT.func.InsertReportLink('XXX');">&puncsp;Select&puncsp;</span>
    </div>
EOB;

$query =<<<EOQ
    SELECT CONVERT(varchar, ADD_DATE_TIME_STAMP, 100) as CREATED, REPORT_NAME as REPORT, REPORT_PARAMS 
    FROM bsd.REPORT_LOG
    WHERE ADD_ID_STAMP = {$_SESSION['hr_stipends']['staffID']}
EOQ;

$data = array( 'columns' => $columns, 'data' => array() );
$db = new HR_Stipends_Connect($connection);

if( $db->Query($query) ) 
{
    foreach($db->Rows() as $row)
    {
        $param1 = $row['REPORT'];
        $param2 = unserialize($row['REPORT_PARAMS']);
        $row['SEASON'] = $param2[0]['SEASON'];
        $row['LOCATION'] = $param2[0]['LOCATION'];


        // $query2 =<<<EOQ
        //     SELECT LOCATION_NAME, DESCRIPTION
        //     FROM bsd.LOCATIONS, bsd.SEASONS
        //     WHERE LOCATION_GU = '{$row['LOCATION']}'
        //     AND SEASON_GU = '{$row['SEASON']}'
        // EOQ;

        // if( $db->Query($query2) ) 
        // {
        //     foreach($db->Rows() as $row2)
        //     {
        //         $row['LOCATION'] = $row2['LOCATION_NAME'];
        //         $row['SEASON'] = $row2['DESCRIPTION'];
        //     }
        // }

        $row['SELECTOR'] = str_replace("XXX", $param1, $buttonTemplate);
        $data['data'][] = $row;
    }
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);

?>