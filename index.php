<?php
include_once('includes/config.php');
if(!empty($_POST) || !empty($_FILES)) {
	$result = UploadFile($_FILES['upload_file'],FILES_DIR,$_FILES['upload_file']['name'],array('pdf','PDF'));
	if($result>0) {
		$pathInfo = @pathinfo($_FILES['upload_file']['name']);
		try {
			$FileName = $pathInfo['filename'];
			$INC_PATH = str_replace('/',"\\",__DIR__."\\".INC_DIR);
			$pathToPdfFile = str_replace('/',"\\",__DIR__."\\".FILES_DIR.$pathInfo['basename']);
			$downloadFile = FILES_DIR.$pathInfo['filename'].".doc";
			if(!file_exists(FILES_DIR.$pathInfo['filename'].".doc")) {
				$pathToDocFile = str_replace('/',"\\",__DIR__."\\".FILES_DIR.$pathInfo['filename'].".doc");
			} else {
				$pathToDocFile = str_replace('/',"\\",__DIR__."\\".FILES_DIR.date('Ymdhis')."-doc.doc");
				$downloadFile = FILES_DIR.date('Ymdhis')."-doc.doc";
			}
			if(file_exists($INC_PATH."convertPDF_DOCX.bat")) {
				//$converted = exec("cmd /B /c ".$INC_PATH."convertPDF_DOCX.bat ".$pathToPdfFile." ".$pathToDocFile,$result);
				$converted = exec("cmd /B /C ".$INC_PATH."convertPDF_DOCX.bat ".$pathToPdfFile." ".$pathToDocFile,$result);
				if(strrpos(trim($converted),"OK") !== false) {
					//@header('location:'.$downloadFile);
					setNotification("Your pdf successfully converted to docx.. ",50,"success","center",500,6000);
				} else {
					setNotification("Failed to convert .. Internal error !!",50,"error","center",300,6000);
				}
			} else {
				setNotification("Application not setup properly !!",50,"error","center",300,6000);
			}
		} catch(Exception $e) {
			setNotification("An Unknown error occurred !!",50,"error","center",390,6000);
		}
		
	} else {
		setNotification("Invalid File.. Please try again",50,"error","center",390,6000);
	}
}
?>
<!DOCTYPE html>
<html>
<head>
	<base href="<?=HTTP_PATH?>">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;">
	<link rel="stylesheet" href="<?=CSS_DIR?>layout1.css">
    <link rel="stylesheet" href="<?=CSS_DIR?>font-awesome.css" type="text/css">
    <link rel="stylesheet" href="<?=CSS_DIR?>style.css" type="text/css">
    <script type="text/javascript">
		var CURRENT_URL = '<?=$CURRENT_URL?>';
		var HTTP_PATH = '<?=HTTP_PATH?>';
	</script>
	<script type="text/javascript" src="<?=JS_DIR?>jquery-1.10.2.js"></script>
	<script type="text/javascript" src="<?=JS_DIR?>jquery.easing.1.3.js"></script>
    <script type="text/javascript" src="<?=JS_DIR?>bootstrap.js"></script>
	<script type="text/javascript" src="<?=JS_DIR?>jquery.bootstrap-growl.js"></script>
    <script type="text/javascript" src="<?=JS_DIR?>formvalidator.js"></script>
    <link rel="stylesheet" href="<?=JS_DIR?>jquery-ui/jquery-ui.css">
	<script type="text/javascript" src="<?=JS_DIR?>jquery-ui/jquery-ui.js"></script>	
	<title><?=PAGE_TITLE?></title>
</head>
<body>
<div id="page">
	<? displayNotification(); ?>
	<header class="page-header">
    	<div id="headerTop">
        	<div class="topContent container">
            	<div class="logo">
                    <h2>PDF TO DOC CONVERTER</h2>
                </div>
                <div class="topNav">
                	
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="clear"></div>
    </header>
    <section id="main">
    	<div class="container padT50px">
        	<p class="middleForm">Upload pdf file that you want to convert...</p><br>
        	<form class="middleForm" name="submitForm" id="submitFormID" action="" method="post" enctype="multipart/form-data">
				<div class="">
                	<label for="upload_file">Pdf File</label>
                    <input type="file" name="upload_file" id="upload_file" class="required">
                </div>
                <br>
                <div class="">
                	<input type="submit" name="saveBut" value="Convert File">
                </div>
            </form>
        </div>
    </section>
	<footer class="page-footer">
		<div class="footer container">
			<div class="copyright">
				&copy; Copyright 2014 PDF TO DOC CONVERTER 
			</div>
			<div class="footerNav">
				<ul>
					
				</ul>
            </div>
			<div class="clear"></div>
		</div>
	</footer>
</div>
<script type="text/javascript" src="<?=JS_DIR?>general.js"></script>
<?php
executeScriptAfterPageLoad();
?>
</body>
</html>