<?php
/*
 *
 *  getFiscalYear.php
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
      "id"      => "YEAR_RANGE",
      "header"  => [ ["text" => "Year Range"], ["content" => "inputFilter"] ],
      // "footer"  => [ ["text" => "Total", "align" => "right"] ],
      // "footer"  => [ ["content" => "count" ] ],
    ],[ 
      "id"      => "YEAR_GU",
      "header"  => [ ["text" => "YEAR_GU"] ],
      "hidden"  => 1,
    ]
  ];

$query =<<<EOF
SELECT 
      YEAR_GU     AS id
    , YEAR_RANGE  AS {$columns[0]["id"]}
FROM bsd.FISCAL_YEAR
ORDER BY YEAR_RANGE DESC
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
