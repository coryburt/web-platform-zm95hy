<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
/* = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
     = =  Apps - Athletic Stipends                                           = =
     = =       - Send an email of the cert report pdf to the building        = =
     = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */

 set_time_limit(60*3);      // 3-minute timeout
 
 if( (@include '../../includes/local_functions.php') != TRUE ):
         require_once 'D:/wamp64/www/external/functions.php';
 endif;
 
 require_once 'common.php';
 require_once 'connect_sqlsrv.php';
 require_once 'D:/wamp64/bin/composer/vendor/autoload.php';
 
 if ( isset( $_SERVER['argv'] ) ) {
    $myArgs = getopt("l:a:");
    $loc    = ($myArgs['l']);
    $att    = ($myArgs['a']);

} else {
    $loc    = (isset($_GET['l']) ? $_GET['l'] : '0');
    $att    = (isset($_GET['a']) ? $_GET['a'] : '0');
};

if($loc == 0 || $att == 0) {
    die("ERROR: Location or Attatchment do not exist.");
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = FILL ESSENTIAL EMAIL CONTENT  = = = = = = = = = = = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

$from_name = 'Automated Script';
$from_mail = 'donotreply@bethelsd.org';
$to_mails  = '';



$query = "
    SELECT i.EMAIL, l.LOCATION_NAME, i.FIRST_NAME
    FROM sec.USER_ROLES u
    JOIN bsd.StaffInfo i ON i.BADGE_NUM = u.BADGE_NUM
    JOIN bsd.LOCATIONS l ON l.LOCATION_GU = $loc
    WHERE u.ROLE_CODE = 'coordinator' AND left(building_loc+'0000', 4) = l.location_code
";

$db = new HR_Stipends_Connect($connection);

$data = ["EMAIL"=>"lharlor@bethelsd.org",
         "LOCATION_NAME"=>"ANNEX",
         "FIRST_NAME"=>"LUCAS"];
// if( $db->Query($query) ) {
//     foreach($db->Rows() as $row)
//     {
//         $data['EMAIL'] = $row['EMAIL'];
//         $data['LOCATION_NAME'] = $row['LOCATION_NAME'];
//         $data['FIRST_NAME'] = $row['FIRST_NAME'];
//     }
// }

if(is_null($data['EMAIL']) || is_null($data['LOCATION_NAME']) || is_null($data['FIRST_NAME'])) {
    die("ERROR: Email, Location, or Coordinator could not be found.");
}

$my_subject = "Certification Rosters for " . $data['LOCATION_NAME'];
$my_message = "Hello " . $data['FIRST_NAME'] . ",\r\n\r\n" .
                "Please find attached the certifications roster for your location.\r\n\r\n" .
                "Thanks, BSD Technology/HR";


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = CREATE EMAIL TO SEND  = = = = = = = = = = = = = = = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

$email = new PHPMailer( TRUE );
$email->IsSMTP();
$email->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
$email->FromName = $from_name;
$email->From     = $from_mail;
$email->Subject  = $my_subject;
$email->Body     = $my_message;
$email->AddAttachment('D:/wamp64/www/dev/hr_stipends/exports/cert/DAEF8785-3747-4B28-B452-11EB93D02ACC/cert_report.pdf');
$email->AddAddress($data['EMAIL']);

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = SEND EMAIL - ERROR IF FAILED  = = = = = = = = = = = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

if( !$email->send() ) {
    die("ERROR: Email could not be sent.");
} else {

    $log = "INSERT INTO bsd.REPORT_LOG(REPORT_LOG_GU, ADD_DATE_TIME_STAMP, ADD_ID_STAMP, REPORT_NAME)
    VALUES(newid(),GETDATE(),".$_SESSION['hr_stipends']['staffID'].", $att)";

    if( $db->Insert($log) ) {
        
    } else {
        die("ERROR: Report not logged.");
    }
};

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// = = = CLEAR ALL ADDRESSES FOR NEXT LOOP = = = = = = = = = = = = = = = = = =
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

$email->clearAddresses();

return "SUCCESS";

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

?>