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

$buttonTemplate =<<<EOB
    <div class="grid-button">
      <span onClick="SUP.func.InsertStipendGU('XXX', 'YYY');">&puncsp;Select&puncsp;</span>
    </div>
EOB;

$query =<<<EOQ
    SELECT 
          st.DESCRIPTION        AS ACTIVITY
        , gr.VALUE_DESCRIPTION  AS GRADE
        , p.VALUE_DESCRIPTION   AS POSITION
        , s.DESCRIPTION         AS SEASON
        , st.STEP_A
        , st.STEP_B
        , st.STEP_C
        , st.STEP_D
        , st.STEP_E
        , st.STIPEND_GU
    FROM bsd.STIPENDS st 
    JOIN bsd.SEASONS   s ON s.SEASON_GU = st.SEASON_GU
    JOIN bsd.GetLookupValues('STIPENDS','POSITION') p ON  p.VALUE_CODE = st.STIPEND_POSITION
    LEFT JOIN bsd.GetLookupValues('STIPENDS','GRADE')   gr ON gr.VALUE_CODE = st.STIPEND_GRADE
    ORDER BY p.VALUE_DESCRIPTION
EOQ;

$data = array();

try {
    $db = new HR_Stipends_Connect($connection);
    if( $db->Query($query) ) 
    {
        foreach($db->Rows() as $row)
        {
            $param1 = $row['STIPEND_GU'];
            $param2 = $row['ACTIVITY'];
            $tmp = str_replace("XXX", $param1, $buttonTemplate);
            $row['SELECTOR'] = str_replace("YYY", $param2, $tmp);
            $row['STEP_A'] = '$' . number_format($row['STEP_A'],2,'.',',');
            $row['STEP_B'] = '$' . number_format($row['STEP_B'],2,'.',',');
            $row['STEP_C'] = '$' . number_format($row['STEP_C'],2,'.',',');
            $row['STEP_D'] = '$' . number_format($row['STEP_D'],2,'.',',');
            $row['STEP_E'] = '$' . number_format($row['STEP_E'],2,'.',',');
            $row['ERROR'] = '';
            $data[] = $row;
        }
    }
} catch(Exception $e) {
    die($e->getMessage());
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);

?>