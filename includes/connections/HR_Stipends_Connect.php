<?php
/*
 *  HR_Stipends_Connect.php
 * 
 */

class HR_Stipends_Connect
{
    protected $connection;
    protected $rows;
    protected $tables;
    protected $columns;
    protected $transaction_rows;
    protected $last_error;
    protected $last_insert_id;
    protected $affected_row_cnt;
    protected $db_type;

    // ------------------------------------------------------------------------------------------------------------

    public function __construct($connect_obj)
    {
        global $_SESSION;

        $this->rows = array();
        $this->tables = array();
        $this->columns = array();
        $this->transaction_rows = array();
        $this->last_error = '';
        $this->last_insert_id = 0;
        $this->affected_row_cnt = 0;

        if( gettype($connect_obj) === 'object' )
        {
            $cls = get_class($connect_obj);
            if( preg_match('/sqlite/i', $cls) === 1 ):
                $this->db_type = 'SQLite';
            elseif( preg_match('/mysql/i', $cls) === 1 ):
                $this->db_type = 'MySQL';
            else:
                $this->db_type = $cls;
            endif;
            $this->connection = $connect_obj;
        }
        elseif( gettype($connect_obj) === 'resource' )
        {
            $cls = get_resource_type($connect_obj);
            if( preg_match('/SQL Server/', $cls ) === 1 ):
                $this->db_type = 'SQLServer';
                $this->connection = $connect_obj;
            endif;
        }
        else
        {
            die( "No database connector object in instantiation of HR_Stipends_Connect" );
        }
    }

    // ------------------------------------------------------------------------------------------------------------

    function __destruct() { 
        $this->Close();
    }

    // ------------------------------------------------------------------------------------------------------------

    public function Close()
    {
        if( $this->db_type == 'SQLServer' )
        {
            sqlsrv_close($this->connection);
        }
        else
        {
            $this->connection->close(); 
        }
    }

    // ------------------------------------------------------------------------------------------------------------

    public function Rows() { return $this->rows; }
    public function TransactionRows() { return $this->transaction_rows; }
    public function LastError() { return $this->last_error; }
    public function LastInsertId() { return $this->last_insert_id; }
    public function AffectedRowCnt() { return $this->affected_row_cnt; }
    public function Info() 
    {
        $result = '';
        if( $this->db_type == 'MySQL' )
        {
            $client = sprintf("Client version: %s<br />", $this->connection->client_info);
            $server = sprintf("DB version: %s<br />", $this->connection->server_info);
            $host = sprintf("Host info: %s<br />", $this->connection->host_info); 
            $result = $client . $server . $host; 
        }
        elseif( $this->db_type == 'SQLite' )
        {
            $info = $this->connection->version();
            $result = $this->db_type . ' v'. $info['versionString'];
        }
        elseif( $this->db_type == 'SQLServer' )
        {
            $info = sqlsrv_server_info($this->connection);
            $result = implode("; " . $info);
        }
        return $result;
    }

