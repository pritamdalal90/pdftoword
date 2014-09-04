<?
	function sanitizepostdata($data) {
		return trim(addslashes($data));
	}
	
	function sanitizedbdata($data) {
		return trim(stripslashes($data));
	}

	function executeScriptAfterPageLoad() {
		global $SCRIPT_PENDING_FOR_EXECUTION;
		$allCode = '';
		if($SCRIPT_PENDING_FOR_EXECUTION && count($SCRIPT_PENDING_FOR_EXECUTION)) {
			foreach($SCRIPT_PENDING_FOR_EXECUTION as $eachCode) {
				$allCode .= $eachCode."\n";
			}
		}
		if($allCode!='') {
			echo "<script>\n$(function(){\r\t".$allCode."});\n</script>\r\n";
		}
	}
		
	function addScriptForExec($code) {
		global $SCRIPT_PENDING_FOR_EXECUTION;
		$SCRIPT_PENDING_FOR_EXECUTION[] = $code;
	}
	
	//Upload File
	//Params :: File[ $_FILES[name] ], UPLOAD DIR, NEW NAME, $ACCEPT
	//Return :: 
	/*
		Filename  :: Uploaded
		-1 :: Not uploaded
		-2 :: trying to upload file without extension
		-3 :: trying to upload file that is not accepted
		-4 :: UPLOAD_ERR_OK returns false
		-5 :: not uploaded
	*/	 
	function UploadFile($IMG,$UPLOAD_DIR='uploads/',$NEW_NAME,$accept = array('png','jpeg','jpg','gif')) {
		$ret = -1;
		if($IMG != '' && $UPLOAD_DIR != '') {
			$fileExtArr = explode('.',$IMG['name']);
			if(count($fileExtArr)>1) {
				$fileExt = $fileExtArr[count($fileExtArr)-1];
				if(in_array($fileExt,$accept)) {
					if($NEW_NAME=='') {
						$NEW_NAME = date('YmdHis').'_Upload'.$fileExt;
					}
					if($IMG['error'] == UPLOAD_ERR_OK) {
						$UPLOAD_DIR = rtrim($UPLOAD_DIR,'/');
						if(!file_exists($UPLOAD_DIR)) {
							mkdir($UPLOAD_DIR, 0777, true);
						}
						if(move_uploaded_file($IMG['tmp_name'],$UPLOAD_DIR.'/'.$NEW_NAME)) {
							$ret = 1;
						} else {
							$ret = -5;
						}
					} else {
						$ret = -4;
					}
				} else {
					$ret = -3;
				}
			} else {
				$ret = -2;
			}
		}
		return $ret;
	}
	
	/*
	parameters :: 
	top_offset = "60",
	msg_type = "info/success/warning/error",
	msg_align = "left/center/right",
	msg_width = "350",
	msg_delay = "5000",
	*/
	function setNotification($message,$top_offset=150,$message_type="success",$message_align="center",$message_width=390,$message_delay=6000) {
		if($message_type != '' && $top_offset != '' && $message_align != '' && is_numeric($message_width) && is_numeric($message_delay)) {
			$_SESSION['NOTIFICATION']['THIS_NOTE'] = array(
												'message'=>$message,
												'message_type'=>$message_type,
												'message_top_offset'=>$top_offset,
												'message_align'=>$message_align,
												'message_width'=>$message_width,
												'message_delay'=>$message_delay
										);
		}
	}

	function displayNotification() {
		if(isset($_SESSION['NOTIFICATION']['THIS_NOTE']['message']) && !empty($_SESSION['NOTIFICATION']['THIS_NOTE']['message'])) {
			$notification = $_SESSION['NOTIFICATION']['THIS_NOTE'];
			addScriptForExec("$.fn.PopInformation('".$notification['message']."','".$notification['message_type']."','".$notification['message_top_offset']."','".$notification['message_align']."','".$notification['message_width']."','".$notification['message_delay']."');");
			$_SESSION['NOTIFICATION']['THIS_NOTE']['message'] = '';
		}
	}
		
?>