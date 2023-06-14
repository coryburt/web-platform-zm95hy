<?php
/**************************************************************************************************************************
 * 
 *  send_email_prototype.php 
 * 
 *  Version that utilizes the Smtp2Go API for Smtp2Go.com.
 *  See inline comments for more information.
 * 
 **************************************************************************************************************************/


//  =====================================================================================

set_time_limit(2400);
 
if( (@include '../../includes/local_functions.php') != TRUE ):
        require_once 'D:/wamp64/www/external/functions.php';
endif;

require_once 'common.php';
require_once 'connect_sqlsrv.php';
require_once 'HR_Stipends_Connect.php';
require_once 'D:/wamp64/bin/composer/vendor/autoload.php';

activate_error_reporting();
session_start();

$myArgs = [];
if ( isset( $_SERVER['argv'] ) ):
    $myArgs = getopt("a:l:d");
else:
    $myArgs = $_GET;
endif;

$DEBUG = ( isset($myArgs['d']) ) ? TRUE : FALSE;

if( $DEBUG == TRUE ):
    error_reporting(E_ALL & ~E_DEPRECATED & ~E_WARNING);
else:
    error_reporting(E_PARSE);
endif;
//
//  ---------------------------------------------------------------------------------------

if( ($context = getenv('CONTEXT', false)) !== false )
{
    define( 'CACHE_PATH', $context . '/cache' );
    define( 'INLINE_PATH', $context . '/inlines' );
    define( 'SCRIPT_PATH', $context );
    define( 'ATTACHMENTS_PATH', $context . "/includes" );
}
elseif( ($home = getenv('HOME', false)) !== false )
{
    define( 'CACHE_PATH', $home . '/cache' );
    define( 'INLINE_PATH', $home . '/inlines' );
    define( 'SCRIPT_PATH', $home );
    define( 'ATTACHMENTS_PATH', $home . "/includes" );
}
else
{
    define( 'CACHE_PATH', __DIR__ . '/cache' );
    define( 'INLINE_PATH', __DIR__ . '/inlines' );
    define( 'SCRIPT_PATH', __DIR__ );
    define( 'ATTACHMENTS_PATH', __DIR__ . "/includes" );
}

//  --------------------------------------------------------------------------------

//define( 'PEAR_PATH', "F:/wamp/bin/php/php8.1.7/pear" );
define( 'COMPOSER_PATH', "D:/wamp64/bin/composer/vendor" );
define( 'SMTP2GO_PATH', "D:/wamp64/bin/composer/vendor/smtp2go-oss/smtp2go-php/src" );
define( 'GUZZLE_PATH', "D:/wamp64/bin/composer/vendor/guzzlehttp/guzzle/src" );

set_include_path( 
    SMTP2GO_PATH . PATH_SEPARATOR .
    GUZZLE_PATH . PATH_SEPARATOR .
    COMPOSER_PATH . PATH_SEPARATOR . 
    ATTACHMENTS_PATH . PATH_SEPARATOR
);

use SMTP2GO\ApiClient;
use SMTP2GO\Service\Mail\Send as MailSend;
use SMTP2GO\Types\Mail\Address;
use SMTP2GO\Types\Mail\CustomHeader;
use SMTP2GO\Types\Mail\Attachment;
use SMTP2GO\Types\Mail\InlineAttachment;
use SMTP2GO\Collections\Mail\AddressCollection;
use SMTP2GO\Collections\Mail\AttachmentCollection;


$error_meister = 'Lucas:lharlor@bethelsd.org';


$recipients = [];
$attachList = [];

//  ---------------------------------------------------------------------------------------

$loc  = ( isset($myArgs['l']) ) ? $myArgs['l'] : 'Location Not Specified';
$att   = ( isset($myArgs['a']) ) ? $myArgs['a'] : 'Attachment Not Specified';

//  ---------------------------------------------------------------------------------------

$query = "
    SELECT 'lharlor@bethelsd.org', l.LOCATION_NAME, i.FIRST_NAME
    FROM sec.USER_ROLES u
    JOIN bsd.StaffInfo i ON i.BADGE_NUM = u.BADGE_NUM
    JOIN bsd.LOCATIONS l ON l.LOCATION_GU = '$loc'
    JOIN bsd.GetLookupValues('SECURITY','ROLES') rol ON rol.VALUE_CODE = u.ROLE_CODE
    WHERE rol.VALUE_DESCRIPTION = 'coordinator' AND left(building_loc+'0000', 4) = l.location_code
";

$db = new HR_Stipends_Connect($connection);

// $data = ["EMAIL"=>"lharlor@bethelsd.org",
//          "LOCATION_NAME"=>"ANNEX",
//          "FIRST_NAME"=>"LUCAS"];
$data = [];
if( $db->Query($query) ) {
    foreach($db->Rows() as $row)
    {
        $data['EMAIL'] = $row['EMAIL'];
        $data['LOCATION_NAME'] = $row['LOCATION_NAME'];
        $data['FIRST_NAME'] = $row['FIRST_NAME'];
    }
}



