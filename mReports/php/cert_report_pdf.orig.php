<?php
/*
 *
 *  getAccountCodes.php
 * 
 * =============================================================== */

 set_time_limit(60*3);      // 3-minute timeout
 if( PHP_SESSION_ACTIVE == session_status() ) session_start();
 
 if( (@include '../../includes/local_functions.php') != TRUE ):
         require_once 'D:/wamp64/www/external/functions.php';
 endif;
 
 require_once 'common.php';
 require_once 'connect_sqlsrv.php';
 require_once 'D:/wamp64/bin/composer/vendor/autoload.php';

$SEASON = $_GET['season'];
$LOCATION = $_GET['location'];
 
activate_error_reporting();

$rows = [];
$season_rows = [];

// ------------------------------------------------------------------------------------------------------------------------
$query = "
    SELECT p.DESCRIPTION as PROGRAM, CONCAT(stf.FIRST_NAME, ' ', stf.LAST_NAME) as COACH, cer.DESCRIPTION_SHORT as CERT_DESC,
    CONVERT(varchar(110),sc.START_DATE,107) as CERT_START, CONVERT(varchar(110),sc.END_DATE,107) as CERT_END, 
    CASE 
        WHEN c.CERT_COMMENTS = 'CERTIFICATE VALID FOR FULL SEASON.'
            THEN ''
        ELSE c.CERT_COMMENTS
    END as CERT_COMMENTS
    FROM bsd.Certs_Aquired c
    JOIN bsd.STAFF_CERTS sc ON sc.CERTIFICATION_GU = c.CERTIFICATION_GU
                            AND sc.BADGE_NUM = c.BADGE_NUM
    JOIN bsd.SUPPLEMENTALS s ON s.SUPPLEMENTAL_GU = c.SUPPLEMENTAL_GU
    JOIN bsd.STIPENDS st ON st.STIPEND_GU = s.STIPEND_GU
    JOIN bsd.LOCATIONS l ON l.LOCATION_GU = s.LOCATION_GU
    JOIN bsd.SEASONS se ON se.SEASON_GU = st.SEASON_GU
    JOIN bsd.PROGRAM p ON p.PROGRAM_GU = st.PROGRAM_GU
    JOIN bsd.StaffInfo stf ON stf.BADGE_NUM = s.BADGE_NUM
    JOIN bsd.CERTIFICATIONS cer ON cer.CERTIFICATION_GU = c.CERTIFICATION_GU
    WHERE se.SEASON_GU = '$SEASON'
    AND l.LOCATION_GU = '$LOCATION'
";

$db = new HR_Stipends_Connect($connection);


if( $db->Query($query) ) {
    foreach($db->Rows() as $row)
    {
        $rows[$row['PROGRAM']][$row['COACH']][$row['CERT_DESC']]['CERT_START'] = $row['CERT_START'];
        $rows[$row['PROGRAM']][$row['COACH']][$row['CERT_DESC']]['CERT_END'] = $row['CERT_END'];
        $rows[$row['PROGRAM']][$row['COACH']][$row['CERT_DESC']]['CERT_COMMENTS'] = $row['CERT_COMMENTS'];
    }
}


$season_info = "SELECT CONVERT(varchar(110),START_DATE,107) as START_DATE, CONVERT(varchar(110),END_DATE,107) as END_DATE
                FROM bsd.SEASONS
                WHERE SEASON_GU = '$SEASON'";

if( $db->Query($season_info) ) {
    foreach($db->Rows() as $row)
    {
        $season_rows['START_DATE'] = $row['START_DATE'];
        $season_rows['END_DATE'] = $row['END_DATE'];
    }
}


$html = "
            <table width='100%'>
                <TR>
                    <TD> 
                        <DIV class='BoxDiv_B'>
                            <table class='BoxBorder_B'>
                                <TR><TD class='PageHeader1'>ATHLETICS CERTIFICATION REPORT</TD><TD rowspan=5>&nbsp;</TD></TR>
                                <TR><TD class='PageHeader3'>*** COACHES WITHOUT VALID CERTIFICATES ON THIS REPORT ARE NOT AUTHORIZED TO TURNOUT.</TD></TR>
                            </table>
                        </DIV>
                    </TD>
                    <TD> 
                        <DIV>
                            <img src='../../includes/images/athletics.png' height=80 width=80/>
                        </DIV>
                    </TD>
                </TR>
            </table>
            <table width='100%' style='border-bottom: 1px solid'>
                <TR>
                    <td class='PageHeader4' style='width: 36%;'>COACH</td>
                    <td class='PageHeader4' style='width: 12%'>START DATE</td>
                    <td class='PageHeader4' style='width: 12%'>END DATE</td>
                    <td class='PageHeader4' style='width: 40%'>COMMENTS</td>
                </TR>
            </table>";


foreach($rows as $program=>$value) {
    //var_dump($value);
    $html.="
        <table width='100%'>
                <TR>
                    <TD> 
                        <DIV class='PageHeader1'>
                            ".$program."
                        </DIV>
                    </TD>
                    <TD> 
                        <DIV class='PageHeader2' style='text-align: right'>
                            SEASON ".$season_rows['START_DATE']." - ".$season_rows['END_DATE']."
                        </DIV>
                    </TD>
                </TR>
        </table>";

    foreach($value as $person => $certs) {
        $html.="<table style='width:100%; padding-bottom: 2px; margin-bottom: 2px; border-bottom: 1px dashed' >
                    <TR>
                        <TD class='PageHeader2'>
                            ".$person."
                        </TD>
                    </TR>
                </table>";

        $html.="<table>";
        foreach($certs as $cert=>$dates) {
            $html.="<TR class='CertRows'>";
            $html.="<td class='PageHeader4' style='max-width: 45%;'>".$cert."</td>";
            $html.="<td class='PageHeader4' style='max-width: 12%'>".$dates['CERT_START']."</td>";
            $html.="<td class='PageHeader4' style='max-width: 12%'>".$dates['CERT_END']."</td>";
            $html.="<td class='PageHeader5' style='max-width: 31%'>".$dates['CERT_COMMENTS']."</td>";
            $html.="</TR>";
        }
        
        $html.="</table>";
    }
}


$mpdf = new \Mpdf\Mpdf();

$stylesheet = file_get_contents('../../includes/css/reports.css');
$mpdf->WriteHTML($stylesheet, \Mpdf\HTMLParserMode::HEADER_CSS);
$mpdf->setFooter('Printed -  ' . date("m-d-Y g:i:s A") . '  - Page {PAGENO}/{nb}');

$mpdf->WriteHTML($html);
$mpdf->Output();

?>
