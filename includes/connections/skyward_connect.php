<?php
$dsn = 'PROGRESS';
$user = 'roodbcuser01';
// $pw = 'Br0wnBo@t1n';
$pw = 'xwiNy7OrbE';
$odbc_con  = odbc_connect($dsn,$user,$pw,SQL_CUR_USE_ODBC) or die( "ODBC Connection Error Code: " . odbc_error() );
?>