<?php
/*
 *
 *  getLookupPosition.php
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
      "id"      => "VALUE_CODE",
      "header"  => [ ["text" => "Value Code"], ["content" => "inputFilter"] ],
      "footer"  => [ ["text" => "Total", "align" => "right"] ],
    ],[
      "id"      => "VALUE_DESCRIPTION",
      "header"  => [ ["text" => "Value Description"], ["content" => "inputFilter"] ],
      "footer"  => [ ["content" => "count" ] ],
    ],[ 
      "id"      => "INACTIVE",
      "header"  => [ ["text" => "Inactive"], ["content" => "selectFilter"] ],
      "width"   => 80,
    ],[ 
      "id"      => "LOCKED_VALUE",
      "header"  => [ ["text" => "Locked"], ["content" => "selectFilter"] ],
      "width"   => 80,
    ],[ 
      "id"      => "LOOKUP_DEF_CODE",
      "header"  => [ ["text" => ""] ],
      "hidden"  => 1,
    ],[
      "id"      => "LOCKED",
      "header"  => [ ["text" => ""] ],
      "hidden"  => 1,
    ],[
      "id"      => "VALUE_GU",
      "header"  => [ ["text" => "VALUE_GU"] ],
      "hidden"  => 1,
    ]
  ];

$query =<<<EOF
SELECT 
      val.VALUE_GU          AS id
    , val.VALUE_CODE        AS {$columns[0]["id"]}
    , val.VALUE_DESCRIPTION AS {$columns[1]["id"]}
    , CASE 
        WHEN val.INACTIVE = 1 THEN 'Y'
        ELSE 'N'
    END                     AS {$columns[2]["id"]}
    , CASE
        WHEN val.LOCKED = 1 THEN 'Y'
        ELSE 'N'
    END                     AS {$columns[3]["id"]}
    , val.LOOKUP_DEF_GU     AS {$columns[4]["id"]}
    , val.LOCKED            AS {$columns[5]["id"]}
FROM bsd.LOOKUP_TABLE_DEF AS def
JOIN bsd.LOOKUP_TABLE_VALUE AS val ON val.LOOKUP_DEF_GU = def.LOOKUP_DEF_GU
WHERE def.LOOKUP_DEF_CODE = 'POSITION'
ORDER BY val.VALUE_CODE
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
