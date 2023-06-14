<?php
/*
 *
 *  getUserSecurity.php
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
      "id"      => "NAME",
      "header"  => [ ["text" => "Staff Name"], ["content" => "inputFilter"] ],
      "footer"  => [ ["text" => "Total", "align" => "right" ] ],
    ],[
      "id"      => "STAFF_ID",
      "header"  => [ ["text" => "Badge Number"], ["content" => "inputFilter"] ],
      "footer"  => [ ["content" => "count" ] ]
    ],[
      "id"      => "ROLE_CODE",
      "header"  => [ ["text" => "Role"], ["content" => "selectFilter"] ],
    ],[
      "id"      => "CATEGORY_CODE",
      "header"  => [ ["text" => "Categories"], ["content" => "inputFilter"] ],
    ],[
      "id"      => "BADGE_NUM",
      "header"  => [ ["text" => ""] ],
      "hidden"  => 1,
    ]
  ];

$query =<<<EOF
SELECT 
      ur.BADGE_NUM                              AS id
    , CONCAT(si.LAST_NAME, ', ', si.FIRST_NAME) AS {$columns[0]["id"]}
    , si.BADGE_NUM                              AS {$columns[1]["id"]}
    , ur.ROLE_CODE                              AS {$columns[2]["id"]}
    , uc.cat_codes                              AS {$columns[3]["id"]}
FROM [sec].[USER_ROLES] ur
LEFT JOIN [bsd].[staffInfo] si ON si.BADGE_NUM = ur.BADGE_NUM
LEFT JOIN (SELECT BADGE_NUM
                , STRING_AGG(CATEGORY_CODE, ', ') cat_codes
           FROM [sec].[USER_CATEGORY]
           GROUP BY BADGE_NUM
) uc ON uc.BADGE_NUM = ur.BADGE_NUM
WHERE ur.ROLE_CODE != 'SUPER'
ORDER BY si.LAST_NAME, si.FIRST_NAME, ur.ROLE_CODE, ur.BADGE_NUM
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