    public function Tables()
    {
        if( $this->db_type == 'SQLite' ):
            $sql = "SELECT name FROM sqlite_schema
                    WHERE type ='table' AND name NOT LIKE 'sqlite_%'";
            if( $results = $this->connection->query($sql) )
            while ($row = $results->fetchArray()) 
            {
                $this->tables[] = $row['name'];
            }
            return $this->tables;
        elseif( $this->db_type == 'SQLServer' ):
            $sql = "SELECT table_catalog, table_schema, table_name FROM information_schema.tables";
            if( ($stmt = sqlsrv_query( $this->connection, $sql )) != false )
            {
                while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) )
                {
                    $this->tables[] = implode('.', 
                        array(
                            $row['table_catalog'], $row['table_schema'], $row['table_name']
                        )
                    );
                }
            }
            return $this->tables;
        else:
            return 'Not yet implemented';
        endif;
    }

    public function Columns($table_name, $column_list = array())
    {
        if( $this->db_type == 'SQLite' && strlen($table_name) > 0 ):
            $sql = "SELECT name FROM pragma_table_info('$table_name') ORDER BY cid";
            if( $results = $this->connection->query($sql) )
            {
                if( count($column_list) > 0 )   // Gather up specified columns...
                {
                    while ($row = $results->fetchArray()) 
                    {
                        if( in_array($row['name'], $column_list) )
                        {
                            $this->columns[] = $row['name'];
                        }
                    }
                }
                else                            // Gather up all columns...
                {
                    while ($row = $results->fetchArray()) 
                    {
                        $this->columns[] = $row['name'];
                    }
                }
            }
            return $this->columns;
        elseif( $this->db_type == 'SQLServer' && strlen($table_name) > 0 ):
            $frags = explode('.', $table_name);
            $actual = array_pop($frags);
            $sql  = "SELECT column_name, data_type FROM information_schema.columns ";
            $sql .= "WHERE table_name = '${actual}'";
            if( ($stmt = sqlsrv_query( $this->connection, $sql )) != false )
            {
                if( count($column_list) == 0 )
                {
                    while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) )
                    {
                        $this->columns[] = [$row['column_name'], $row['data_type']];
                    }
                }
                else
                {
                    while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) )
                    {
                        if( in_array($row['column_name'], $column_list) ):
                            $this->columns[] = [$row['column_name'], $row['data_type']];
                        endif;
                    }
                }
            }
            return $this->columns;
        else:
            return( 
                (strlen($table_name)==0) 
                    ? 'ERROR: No table specified' 
                    : 'Access not yet implemented for that database server'
            );
        endif;
    }

    // ------------------------------------------------------------------------------------------------------------

    public function TableToGrid($table_name, $column_list = array(), $where_clause = "")
    {
        $field_list = (count($column_list) > 0) ? implode(", ", $column_list) : "*";
        $sql = "SELECT ${field_list} FROM ${table_name}";
        if( strlen($where_clause) > 0 ):    // MUST be a valid SQL WHERE-clause!
            $sql .= " ${where_clause}";
        endif;
        if( $this->Query($sql) ):
            return( array($this->Columns($table_name, $column_list), $this->rows) );
        else:
            return( array(array(), $this->rows) );
        endif;
    }

    // ------------------------------------------------------------------------------------------------------------

    public function Query($sql = '', $query_type = "ASSOC")
    {
        $this->_Query($sql, $query_type);
        return $this->affected_row_cnt;
    }

    // ------------------------------------------------------------------------------------------------------------

    public function Update($sql)
    {
        $stmt = sqlsrv_query($this->connection, $sql);
        
        if ($stmt === FALSE) {
            $this->last_error = print_r(sqlsrv_errors(), true);
            $this->affected_row_cnt = -1;

        } else {
            $this->affected_row_cnt = sqlsrv_rows_affected($stmt);
        }

        sqlsrv_free_stmt( $stmt );

        return $this->affected_row_cnt;
    }

    // ------------------------------------------------------------------------------------------------------------

    public function Delete($sql)
    {
        $stmt = sqlsrv_query($this->connection, $sql);
        
        if ($stmt === FALSE) {
            $this->last_error = print_r(sqlsrv_errors(), true);
            $this->affected_row_cnt = -1;

        } else {
            $this->affected_row_cnt = sqlsrv_rows_affected($stmt);
        }

        sqlsrv_free_stmt( $stmt );

        return $this->affected_row_cnt;

    }

    // ------------------------------------------------------------------------------------------------------------

    public function Insert($sql)
    {
        $stmt = sqlsrv_query($this->connection, $sql);
        
        if ($stmt === FALSE) {
            $this->last_error = print_r(sqlsrv_errors(), true);
            $this->affected_row_cnt = -1;

        } else {
            $this->affected_row_cnt = sqlsrv_rows_affected($stmt);
        }

        sqlsrv_free_stmt( $stmt );

        return $this->affected_row_cnt;
    }

    // ------------------------------------------------------------------------------------------------------------

    private function _Query($sql, $query_type)
    {
        $row_cnt = -1;
        $this->rows = array();

        if( $this->db_type == 'MySQL' )
        {
            try {
                $result = $this->connection->query( $sql );
                $assoc_re = '/assoc/i';
                if( preg_match( $assoc_re, $query_type ) ):
                    while( $row = $result->fetch_assoc() )
                    {
                        $this->rows[] = $row;
                    }
                else:
                    while( $row = $result->fetch_array() )
                    {
                        $this->rows[] = $row;
                    }
                endif;
                $row_cnt = $this->connection->affected_rows;
                $result->free_result();
            } catch(Exception $e) {
                $this->last_error = sprintf( "Query failed! [%s]\n%s\n", $e->getMessage(), $sql );
            }
        }
        elseif( $this->db_type == 'SQLite' )
        {
            $results = $this->connection->query($sql);
            while ($row = $results->fetchArray()) 
            {
                $this->rows[] = $row;
            }
            $row_cnt = count($this->rows);
        }
        elseif( $this->db_type == 'SQLServer' ) 
        {
            if( ($stmt = sqlsrv_query( $this->connection, $sql )) != false )
            {
                while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) )
                {
                    $this->rows[] = $row;
                }
                $row_cnt = count($this->rows);
            }
            else 
            {
                $row_cnt = -1;
                $msg = array();
                if( ($errs = sqlsrv_errors()) != null )
                {
                    foreach($errs as $error)
                    {
                        $msg[] = $error['message'];
                        --$row_cnt;
                    }
                }
                else
                {
                    $msg[] = "Unknown Error";
                }
                $this->last_error = implode(PHP_EOL, $msg);
            }
        }

        $this->affected_row_cnt = $row_cnt;
    }

    // ------------------------------------------------------------------------------------------------------------
    //  Returns a record suitable for populating a pre-loader user array.
    //  Similar to the method of the same name in the:
    //      "Stipends_Preloader_Connect"
    //  class

    public function StaffList()
    {
        $tsql = 'SELECT si.BADGE_NUM, si.USERNAME, ur.ROLE_CODE, si.FIRST_NAME, si.LAST_NAME ';
        $tsql .= " , STRING_AGG(uc.CATEGORY_CODE, ', ') AS CATEGORIES ";
        $tsql .= 'FROM bsd.StaffInfo si ';
        $tsql .= 'JOIN sec.USER_ROLES ur ON ur.BADGE_NUM = si.BADGE_NUM ';
        $tsql .= 'LEFT JOIN sec.user_category uc ON ur.badge_num = uc.badge_num ';
        $tsql .= 'GROUP BY si.LAST_NAME, si.FIRST_NAME, si.BADGE_NUM, si.USERNAME, ur.role_code ';

        $this->_Query($tsql);
        return $this->affected_row_cnt;
    }

    // ------------------------------------------------------------------------------------------------------------
    //  Expects one or more SQL statement strings as parameters; it executes them in
    //  order under a transaction.  It commits if there is no error and rolls back
    //  if something croaks.  The onus is on the caller to ensure the SQL strings are
    //  valid, (other than empty strings or strings that start with the character 
    //  sequence "null" in upper or lower case; such strings are simply skipped).

    public function Transaction()
    {
        $row_cnt = -1;
        if( $this->db_type === 'MySQL' && func_num_args() > 0 )
        {
            $ok = TRUE;
            $row_cnt = 0;
            $this->connection->autocommit(FALSE);
            $this->connection->begin_transaction();

            foreach( func_get_args() as $sql )
            {
                if( strlen($sql) == 0 || (stripos($sql, 'null')) === 0 ):
                    continue;
                endif;

                if( $this->connection->real_query( $sql ) ):
                    if( $this->connection->field_count ):
                        $result = $this->connection->store_result();
                        $curr = array();
                        while( $row = $result->fetch_assoc() )
                        {
                            $curr[] = $row;
                        }
                        $result->free_result();
                        $this->transaction_rows[] = $curr;
                    endif;
                    $row_cnt += $this->connection->affected_rows;
                else:
                    $ok = FALSE;
                    break;
                endif;
            }

            if( $ok ):
                $this->connection->commit();
            else:
                $this->last_error = $this->connection->error;
                $row_cnt = -1;
                $this->connection->rollback();
            endif;
        }

        $this->affected_row_cnt = $row_cnt;
        return $row_cnt;
    }

    // ------------------------------------------------------------------------------
    //
    //  This method calls Lucas' bsd.Supplemental_Transact stored procedure.
    //  it MUST receive, as a parameter, an array with precisely 14 elements.
    //  Shown here is the parameter list in the actual stored procedure itself.
    //  The parameter array must correspond to this list, in this order:
    //
    //      'SUPPLEMENTAL_GU'       => uniqueidentifier,
	//      'ID_STAMP'              => varchar(10),
	//      'BADGE_NUM'             => varchar(10),
	//      'STIPEND_GU'            => uniqueidentifier,
	//      'YEAR_GU'               => uniqueidentifier,
	//      'LOCATION_GU'           => uniqueidentifier,
	//      'STIPEND_GENDER'        => varchar(5),
	//      'PAY_FREQUENCY'         => varchar(25),
	//      'IS_NONCONTINUING'      => bit,
	//      'SPLIT_TYPE'            => varchar(50),
	//      'DISTRIBUTION'          => varchar(100),
	//      'COMMENTS'              => varchar(200),
	//      'SPLIT_OTHER_AMOUNT'    => decimal,
    //      'IS_EXPERIENCE'         => bit,
    //
    // ------------------------------------------------------------------------------

    public function Save_Athletic_Supplemental($s = array())
    {
        // if( count($s) != 14 )
        // {
        //     $this->last_error = "Save_Athletic_Supplemental: Parameter list doesn't have 14 elements";
        //     $this->affected_row_cnt = -1;
        //     return $this->affected_row_cnt;
        // }

        $params = array();
        $errs = array();
        $inout = "";
        $numRows = "";

        foreach($s as $value)
        {
            $params[] = array($value, SQLSRV_PARAM_IN);
        }

        // --- transaction return value ---

        $params[] = array(&$numRows, SQLSRV_PARAM_INOUT);
        $params[] = array(&$inout, SQLSRV_PARAM_INOUT);

        $tsql  = "EXEC bsd.Supplemental_Transact ";
        $tsql .= "@SUPPLEMENTAL_GU = ?, ";
        $tsql .= "@ID_STAMP = ?, ";
        $tsql .= "@BADGE_NUM = ?, ";
        $tsql .= "@STIPEND_GU = ?, ";
        $tsql .= "@YEAR_GU = ?, ";
        $tsql .= "@LOCATION_GU = ?, ";
        $tsql .= "@STIPEND_GENDER = ?, ";
        $tsql .= "@PAY_FREQUENCY = ?, ";
        $tsql .= "@IS_NONCONTINUING = ?, ";
        $tsql .= "@SPLIT_TYPE = ?, ";
        $tsql .= "@DISTRIBUTION = ?, ";
        $tsql .= "@COMMENTS = ?, ";
        $tsql .= "@SPLIT_OTHER_AMOUNT = ?, ";
        $tsql .= "@IS_EXPERIENCE = ?, ";
        $tsql .= "@RETURNROWS = ?, ";
        $tsql .= "@RETURNERRORS = ?";

        $stmt = sqlsrv_prepare( $this->connection, $tsql, $params);
        if( $stmt )
        {
            if( sqlsrv_execute($stmt) === false ):
                if( ($error_array = sqlsrv_errors()) != null ):
                    $errs = array_pop($error_array);
                    $this->last_error = 'Execute Stmt Error Code ' . $errs['code'] . ' : ' . $errs['message'];
                else:
                    $this->last_error = 'bsd.Supplemental_Transact execute: false -- no error info';
                endif;
            else:
                sqlsrv_next_result($stmt);
                $this->affected_row_cnt = $numRows;
                $this->last_error = $inout;
                sqlsrv_free_stmt( $stmt );
            endif;
        }
        else
        {  
            if( ($error_array = sqlsrv_errors()) != null ):
                $errs = array_pop($error_array);
                $this->last_error = 'Prepare Error ' . $errs['code'] . ' : ' . $errs['message'];
            else:
                $this->last_error = 'bsd.Supplemental_Transact prepare: false -- no error info';
            endif;
            $this->affected_row_cnt = -3;
        }

        return $this->affected_row_cnt;
    }

    // ------------------------------------------------------------------------------
    //
    //  This method is the same as the one above except it is for
    //  "other" supplementals.
    //
    // ------------------------------------------------------------------------------

    public function Save_Other_Supplemental($s = array())
    {
        // if( count($s) != 14 )
        // {
        //     $this->last_error = "Save_Other_Supplemental: Parameter list doesn't have the right number of elements";
        //     $this->affected_row_cnt = -1;
        //     return $this->affected_row_cnt;
        // }

        $params = array();
        $errs = array();
        $numRows = '';
        $inout = '';

        foreach($s as &$value)
        {
            $params[] = array($value, SQLSRV_PARAM_IN);
        }

        $param[] = array(&$numRows, SQLSRV_PARAM_INOUT);
        $param[] = array(&$inout, SQLSRV_PARAM_INOUT);

        $tsql  = "EXEC bsd.Supplemental_Transact ";
        $tsql .= "@SUPPLEMENTAL_GU = ?, ";
        $tsql .= "@ID_STAMP = ?, ";
        $tsql .= "@BADGE_NUM = ?, ";
        $tsql .= "@STIPEND_GU = ?, ";
        $tsql .= "@YEAR_GU = ?, ";
        $tsql .= "@LOCATION_GU = ?, ";
        $tsql .= "@STIPEND_GENDER = ?, ";
        $tsql .= "@PAY_FREQUENCY = ?, ";
        $tsql .= "@IS_NONCONTINUING = ?, ";
        $tsql .= "@SPLIT_TYPE = ?, ";
        $tsql .= "@DISTRIBUTION = ?, ";
        $tsql .= "@COMMENTS = ?, ";
        $tsql .= "@SPLIT_OTHER_AMOUNT = ?, ";
        $tsql .= "@IS_EXPERIENCE = ?, ";
        $tsql .= "@RETURNROWS = ?, ";
        $tsql .= "@RETURNERRORS = ?";

        $stmt = sqlsrv_prepare( $this->connection, $tsql, $params);
        if( $stmt )
        {
            if( sqlsrv_execute($stmt) === false ):
                if( ($error_array = sqlsrv_errors()) != null ):
                    $errs = array_pop($error_array);
                    $this->last_error = 'Execute Stmt Error Code ' . $errs['code'] . ' : ' . $errs['message'];
                else:
                    $this->last_error = 'bsd.Supplemental_Transact execute: false -- no error info';
                endif;
                $this->affected_row_cnt = -2;
            else:
                $this->affected_row_cnt = sqlsrv_rows_affected($stmt);
                sqlsrv_free_stmt( $stmt );
            endif;
        }
        else
        {  
            if( ($error_array = sqlsrv_errors()) != null ):
                $errs = array_pop($error_array);
                $this->last_error = 'Prepare Stmt Error Code ' . $errs['code'] . ' : ' . $errs['message'];
            else:
                $this->last_error = 'bsd.Supplemental_Transact prepare: false -- no error info';
            endif;
            $this->affected_row_cnt = -3;
        }

        return $this->affected_row_cnt;
    }

    // ------------------------------------------------------------------------------------------------------------

    public function Year_Rollover($year_gu)
    {

        $procedure_params = array(
            array(&$year_gu, SQLSRV_PARAM_IN)
        );

        $sql = "EXEC bsd.New_Year_Rollover @YEAR_GU = ?";

        $stmt = sqlsrv_prepare($this->connection, $sql, $procedure_params);

        if( $stmt === false ) {
            die( print_r( sqlsrv_errors(), true));
        }

        if(sqlsrv_execute($stmt) === false){
            die( print_r( sqlsrv_errors(), true));
        }

        return true;
    }

    // ------------------------------------------------------------------------------------------------------------

    public function FiscalYear()
    {
        $tsql = "SELECT YEAR_RANGE FROM bsd.CurrentFiscalYearRange";
        $this->_Query($tsql, 'ASSOC');
        return $this->affected_row_cnt;
    }

}

?>
