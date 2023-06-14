<?php
/*
 *  revealCode.php
 *  Version for HR Stipends
 *  Returns an HTML list of code files in the project, OR
 *  returns the contents of those files for display.
 * 
 * =============================================================== */

set_time_limit(60*3);      // 3-minute timeout

if( (@include '../../includes/local_functions.php') != TRUE ):
    require_once 'D:/wamp64/www/external/functions.php';
endif;
require_once 'common.php';

activate_error_reporting();
session_start();

$specific_file = (isset($_REQUEST['file']) ) ? $_REQUEST['file'] : '';

$html = "";
$fileList = array();
$preloaders = array();
$php = array();
$js = array();

foreach($LOCAL_PHP_PATHS as $path)
{
    $tmp = rsearch($path, "/^.*\.php$/");
    sort($tmp);
    $php = array_merge($php, $tmp);
}

foreach($LOCAL_JS_PATHS as $path)
{
    $tmp = rsearch($path, "/^.*\.js$/");
    sort($tmp);
    $js = array_merge($js, $tmp);
}

$css = rsearch(_INC_DIR . DIRECTORY_SEPARATOR . "css", "/^.*\.css$/");
sort($css);
$connections = rsearch(_CON_DIR, "/^.*\.inc$/");
sort($connections);
$full = array_merge($php, $js, $css, $connections);

if( strlen($specific_file) == 0 )
{
    $y = array();
    $x = array_combine($full, array_map("basename",$full));
    foreach($x as $path => $bname)
    {
        $href = addslashes($path);
        $y[] = '<div class="link-like" onClick="GetCode(\''.$href.'\')">'.$bname.'</div>';
    }
    $html  = '<div id="meta-data-nav">';
    $html .= '<div id="meta-data-nav-header">CODE FILES</div>';
    $html .= implode("\n", $y);
    $html .= '</div>';
}
elseif( in_array($specific_file, $full) ) 
{
    $html  = '<div id="data-peek-area" class="generic-display"><pre>';
    $html .= htmlspecialchars(file_get_contents($specific_file));
    $html .= '</pre></div>';
}

// header('Content-Type: application/json, charset=UTF-8');

echo $html;

?>
