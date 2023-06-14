<?php
/*
 *  HR Stipends
 *  staffImageFeed.php
 * 
 *  AJAX handler to fetch a staff image from the bethelmedia1 server 
 *
*****************************************************************************/

set_time_limit(60);      // timeout

if( (@include '../local_functions.php') != TRUE ):
  require_once 'D:/wamp64/www/external/functions.php';
endif;

require_once 'common.php';

activate_error_reporting();
session_start();

$image_data = json_encode(
    array(
        "data" => '<img src="includes/images/default3.png">'
    )
);

$width = (  isset($_REQUEST['wt']) && is_numeric($_REQUEST['wt']) )
            ? $_REQUEST['wt'] : 183;

$height = (  isset($_REQUEST['ht']) && is_numeric($_REQUEST['ht']) )
            ? $_REQUEST['ht'] : 154;

if( isset($_REQUEST['id']) && is_numeric($_REQUEST['id']) )
{
    $query = array(
        'id'    => $_REQUEST['id'],
        'typ'   => 'img',
        'wt'    => $width,
        'ht'    => $height,
        'sty'   => "border-style:solid;border-width:1px;border-color:#646569"
    );

    $url = "http://bethelmedia1.bethel.wednet.edu/apps/general_image_feed.php?" . http_build_query($query);
    if( $hd = fopen($url, "r") )
    {
        $html = fgets($hd);
        $image_data = json_encode(array("data" => $html));
        fclose($hd);
    }
    else 
    {
        $image_data = json_encode(
            array(
                "data" => '<img src="includes/images/default4.png">'
            )
        );
    }
}

echo $image_data;

?>
