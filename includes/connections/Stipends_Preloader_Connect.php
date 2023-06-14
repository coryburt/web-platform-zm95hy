<?php
/*
 *  Stipends_Preloader_Connect.php
 * 
 */

class Stipends_Preloader_Connect
{
    protected $connection;
    protected $rows;
    protected $last_error;
    protected $affected_row_cnt;
    protected $connect_info;
    protected $SQLSRV_HOST;

    // ------------------------------------------------------------------------------------------------------------

    public function __construct($uid = 'bpontelars')
    {
        $this->connect_info = array(
            "Database"               => 'hr_stipends',
            "UID"                    => $uid,
            "PWD"                    => 'Polar-Glitter5-Running',
            "TrustServerCertificate" => 1
        );

        $this->SQLSRV_HOST = 'WebHRMSSQL1-dev';

        $this->rows = array();
        $this->last_error = '';
        $this->affected_row_cnt = 0;

        $this->connection = sqlsrv_connect($this->SQLSRV_HOST, $this->connect_info);

        if( !$this->connection ):
            if( ($err_array = sqlsrv_errors()) != null )
            {
                $errs = array_pop($err_array);
                die( "Error code " . $errs['code'] . " : " . $errs['message'] );
            }
            else 
            {
                die( "Unspecified connection error ");
            }
        endif;
    }

    // ------------------------------------------------------------------------------------------------------------

    function __destruct() { 
        sqlsrv_close($this->connection);
    }

    // ------------------------------------------------------------------------------------------------------------

    public function Rows() { return $this->rows; }
    public function LastError() { return $this->last_error; }
    public function AffectedRowCnt() { return $this->affected_row_cnt; }
    public function Info() 
    {
        $info = sqlsrv_server_info($this->connection);
        $result = implode("; " . $info);
        return $result;
    }

    // ------------------------------------------------------------------------------------------------------------

    public function StaffList($badge_num = '')
    {
        $clause = "";
        if( is_array($badge_num ) )
        {
            if( count($badge_num) > 1 ):
                $clause = " AND si.BADGE_NUM IN ('" . implode("', '", $badge_num) . "') ";
            elseif( count($badge_num) == 1 ):
                $clause = " AND si.BADGE_NUM = '" . array_pop($badge_num) . "' ";
            endif;
        }
        elseif( $badge_num != '' )
        {
            $clause = " AND si.BADGE_NUM = '${badge_num}' ";
        }

        $tsql = 'SELECT si.BADGE_NUM, si.USERNAME, ur.ROLE_CODE, si.FIRST_NAME, si.LAST_NAME, si.JOB_TITLE ';
        $tsql .= " , STRING_AGG(uc.CATEGORY_CODE, ', ') AS CATEGORIES ";
        $tsql .= 'FROM bsd.StaffInfo si ';
        $tsql .= 'JOIN sec.USER_ROLES ur ON ur.BADGE_NUM = si.BADGE_NUM ';
        $tsql .= 'LEFT JOIN sec.user_category uc ON ur.badge_num = uc.badge_num ';
        $tsql .= "WHERE si.JOB_TITLE != 'TERMINATED' ${clause}";
        $tsql .= 'GROUP BY si.LAST_NAME, ur.role_code, si.JOB_TITLE, si.FIRST_NAME, si.BADGE_NUM, si.USERNAME ';

        $this->_Query($tsql);
        return $this->affected_row_cnt;
    }

    // ------------------------------------------------------------------------------------------------------------

    public function Query($sql = '')
    {
        $this->_Query($sql);
        return $this->affected_row_cnt;
    }

    // ------------------------------------------------------------------------------------------------------------

    private function _Query($sql)
    {
        $row_cnt = -1;
        $this->rows = array();

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
            if( ($err_array = sqlsrv_errors()) != null )
            {
                $errs = array_pop($err_array);
                $this->last_error = 'Error Code ' . $errs['code'] . ' : ' . $errs['message'];
            }
            else
            {
                $this->last_error = "Unknown Error";
            }
        }

        $this->affected_row_cnt = $row_cnt;
    }
}

?>
