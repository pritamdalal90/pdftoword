<?php
	ob_start();
	session_start();	
	error_reporting(0);
	define("DIRECTORY_PATH",'pdftodocx');
	
	define("HTTP_PATH", "http://".$_SERVER['HTTP_HOST']."/".DIRECTORY_PATH."/");
	define("PHYSICAL_PATH", $_SERVER['DOCUMENT_ROOT']."/".DIRECTORY_PATH."/");
	
	define("PAGE_TITLE", "PDF TO DOC CONVERTER");
	
	define("INC_DIR","includes/");
	define("ASSETS_DIR","assets/");
	define("JS_DIR",ASSETS_DIR."js/");
	define("CSS_DIR",ASSETS_DIR."css/");
	define("IMAGES_DIR",ASSETS_DIR."images/");
	define("FILES_DIR","files/");
	define("DOC_DIR","doc/");
	
	global $CURRENT_URL, $SCRIPT_PENDING_FOR_EXECUTION;
	$SCRIPT_PENDING_FOR_EXECUTION = array();
	
	$req = rtrim($_SERVER['REQUEST_URI'],'/');
	$CURRENT_URL = 'http://'.$_SERVER['HTTP_HOST'].$req.'/';
	include_once("functions.php");
?>