$recipients[] = $error_meister;
$recipients[] = $data['EMAIL'];
//  ---------------------------------------------------------------------------------------

$named_addressee = $unnamed_addressee = [];
$to_name = 'BSD Staff Member';
$to_email = '';

if( count($recipients) > 0 )
{
    $first_recipient = array_shift($recipients);
    if( strpos($first_recipient, ':') ):
        list($to_name, $to_email) = explode(':', $first_recipient);
    else:
        $to_email = trim($first_recipient);
    endif;
}

foreach($recipients as $addr)
{
    if( strpos($addr, ':') !== false )
    {
        list($name, $email) = explode(':', $addr);
        $named_addressee[trim($name)] = trim($email);
    }
    else 
    {
        $unnamed_addressee[] = trim($addr);
    }
}

//  --------------------------------------------------------------------------------

$attachments = [];
$attachments_err = [];

$fname = pathinfo( $att, PATHINFO_BASENAME );
if( file_exists( $att ) )
{
    $path = pathinfo( realpath($att), PATHINFO_DIRNAME );
    $attachments[$path][] = $fname;
}
elseif( file_exists(SCRIPT_PATH . '/'. $fname) )
{
    $attachments[SCRIPT_PATH][] = $fname;
}
elseif( file_exists(CACHE_PATH . '/'. $fname) )
{
    $attachments[CACHE_PATH][] = $fname;
}
else 
{
    $attachments_err[] = $att;
}


$title = "Certification Rosters for ".$data['LOCATION_NAME'];

//  --------------------------------------------------------------------------------

$message = <<<EOM
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{$title}</title>
</head>
<body>
<p>Hello {$data["FIRST_NAME"]}, <br/><br/>
Please find attached the certifications roster for your location. <br/>
</p>
<p>Thanks, BSD Technology/HR<br/></p>
</body>
</html>
EOM;

//  --------------------------------------------------------------------------------

$sendService = new MailSend(
    new Address('noreply@bethelsd.org', 'Bethel Technology')
    , new AddressCollection([
            new Address($to_email, $to_name)
    ])
    , $title
    , $message
);

foreach($named_addressee as $name => $email)
{
    $sendService->addAddress('cc', new Address($email, $name));
} 

foreach($unnamed_addressee as $email)
{
    $sendService->addAddress('cc', new Address($email));
}

//  --------------------------------------------------------------------------------

$attachmentObjects = [];

if( count($attachments) > 0 )
{
    foreach($attachments as $path => $array_of_files)
    {
        foreach($array_of_files as $file):
            $attachmentObjects[] = new Attachment($path . '/' . $file);
        endforeach;
    }

    $sendService->setAttachments(
        new AttachmentCollection( $attachmentObjects )
    );
}

//  --------------------------------------------------------------------------------

$sendService->addCustomHeader(new CustomHeader('Reply-To', 'noreply@bethelsd.org'));

//  --------------------------------------------------------------------------------

$apiClient = new ApiClient('api-3B309B7CF89011ECAF0BF23C91C88F4E');

$success = $apiClient->consume($sendService);

$responseBody = json_decode($apiClient->getResponseBody(false), true);
$send_failed = ( $responseBody['data']['failed'] > 0 || count($responseBody['data']['failures']) > 0 ) ? true : false;


if( $send_failed == true ):
    echo 'Email send failed:' . PHP_EOL;
    print_r( $responseBody['data']['failures'] );
else:
    echo 'Email sent OK';
endif;

$attachment_failures = is_array($attachments_err) ? count($attachments_err) : 0;

if( $DEBUG == TRUE || $send_failed || $attachment_failures > 0 ):
    if( !is_cli() ):
        echo '<pre>';
        print_r($responseBody);
        if( count($attachments_err) > 0 ):
            echo '<br />Attachments that could not be sent:<br />';
            print_r($attachments_err);
        endif;
        echo '</pre>';
    else:
        if( count($attachments_err) > 0 ):
            echo '=======================================================';
            echo PHP_EOL . 'ERROR SENDING ATTACHMENTS:' . PHP_EOL;
            print_r($attachments_err);
            echo PHP_EOL;
        endif;
        if( count($inlines_err) > 0 ):
            echo '=======================================================';
            echo PHP_EOL . 'ERROR SENDING INLINE ATTACHMENTS:' . PHP_EOL;
            print_r($inlines_err);
            echo PHP_EOL;
        endif;
        echo '=======================================================';
        echo PHP_EOL . 'Email Request ID: ' . $responseBody['request_id'] . PHP_EOL;
    endif;
endif;

?>