<?php
/*
 *
 *  getStipends.php
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
      "id"      => "STIPEND_DESCRIPTION",
      "header"  => [ ["text" => "Stipend"], ["content" => "inputFilter"] ],
      "footer"  => [ ["text" => "Total", "align" => "right"] ],
    ],[  
      "id"      => "PROGRAM_DESCRIPTION",
      "header"  => [ ["text" => "Program"], ["content" => "inputFilter"] ],
      "footer"  => [ ["content" => "count" ] ]
    ],[
      "id"      => "STIPEND_POSITION",
      "header"  => [ ["text" => "Position"], ["content" => "selectFilter"] ],
      "width"   => 130,
    ],[
      "id"      => "SEASON_DESCRIPTION",
      "header"  => [ ["text" => "Season"], ["content" => "inputFilter"] ],
      "width"   => 130,
    ],[ 
      "id"      => "STIPEND_GRADE",
      "header"  => [ ["text" => "Grade"], ["content" => "selectFilter"] ],
      "width"   => 80,
    ],[ 
      "id"      => "STEP_A",
      "header"  => [ ["text" => "Step A"], ["content" => "inputFilter"] ],
      "width"   => 80,
    ],[ 
      "id"      => "STEP_B",
      "header"  => [ ["text" => "Step B"], ["content" => "inputFilter"] ],
      "width"   => 80,
    ],[ 
      "id"      => "STEP_C",
      "header"  => [ ["text" => "Step C"], ["content" => "inputFilter"] ],
      "width"   => 80,
    ],[ 
      "id"      => "STEP_D",
      "header"  => [ ["text" => "Step D"], ["content" => "inputFilter"] ],
      "width"   => 80,
    ],[ 
      "id"      => "STEP_E",
      "header"  => [ ["text" => "Step E"], ["content" => "inputFilter"] ],
      "width"   => 80,
    ],[ 
      "id"      => "COVID_VALUE",
      "header"  => [ ["text" => "Covid"], ["content" => "selectFilter"] ],
      "width"   => 80,
    ],[ 
      "id"      => "INACTIVE",
      "header"  => [ ["text" => "Inactive"], ["content" => "selectFilter"] ],
      "width"   => 80,
    ],[ 
      "id"      => "PROGRAM_GU",
      "header"  => [ ["text" => ""] ],
      "hidden"  => 1,
    ],[ 
      "id"      => "STIPEND_POSITION_CODE",
      "header"  => [ ["text" => ""] ],
      "hidden"  => 1,
    ],[
      "id"      => "SEASON_GU",
      "header"  => [ ["text" => ""] ],
      "hidden"  => 1,
    ],[
      "id"      => "STIPEND_GRADE_CODE",
      "header"  => [ ["text" => ""] ],
      "hidden"  => 1,
    ],[
      "id"      => "COVID",
      "header"  => [ ["text" => ""] ],
      "hidden"  => 1,
    ],[
      "id"      => "STIPEND_GU",
      "header"  => [ ["text" => "STIPEND_GU"] ],
      "hidden"  => 1,
    ],
  ];

$query =<<<EOF
SELECT 
      st.STIPEND_GU        AS id 
    , st.DESCRIPTION       AS {$columns[0]["id"]}
    , p.DESCRIPTION        AS {$columns[1]["id"]}
    , po.VALUE_DESCRIPTION AS {$columns[2]["id"]}
    , se.DESCRIPTION       AS {$columns[3]["id"]}
    , g.VALUE_DESCRIPTION AS {$columns[4]["id"]}
    , CASE 
        WHEN st.STEP_A = 0 THEN ''
        ELSE st.STEP_A
    END                    AS {$columns[5]["id"]}
    , CASE 
        WHEN st.STEP_B = 0 THEN ''
        ELSE st.STEP_B
    END                    AS {$columns[6]["id"]}
    , CASE 
        WHEN st.STEP_C = 0 THEN ''
        ELSE st.STEP_C
    END                    AS {$columns[7]["id"]}
    , CASE 
        WHEN st.STEP_D = 0 THEN ''
        ELSE st.STEP_D
    END                    AS {$columns[8]["id"]}
    , CASE 
        WHEN st.STEP_E = 0 THEN ''
        ELSE st.STEP_E
    END                    AS {$columns[9]["id"]}
    , CASE 
        WHEN st.COVID = 1 THEN 'Yes'
        ELSE 'No'
    END                    AS {$columns[10]["id"]}
    , CASE
        WHEN st.INACTIVE = 1 THEN 'Yes'
        ELSE 'No'
    END                    AS {$columns[11]["id"]}
    , p.PROGRAM_GU         AS {$columns[12]["id"]}
    , po.VALUE_CODE        AS {$columns[13]["id"]}
    , se.SEASON_GU         AS {$columns[14]["id"]}
    , g.VALUE_CODE         AS {$columns[15]["id"]}
    , st.COVID             AS {$columns[16]["id"]}
FROM bsd.STIPENDS st
LEFT JOIN bsd.PROGRAM p  ON p.PROGRAM_GU = st.PROGRAM_GU
LEFT JOIN bsd.SEASONS se ON se.SEASON_GU = st.SEASON_GU
LEFT JOIN bsd.GetLookupValues('STIPENDS','POSITION') po ON po.VALUE_CODE = st.STIPEND_POSITION
LEFT JOIN bsd.GetLookupValues('STIPENDS','GRADE') g ON g.VALUE_CODE = st.STIPEND_GRADE
     JOIN bsd.CurrentFiscalYearGU fy ON fy.YEAR_GU = se.YEAR_GU
ORDER BY st.DESCRIPTION
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
