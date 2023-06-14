<?php
    /***************************************************************************
    *   Description: Creates a brand new session called hr_stipends
    * 
    *   Written By:
    *   Created on: 
    **************************************************************************/

    session_start();
    include("includes/connections/connectInfo.inc");

    // Clear any existing session 
    $_SESSION['hr_stipends'] = '';

    // Set static groups
    $_SADMIN = array('bpontelars','lharlor','cburt','mlitwin','tmitchell','cmarlow');
    $_ADMIN = array('rgibson','bstreleski');
    $_DIRECTORS = array();
    $_COACH = array('idautotester');
    $_HR = array();
    $_OTHER = array();

    // Must have a referrer
    if ($_SERVER['HTTP_REFERER']) {

        if( $_GET['ui'] && is_numeric($_GET['ui']) ) {
            $_SESSION['hr_stipends']['staffID'] = str_pad($_GET['ui'], 5, '0', STR_PAD_LEFT);

            $query = "SELECT si.staffID 
                      FROM warehouse.staffInfo AS si
                      WHERE si.staffID = '" . $_SESSION['hr_stipends']['staffID'] . "' " ;

            $result = runSQL($query, 'warehouse') OR DIE(mysql_error());
            $row    = mysql_fetch_array($result);

            // Check if the staff ID exists in Warehouse.
            if( !$row['staffID'] ) {
                $_SESSION['hr_stipends'] = '';
                header('Refresh: 5; URL=http://portal.bethelsd.org' ) ;
                echo "<h1> Staff ID doesn't exist! </h1>";
                echo "<p> Please log back into the portal with a suitable staff ID. </p>";
                echo "<p> Redirecting to Bethel portal login page... </p>";

            } else {

                // Check if the session has expired.
                if ( !$_SESSION['hr_stipends']['staffID'] ) {
                    $_SESSION['hr_stipends'] = '';
                    header('Refresh: 5; URL=http://portal.bethelsd.org' ) ;
                    echo "<h1> Bethel session has timed out. </h1>";
                    echo "<p> Please log back in to view the page. </p>";
                    echo "<p> Redirecting to Bethel portal login page... </p>";        
                    exit;

                } else {

                    $query2 = "SELECT si.staffID,si.stfFirst,si.stfLast,si.facTitle,bi.bldgID,bi.bldgName,si.stfUsername
                               FROM warehouse.staffInfo AS si
                               LEFT JOIN warehouse.buildingInfo AS bi ON si.bldgID = bi.bldgID
                               WHERE si.staffID = '" . $_SESSION['hr_stipends']['staffID'] . "'";

                    $result2 = runSQL( $query2, 'warehouse' ) OR DIE(mysql_error());

                    while ( $row2 = mysql_fetch_array( $result2 ) ) {
                        $_SESSION['hr_stipends']['staffID']    = $row2['staffID'];
                        $_SESSION['hr_stipends']['firstName']  = $row2['stfFirst'];
                        $_SESSION['hr_stipends']['lastName']   = $row2['stfLast'];
                        $_SESSION['hr_stipends']['title']      = $row2['facTitle'];
                        $_SESSION['hr_stipends']['buildingID'] = $row2['bldgID'];
                        $_SESSION['hr_stipends']['building']   = $row2['bldgName'];
                        $_SESSION['hr_stipends']['username']   = $row2['stfUsername'];
                        $_SESSION['hr_stipends']['sass']       = 'normal';
                        if( in_array($row['username'], $admin_users) ) $_SESSION['TranScribe']['sass'] = 'admin';
                        if( in_array($row['username'], $superadmin_users) ) $_SESSION['TranScribe']['sass'] = 'superadmin';
                    };
                    header( 'Location: index.php' );
                }
            }
        }
    } else {
        header('Refresh: 5; URL=https://portal.bethelsd.org' ) ;
        echo "<h1> There was an error processing the request. </h1>";
        echo "<p> Not refered correctly. </p>";
        echo "<p> Redirecting to Bethel Portal login page... </p>";
    }

?>