<?php
/*
 *
 *  getPrograms.php
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
      "header"  => [ ["text" => "Program Description"], ["content" => "inputFilter"] ],
      "footer"  => [ ["text" => "Total", "align" => "right"] ],
    ],[
      "id"      => "JOB_DESCRIPTION",
      "header"  => [ ["text" => "Job Description"], ["content" => "inputFilter"] ],
      "footer"  => [ ["content" => "count" ] ],
    ],[
      "id"      => "ACTIVITY_VALUE",
      "header"  => [ ["text" => "Activity Program"], ["content" => "selectFilter"] ],
    ],[
      "id"      => "SPORT_VALUE",
      "header"  => [ ["text" => "Sport Program"], ["content" => "selectFilter"] ],
    ],[
      "id"      => "INACTIVE",
      "header"  => [ ["text" => "Inactive"], ["content" => "selectFilter"] ],
    ],[
      "id"      => "IS_ACTIVITY",
      "header"  => [ ["text" => ""] ],
      "hidden"  => 1,
    ],[
      "id"      => "IS_SPORT",
      "header"  => [ ["text" => ""] ],
      "hidden"  => 1,
    ],[
      "id"      => "PROGRAM_GU",
      "header"  => [ ["text" => "PROGRAM_GU"] ],
      "hidden"  => 1,
    ],
  ];

$query =<<<EOF
SELECT 
      PROGRAM_GU  AS id
    , DESCRIPTION AS {$columns[0]["id"]}
    , JOB_DESCRIPTION AS {$columns[1]["id"]}
    , CASE
        WHEN IS_ACTIVITY = 1 THEN 'Yes'
        ELSE 'No' 
    END           AS {$columns[2]["id"]}
    , CASE
        WHEN IS_SPORT = 1 THEN 'Yes'
        ELSE 'No' 
    END           AS {$columns[3]["id"]}
    , CASE
        WHEN INACTIVE = 1 THEN 'Yes'
        ELSE 'No' 
    END           AS {$columns[4]["id"]}
    , IS_ACTIVITY AS {$columns[5]["id"]}
    , IS_SPORT    AS {$columns[6]["id"]}
FROM bsd.PROGRAM
ORDER BY DESCRIPTION
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
