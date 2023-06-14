<?php
/*
 *  getMultiComboLookup.php
 * 
 *  Version for HR Stipends (and hr_stipends_prototype)
 *  Returns the multiple Lookup Table values in JSON suitable
 *  for a DataCollection object.
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

$db = new HR_Stipends_Connect($connection);

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

$GET_LOOKUPS = ['FREQUENCY', 'SPLIT', 'DISTRIBUTION', 'GENDER'];

$lookup_table = array();
$regular_table = array();

if(isset($_REQUEST['id'])) 
{
    $params = array();
    if( is_array($_REQUEST['id']) ):
        $params = array_map("strtoupper", $_REQUEST['id']);
    else:
        $params[] = strtoupper($_REQUEST['id']);
    endif;
    foreach($params as $param)
    {
        if( in_array($param, $GET_LOOKUPS) ):
            $lookup_table[] = $param;
        else:
            $regular_table[] = $param;
        endif;
    }
}

$result = array();

foreach($lookup_table as $table)
{
    $sql  = "SELECT VALUE_CODE, VALUE_DESCRIPTION ";
    $sql .= "FROM bsd.GetLookupValues('STIPENDS','{$table}')";
    $next_lookup = array();

    if( $db->Query($sql) )
    {
        $rows = $db->Rows();
        if( count($rows) > 0 )
        {
            foreach($rows as $row)
            {
                $next_lookup[] = array(
                    'id'    => $row['VALUE_CODE'],
                    'value' => $row['VALUE_DESCRIPTION']
                );
            }
        }
        else 
        {
            $next_lookup[] = array( 'id' => "ERROR", 'value' => 'No data' );
        }
    }
    else 
    {
        $next_lookup[] = array( 'id' => "ERROR", 'value' => $db->LastError() );
    }

    $result[$table] = $next_lookup;
}

foreach($regular_table as $table)
{
    if( $table == "NAME" )
    {
        $sql  = "SELECT si.BADGE_NUM, si.LAST_NAME, ";
        $sql .= "si.FIRST_NAME, si.MIDDLE_NAME ";
        $sql .= "FROM bsd.StaffInfo si ";
        $sql .= "WHERE si.JOB_TITLE <> 'TERMINATED' ";
        $sql .= "ORDER BY si.LAST_NAME, si.FIRST_NAME";

        $name = array();
        $badge = array();
        if( $db->Query($sql) )
        {
            foreach($db->Rows() as $row)
            {
                $badge[] = array(
                    'id'    => $row['BADGE_NUM'],
                    'value' => $row['BADGE_NUM']
                );
                $name[] = array(
                    'id'    => $row['BADGE_NUM'],
                    'value' => Sort_Name($row['LAST_NAME'], $row['FIRST_NAME'], $row['MIDDLE_NAME'])
                );
            }
            $result['NAME'] = $name;
            $result['BADGE'] = $badge;
        }
    }
    elseif( $table == "LOCATION" )
    {
        $sql  = "SELECT LOCATION_GU, LOCATION_NAME ";
        $sql .= "FROM bsd.LOCATIONS ";
        $sql .= "WHERE GRADE_EMH NOT IN ('D', 'E') ";
        $sql .= "ORDER BY GRADE_EMH_SORT desc, LOCATION_CODE asc";
    
        $data = array();
        if( $db->Query($sql) )
        {
            foreach($db->Rows() as $row)
            {
                $data[] = array(
                    'id' => $row['LOCATION_GU'],
                    'value' => $row['LOCATION_NAME']
                );
            }
            $result[$table] = $data;
        }
    }
    elseif( $table == "YEAR" )
    {
        $where_clause = '';
        if($db->FiscalYear())
        {
            $t = $db->Rows();
            $where_clause = "WHERE YEAR_RANGE <= '" . array_pop($t)['YEAR_RANGE'] . "' ";
        }
        $sql  = "SELECT YEAR_RANGE, YEAR_GU ";
        $sql .= "FROM bsd.FISCAL_YEAR ";
        $sql .= $where_clause;
        $sql .= "ORDER BY YEAR_RANGE desc";
    
        $data = array();
        if( $db->Query($sql) )
        {
            foreach($db->Rows() as $row)
            {
                $data[] = array(
                    'id' => $row['YEAR_GU'],
                    'value' => $row['YEAR_RANGE']
                );
            }
            $result[$table] = $data;
        }
    }
}

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($result);

?>