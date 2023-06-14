<?php
/* ===============================================================================
   == Title      : HR - Stipend Management Application
   == Description: 
   == Author     : 
   == Created    : 
   == Parameters : 
   =============================================================================== */

session_start();

if( (@include './includes/local_functions.php') != TRUE ):
    require_once 'D:/wamp64/www/external/functions.php';
endif;

/* --- Comment these lines out in production ---
include 'common.php';
activate_error_reporting();
*/

if( !isset($_SESSION['hr_stipends']['staffID']) || $_SESSION['hr_stipends']['staffID'] == '')
{
  header('Refresh: 5; URL=https://portal.bethelsd.org' ) ;
  echo "<h1> There was an error processing the request. </h1>";
  echo "<p> Not refered correctly. </p>";
  echo "<p> Redirecting to Bethel Portal login page... </p>";
  /* */  
}

//===============================================================
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HR - Stipend Management</title>

    <link rel="icon" type="image/x-icon" href="includes/images/bethel.ico">
    <link rel="stylesheet" type="text/css" href="includes/css/main.css"></link> 
    <link href="includes/css/fontawesome.css" rel="stylesheet"></link>
    <link href="includes/css/brands.css" rel="stylesheet"></link>
    <link href="includes/css/solid.css" rel="stylesheet"></link>

    <link rel="stylesheet" type="text/css" href="includes/dhtmlx8/codebase/suite.css"></link> 
    <script type="text/javascript" src="includes/dhtmlx8/codebase/suite.min.js"></script>

    <script type="text/javascript" src="includes/js/functions.js"></script>
    <script type="text/javascript" src="includes/js/init.js"></script>
    <script type="text/javascript" src="mAnalytics/js/analytics.js"></script>
    <script type="text/javascript" src="mDevtools/js/revealStuff.js"></script>
    <script type="text/javascript" src="mExperience/js/experience.js"></script>
    <script type="text/javascript" src="mPicklists/js/picklists.js"></script>
    <script type="text/javascript" src="mReports/js/reports.js"></script>
    <script type="text/javascript" src="mSupplementals/js/supplementals.js"></script>
    <script type="text/javascript" src="mHelp/js/help.js"></script>
    <script type="text/javascript" src="mAdmin/js/securityRoles.js"></script>
    <script type="text/javascript" src="mAdmin/js/staffCerts.js"></script>
    <script type="text/javascript" src="mAdmin/js/yearRollover.js"></script>

  </head>

  <body>

    <div id="mainPage" style="height:100%;width:100%;"></div>
    <div id="snackBar"></div>

    <script type="module">
          import { main } from './includes/js/main.js';
          (() => { main(); })();
    </script>
  </body>
</html>
