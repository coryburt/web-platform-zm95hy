<?php
/*
 *
 *  getLocations.php
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

 $columns = [
    [
      "id"      => "LOCATION_CODE",
      "header"  => [ ["text" => "Code"], ["content" => "inputFilter"] ],
      "footer"  => [ ["text" => "Total", "align" => "right"] ],
      "width"   => 90,
    ],[
      "id"      => "LOCATION_NAME",
      "header"  => [ ["text" => "Name"], ["content" => "inputFilter"] ],
      "footer"  => [ ["content" => "count" ] ],
      "width"   => 260,
    ],[
      "id"      => "STATE_CODE",
      "header"  => [ ["text" => "State Code"], ["content" => "inputFilter"] ],
    ],[
      "id"      => "LOCATION_SHORT_NAME",
      "header"  => [ ["text" => "Short Name"], ["content" => "inputFilter"] ],
    ],[
      "id"      => "GRADE_EMH",
      "header"  => [ ["text" => "EMH Code"], ["content" => "selectFilter"] ],
      "width"   => 90,
    ],[
      "id"      => "GRADE_EMH_DESC",
      "header"  => [ ["text" => "EMH Description"], ["content" => "selectFilter"] ],
    ],[
      "id"      => "GRADE_EMH_SORT",
      "header"  => [ ["text" => "EMH Sort"], ["content" => "selectFilter"] ],
      "width"   => 90,
    ],[
      "id"      => "INACTIVE",
      "header"  => [ ["text" => "Inactive"], ["content" => "selectFilter"] ],
    ],[
      "id"      => "LOCATION_GU",
      "header"  => [ ["text" => "LOCATION_GU"] ],
      "hidden"  => 1,
    ],
  ];

$query =<<<EOF
SELECT 
      LOCATION_GU         AS id
    , LOCATION_CODE       AS {$columns[0]["id"]}
    , LOCATION_NAME       AS {$columns[1]["id"]}
    , STATE_CODE          AS {$columns[2]["id"]}
    , LOCATION_SHORT_NAME AS {$columns[3]["id"]}
    , GRADE_EMH           AS {$columns[4]["id"]}
    , GRADE_EMH_DESC      AS {$columns[5]["id"]}
    , GRADE_EMH_SORT      AS {$columns[6]["id"]}
    , CASE
        WHEN INACTIVE = 1 THEN 'Yes'
        ELSE 'No'        
    END                   AS {$columns[7]["id"]}
FROM bsd.LOCATIONS
ORDER BY LOCATION_CODE, LOCATION_NAME
EOF;

$db = new HR_Stipends_Connect($connection);
$data = array( 'columns' => $columns, 'data' => array() );

if( $db->Query($query) )
{
    foreach($db->Rows() as $row)
    {
        $data['data'][] = $row;
    }
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);


?>
