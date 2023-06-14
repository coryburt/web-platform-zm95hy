<?php
/*
 *
 *  getAccountCodes.php
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
      "id"      => "SUBSET",
      "header"  => [ ["text" => "Subset"], ["content" => "inputFilter"] ],
    ],[
      "id"      => "GENDER",
      "header"  => [ ["text" => "Gender"], ["content" => "selectFilter"] ],
    ],[
      "id"      => "CERTIFICATED",
      "header"  => [ ["text" => "Certificated"], ["content" => "selectFilter"] ],
      "footer"  => [ ["text" => "Total", "align" => "right"] ],
    ],[
      "id"      => "SUBSET_VALUE",
      "header"  => [ ["text" => "Subset Value"], ["content" => "inputFilter"] ],
      "footer"  => [ ["content" => "count" ] ],
    ],[
      "id"      => "GENDER_VALUE_CODE",
      "header"  => [ ["text" => ""] ],
      "hidden"  => 1,
    ],[
      "id"      => "CERTIFICATED_CODE",
      "header"  => [ ["text" => ""] ],
      "hidden"  => 1,
    ],[
      "id"      => "ACCOUNT_CODE_GU",
      "header"  => [ ["text" => ""] ],
      "hidden"  => 1,
    ]
  ];

$query =<<<EOF
SELECT 
      ACCOUNT_CODE_GU     AS id
    , SUBSET              AS {$columns[0]["id"]}
    , g.VALUE_DESCRIPTION AS {$columns[1]["id"]}
    , CASE
        WHEN CERTIFICATED = 1 THEN 'Yes'
        WHEN CERTIFICATED = 0 THEN 'No'
        ELSE ''
    END                   AS {$columns[2]["id"]}
    , SUBSET_VALUE        AS {$columns[3]["id"]}
    , g.VALUE_CODE        AS {$columns[4]["id"]}
    , ac.CERTIFICATED     AS {$columns[5]["id"]}
    FROM bsd.ACCOUNT_CODE ac
    LEFT JOIN bsd.GetLookupValues('STIPENDS','GENDER') g ON g.VALUE_CODE = ac.GENDER
    ORDER BY SUBSET, SUBSET_VALUE
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
