<?php
/*
 *
 *  getSeasons.php
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
      "id"      => "DESCRIPTION",
      "header"  => [ ["text" => "Season Description"], ["content" => "inputFilter"] ],
      "footer"  => [ ["text" => "Total", "align" => "right"] ],
    ],[  
      "id"      => "START_DATE",
      "header"  => [ ["text" => "Start Date"], ["content" => "inputFilter"] ],
      "footer"  => [ ["content" => "count" ] ],
    ],[
      "id"      => "END_DATE",
      "header"  => [ ["text" => "End Date"], ["content" => "inputFilter"] ],
    ],[
      "id"      => "SORT",
      "header"  => [ ["text" => "Sort"], ["content" => "selectFilter"] ],
    ],[
      "id"      => "INACTIVE",
      "header"  => [ ["text" => "Inactive"], ["content" => "selectFilter"] ],
    ],[ 
      "id"      => "SEASON_GU",
      "header"  => [ ["text" => "SEASON_GU"] ],
      "hidden"  => 1,
    ],
  ];

$query =<<<EOF
SELECT 
      s.SEASON_GU                         AS id
    , s.DESCRIPTION                       AS {$columns[0]["id"]}
    , CONVERT(varchar, s.START_DATE, 101) AS {$columns[1]["id"]}
    , CONVERT(varchar, s.END_DATE, 101)   AS {$columns[2]["id"]}
    , s.SORT                              AS {$columns[3]["id"]}
    , CASE 
        WHEN s.INACTIVE = 1 THEN 'Yes'
        ELSE 'No'
    END                                 AS {$columns[4]["id"]}
FROM bsd.SEASONS s
JOIN bsd.CurrentFiscalYearGU fy ON fy.YEAR_GU = s.YEAR_GU
ORDER BY s.SORT
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
