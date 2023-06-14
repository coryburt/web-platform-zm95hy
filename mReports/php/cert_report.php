<?php
/*
 *
 *  cert_report.php
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

 $from = $_GET['from'];
 $limit = $_GET['limit'];
 $prepare = $_GET['prepare'];

$query =<<<EOF
select st.DESCRIPTION as STIPEND, concat(sf.LAST_NAME, ' ', sf.FIRST_NAME) as COACH,
ce.DESCRIPTION as CERTIFICATE, ca.CERT_AQUIRED as VALID, ca.END_DATE as EXP, ca.CERT_COMMENTS as COMMENTS
from bsd.Certs_Aquired ca
JOIN bsd.SUPPLEMENTALS su ON su.SUPPLEMENTAL_GU = ca.SUPPLEMENTAL_GU
JOIN bsd.STIPENDS st ON st.STIPEND_GU = su.STIPEND_GU
JOIN bsd.StaffInfo sf ON sf.BADGE_NUM = su.BADGE_NUM
JOIN bsd.CERTIFICATIONS ce ON ce.CERTIFICATION_GU = ca.CERTIFICATION_GU
ORDER BY sf.BADGE_NUM, st.DESCRIPTION, ce.CERTIFICATION_GU


EOF;

$db = new HR_Stipends_Connect($connection);
$data = array( 'data' => array(), 'total_count' => '', 'from' => intval($from) );

if( $db->Query($query) )
{
    foreach($db->Rows() as $row)
    {
        // $row['SELECTOR'] = str_replace("XXX", $row['SUPPLEMENTAL_GU'], $buttonTemplate);
        $data['data'][] = $row;
    }
}

$data['total_count'] = intval(sizeof($data['data']));

header('Content-Type: application/json, charset=UTF-8');
echo json_encode($data);

?>
