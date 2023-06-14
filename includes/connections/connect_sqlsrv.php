<?php

if( (@include '../../includes/local_functions.php') != TRUE ):
        require_once 'D:/wamp64/www/external/functions.php';
endif;

$connectionInfo = array( 
        "Database" => _SQLSRV_DB, 
        "UID" => _SQLSRV_UID, 
        "PWD" => _SQLSRV_PWD,
        "TrustServerCertificate" => 1
);
$connection = sqlsrv_connect( _SQLSRV_HOST, $connectionInfo);

if( !$connection ) 
{
        echo "SQLServer connection could not be established.<br />";
        die( print_r( sqlsrv_errors(), true));
}

?>
