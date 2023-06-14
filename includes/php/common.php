<?php
/* **********************************************************************************
 *
 *  Functions for all the PHP's in your life!  Enjoy!
 * 
 * ********************************************************************************** */

spl_autoload_register(
    function ($class) {
        include $class . '.php';
    }
);

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
/*
@access public
@param string
*/

function mb_basename($path) 
{
    if (preg_match('@^.*[\\\\/]([^\\\\/]+)([\\\\/]+)?$@s', $path, $matches)) 
    {
        return $matches[1];
    } 
    else if (preg_match('@^([^\\\\/]+)([\\\\/]+)?$@s', $path, $matches)) 
    {
        return $matches[1];
    }
    return '';
}

//  ----------------------------------------------------------------------------------
/*
@access public
@param
*/

function is_cli()
{
    if( defined('STDIN') )
    {
        return TRUE;
    }
    
    if( empty($_SERVER['REMOTE_ADDR']) and !isset($_SERVER['HTTP_USER_AGENT']) and count($_SERVER['argv']) > 0) 
    {
        return TRUE;
    } 
    
    return FALSE;
}

//  ----------------------------------------------------------------------------------
/*
@access public
@param
*/

if( !function_exists('activate_error_reporting') )
{
    function activate_error_reporting($include_warnings = false)
    {
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        if( $include_warnings ):
            error_reporting(E_ALL);
        else:
            error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE & ~E_STRICT & ~E_DEPRECATED);
        endif;
    }
}

//  ----------------------------------------------------------------------------------
/*
@access public
@param string, string
*/

function rsearch($folder, $pattern)
{
    $fileList = array();
    if( file_exists($folder) )
    {
        $dir = new RecursiveDirectoryIterator($folder);
        $ite = new RecursiveIteratorIterator($dir);
        $files = new RegexIterator($ite, $pattern, RegexIterator::GET_MATCH);
        foreach($files as $file) 
        {
            $fileList[] = $file[0];
        }
    }
    return $fileList;
}

//  ----------------------------------------------------------------------------------
/*
@access public
@param string, string
*/

if(!function_exists('rfile_exists'))
{
    function rfile_exists($folder, $fname)
    {
        $result = "";
        if( is_dir($folder) )
        {
            try {
                $dir = new RecursiveDirectoryIterator($folder);
                $ite = new RecursiveIteratorIterator($dir);
                foreach($ite as $file) 
                {
                    if(strrpos($file->getPathname(), $fname) === false) continue;
                    $result = $file->getPathname();
                    break;
                }
            } catch(Exception $e) {
                $result = $e->getMessage();
            }
        }
        return $result;
    }
}

// =====================================================================================================
/*
@access public
@param string, (string), (string)
*/

function Fix_Name($l, $f = '', $m = '')
{
    if (empty($l) && empty($f) && empty($m)) return ('');
    $last = trim($l); $first = trim($f); $middle = trim($m);
    $last = strtolower(str_replace("\n", "", $last));
    $last = implode('-', array_map('ucfirst', explode('-', $last)));

    if ($first) {
        $first = strtolower(str_replace("\n", "", $first));
        $first = implode('-', array_map('ucfirst', explode('-', $first)));
        if (strlen($first) == 1) $first .= '.';
    }

    if ($middle) {
        $middle = strtolower(str_replace("\n", "", $middle));
        $middle = implode('-', array_map('ucfirst', explode('-', $middle)));
        if (strlen($middle) == 1) $middle .= '.';
    }

    return( array($last, $first, $middle) );
}

// =====================================================================================================
/*
@access public
@param string, (string), (string)
*/

function Norm_Name($l, $f = '', $m = '')
{
    list($last, $first, $middle) = Fix_Name($l, $f, $m);
    return (ucwords( implode( " ", array($first, $middle, $last) ) ));
}

// =====================================================================================================
/*
@access public
@param string, (string), (string)
*/

function Sort_Name($l, $f = '', $m = '')
{
    list($last, $first, $middle) = Fix_Name($l, $f, $m);
    if (strlen($first) > 0 || strlen($middle) > 0) $last .= ",";
    return ( ucwords( implode(" ", array($last, $first, $middle)) ) );
}

?>
