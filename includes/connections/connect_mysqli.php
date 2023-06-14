<?php

$host = (defined('_HOST')) ? _HOST : '172.19.10.210';
$user = (defined('_USER')) ? _USER : 'webdev';
$pwd  = (defined('_PWD')) ? _PWD : 'th1nkb1G';
$db  = (defined('_DB')) ? _DB : 'warehouse';

$connection = mysqli_connect($host, $user, $pwd, $db) 
    or die('Could not connect to MySQL: ' . mysqli_connect_error());
?>
