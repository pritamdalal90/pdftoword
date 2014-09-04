var callBackFnToSaveData = '';
var VALIDATION_SUCCESSFUL = false;
var qtipTimeoutQueue = [];
var qtipSelectorQueue = [];
var qtipCount = 0;

$(document).ready(function(e) {
	
	$.fn.alertUser = function(msg) {
		$('div.bootstrap-growl').remove();
		$.bootstrapGrowl(msg, {
			type: "error", // info, success, warning and error
			offset: {
				from: "top",
				amount: 65
			},
			align: "center",
			width: 350,
			delay: 5000,
			allow_dismiss: true,
			stackup_spacing: 10
		});
	};
	
	/*parameters :: 
	msg_offset = {from : "top/bottom",amount:"60"},
	msg_type = "info/success/warning/error",
	msg_align = "left/center/right",
	msg_width = "350",
	msg_delay = "5000",
	*/
	$.fn.PopInformation = function(msg,msg_type,msg_top_offset,msg_align,msg_width,msg_delay) {	
		if(msg_top_offset!='' && msg_align!='' && msg_width!='' && msg_delay!='') {
			$('div.bootstrap-growl').remove();
			$.bootstrapGrowl(msg, {
				type: msg_type,
				offset:  {
					from: "top",
					amount: msg_top_offset
				},
				align: msg_align,
				width: msg_width,
				delay: msg_delay,
				allow_dismiss: true,
				stackup_spacing: 10
			});
		} else {
			$('div.bootstrap-growl').remove();
			$.bootstrapGrowl(msg, {
				type: "info",
				offset: {
					from: "top",
					amount: 65
				},
				align: "right",
				width: 350,
				delay: 5000,
				allow_dismiss: true,
				stackup_spacing: 10
			});
		}
	};
	
	$.fn.pop_information = function(msg,msg_layout,msg_type) {
		$.bootstrapGrowl(msg, {
			type: msg_type, // info, success, warning and danger
			offset: {
				from: "top",
				amount: 20
			},
			align: "center",
			width: 250,
			delay: 4000,
			allow_dismiss: true,
			stackup_spacing: 10
		});
	};
		
		
	//////////// Validate Email Address ///////////
	function validateEmail($email) {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		
		if( !emailReg.test( $email ) ) {
			return false;
		} else {
			return true;
		}
	}
	
	//////////// Validate Number ///////////
	function checkNumber($number) {
		if(!isNaN($number)) {
			return true;
		} else {
			return false;
		}
	}
	
	//////////// Validate URL ///////////
	function checkUrl() {
	  return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(checkUrl.arguments[0]); 
	}

	//////////// Validate Date ///////////
	function checkDateM_D_Y(dateStr) {
		// Checks for the following valid date formats:
		// MM/DD/YYYY
		// Also separates date into month, day, and year variables
		//var datePat = /^(\d{2,2})(\/)(\d{2,2})\2(\d{4}|\d{4})$/;
		var datePat = /^(\d{2,2})(\/)(\d{2,2})\/(\d{4}|\d{4})$/;
		var matchArray = dateStr.match(datePat); // is the format ok?
		if (matchArray == null) {
			//alert("Date must be in DD/MM/YYYY format");
			//alert("Date must be in DD-MM-YYYY format");
			return false;
		}
		
		day = matchArray[3]; // parse date into variables
		month = matchArray[1];
		year = matchArray[4];
		if (month < 1 || month > 12) { // check month range
			//alert("Month must be between 1 and 12");
			return false;
		}
		if (day < 1 || day > 31) {
			//alert("Day must be between 1 and 31");
			return false;
		}
		if ((month==4 || month==6 || month==9 || month==11) && day==31) {
			//alert("Month "+month+" doesn't have 31 days!")
			return false;
		}
		if (month == 2) { // check for february 29th
			var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
			if (day>29 || (day==29 && !isleap)) {
				//alert("February " + year + " doesn't have " + day + " days!");
				return false;
			}
		}
		return true;  // date is valid
	}

	//////////// Validate Date ///////////
	function checkDateD_M_Y(dateStr) {
		// Checks for the following valid date formats:
		// MM/DD/YYYY
		// Also separates date into month, day, and year variables
		//var datePat = /^(\d{2,2})(\/)(\d{2,2})\2(\d{4}|\d{4})$/;
		var datePat = /^(\d{2,2})(\/)(\d{2,2})\/(\d{4}|\d{4})$/;
		var matchArray = dateStr.match(datePat); // is the format ok?
		if (matchArray == null) {
			//alert("Date must be in DD/MM/YYYY format");
			//alert("Date must be in DD-MM-YYYY format");
			return false;
		}
		
		day = matchArray[1]; // parse date into variables
		month = matchArray[3];
		year = matchArray[4];
		if (month < 1 || month > 12) { // check month range
			//alert("Month must be between 1 and 12");
			return false;
		}
		if (day < 1 || day > 31) {
			//alert("Day must be between 1 and 31");
			return false;
		}
		if ((month==4 || month==6 || month==9 || month==11) && day==31) {
			//alert("Month "+month+" doesn't have 31 days!")
			return false;
		}
		if (month == 2) { // check for february 29th
			var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
			if (day>29 || (day==29 && !isleap)) {
				//alert("February " + year + " doesn't have " + day + " days!");
				return false;
			}
		}
		return true;  // date is valid
	}

	//////////// Validate Date ///////////
	function checkDateY_M_D(dateStr) {
		// Checks for the following valid date formats:
		// MM/DD/YYYY
		// Also separates date into month, day, and year variables
		//var datePat = /^(\d{2,2})(\/)(\d{2,2})\2(\d{4}|\d{4})$/;
		var datePat = /^(\d{2,2})(\/)(\d{2,2})\/(\d{4}|\d{4})$/;
		var matchArray = dateStr.match(datePat); // is the format ok?
		if (matchArray == null) {
			//alert("Date must be in DD/MM/YYYY format");
			//alert("Date must be in DD-MM-YYYY format");
			return false;
		}
		
		day = matchArray[4]; // parse date into variables
		month = matchArray[3];
		year = matchArray[1];
		if (month < 1 || month > 12) { // check month range
			//alert("Month must be between 1 and 12");
			return false;
		}
		if (day < 1 || day > 31) {
			//alert("Day must be between 1 and 31");
			return false;
		}
		if ((month==4 || month==6 || month==9 || month==11) && day==31) {
			//alert("Month "+month+" doesn't have 31 days!")
			return false;
		}
		if (month == 2) { // check for february 29th
			var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
			if (day>29 || (day==29 && !isleap)) {
				//alert("February " + year + " doesn't have " + day + " days!");
				return false;
			}
		}
		return true;  // date is valid
	}


	$.fn.getTitle = function(e) {
		var ret = '';
		if(e.attr("placeholder") != undefined) {
			ret = e.attr("placeholder");
		} else if($('label[for="'+e.attr("name")+'"]:eq(0)').html() != undefined && $('label[for="'+e.attr("name")+'"]:eq(0)').html() != '') {
			ret = $('label[for="'+e.attr("name")+'"]:eq(0)').html();
		} else {
			ret = e.attr("name");
		}
		return ret;
	};
	
	$('label').click(function(e) {
        var forAttr = $(this).attr("for");
		if(forAttr != undefined && forAttr != "") {
			if($('input[name="'+forAttr+'"]').length>0) {
				$('input[name="'+forAttr+'"]').click();
			}
		}
    });
			
    $('input[type="submit"][name="saveBut"]').click(function(e) {
		e.preventDefault();
        var currFormId = $(this).parents('form').attr("id");
		var hasError = false;
		var errorStr = '';
		error_identifier = '';
		////////////////////////////// Validate Required Input[type="text"] fields /////////////////////////
		$('form#'+currFormId+' input[type="text"]').each(function(index, element) {
			if($(this).hasClass('required')) {
				if($(this).val()=='') {
					$(this).addClass("errorclass");
					errorStr += $.fn.getTitle($(this))+" Cannot be blank<br />";
					error_identifier += $(this).attr("name")+"<br />";
					hasError=true;
				}
				else {
					if($(this).hasClass("checkEmail") || $(this).attr("type") == 'email') {
						if(!validateEmail($(this).val())) {
							$(this).addClass("errorclass");
							errorStr += $.fn.getTitle($(this))+" Invalid as Email-address<br />";
							error_identifier += $(this).attr("name")+"<br />";
							hasError=true;
						}
						else
							$(this).removeClass("errorclass");
					}
					if($(this).hasClass("checkNumber") || $(this).attr("type") == 'number') {
						if(!checkNumber($(this).val())) {
							$(this).addClass("errorclass");
							errorStr += $.fn.getTitle($(this))+" Invalid as a number<br />";
							error_identifier += $(this).attr("name")+"<br />";
							hasError=true;
						}
						else
							$(this).removeClass("errorclass");
					}
					if($(this).hasClass("checkUrl") || $(this).attr("type") == 'url') {
						if(!checkUrl($(this).val())) {
							$(this).addClass("errorclass");
							errorStr += $.fn.getTitle($(this))+" Invalid as a URL<br />";
							error_identifier += $(this).attr("name")+"<br />";
							hasError=true;
						}
						else
							$(this).removeClass("errorclass");
					}
					if($(this).hasClass("checkDateM_D_Y")) {
						if(!checkDateM_D_Y($(this).val())) {
							$(this).addClass("errorclass");
							errorStr += $.fn.getTitle($(this))+" Invalid as a date<br />";
							error_identifier += $(this).attr("name")+"<br />";
							hasError=true;
						}
						else
							$(this).removeClass("errorclass");
					}
					if($(this).hasClass("checkDateD_M_Y") || $(this).attr("type") == 'date') {
						if(!checkDateD_M_Y($(this).val())) {
							$(this).addClass("errorclass");
							errorStr += $.fn.getTitle($(this))+" Invalid as a date<br />";
							error_identifier += $(this).attr("name")+"<br />";
							hasError=true;
						}
						else
							$(this).removeClass("errorclass");
					}
					if($(this).hasClass("checkDateY_M_D")) {
						if(!checkDateY_M_D($(this).val())) {
							$(this).addClass("errorclass");
							errorStr += $.fn.getTitle($(this))+" Invalid as a date<br />";
							error_identifier += $(this).attr("name")+"<br />";
							hasError=true;
						}
						else
							$(this).removeClass("errorclass");
					}
				}
			} else {
				if($(this).val()!='') {
					if($(this).hasClass("checkEmail") || $(this).attr("type") == 'email') {
						if(!validateEmail($(this).val())) {
							$(this).addClass("errorclass");
							errorStr += $.fn.getTitle($(this))+" Invalid as Email-address<br />";
							error_identifier += $(this).attr("name")+"<br />";
							hasError=true;
						}
						else
							$(this).removeClass("errorclass");
					}
					if($(this).hasClass("checkNumber") || $(this).attr("type") == 'number') {
						if(!checkNumber($(this).val())) {
							$(this).addClass("errorclass");
							errorStr += $.fn.getTitle($(this))+" Invalid as a number<br />";
							error_identifier += $(this).attr("name")+"<br />";
							hasError=true;
						}
						else
							$(this).removeClass("errorclass");
					}
					if($(this).hasClass("checkUrl") || $(this).attr("type") == 'url') {
						if(!checkUrl($(this).val())) {
							$(this).addClass("errorclass");
							errorStr += $.fn.getTitle($(this))+" Invalid as a URL<br />";
							error_identifier += $(this).attr("name")+"<br />";
							hasError=true;
						}
						else
							$(this).removeClass("errorclass");
					}
					if($(this).hasClass("checkDateM_D_Y")) {
						if(!checkDateM_D_Y($(this).val())) {
							$(this).addClass("errorclass");
							errorStr += $.fn.getTitle($(this))+" Invalid as a date<br />";
							error_identifier += $(this).attr("name")+"<br />";
							hasError=true;
						}
						else
							$(this).removeClass("errorclass");
					}
					if($(this).hasClass("checkDateD_M_Y") || $(this).attr("type") == 'date') {
						if(!checkDateD_M_Y($(this).val())) {
							$(this).addClass("errorclass");
							errorStr += $.fn.getTitle($(this))+" Invalid as a date<br />";
							error_identifier += $(this).attr("name")+"<br />";
							hasError=true;
						}
						else
							$(this).removeClass("errorclass");
					}
					if($(this).hasClass("checkDateY_M_D")) {
						if(!checkDateY_M_D($(this).val())) {
							$(this).addClass("errorclass");
							errorStr += $.fn.getTitle($(this))+" Invalid as a date<br />";
							error_identifier += $(this).attr("name")+"<br />";
							hasError=true;
						}
						else
							$(this).removeClass("errorclass");
					}
					
				}
			}
        });
		
		$('form#'+currFormId+' input[type="password"]').each(function(index, element) {
			if($(this).hasClass('required')) {
				if($(this).val()=='') {
					$(this).addClass("errorclass");
					errorStr += $.fn.getTitle($(this))+" Cannot be blank<br />";
					error_identifier += $(this).attr("name")+"<br />";
					hasError=true;
				}
			}
        });
		
		////////////////////////////// Validate Required Input[type="radio"] fields /////////////////////////
		var radioInputs = {};
		$('form#'+currFormId+' input[type="radio"][class="required"]').each(function(index, element) {
				var thisname = $(this).attr("name");
				radioInputs[thisname]=thisname;
        });
		for (var key in radioInputs) {
			if(!$('input[type="radio"][name="'+radioInputs[key]+'"]').is(":checked")) {
				
				var errorXtra = '';
				
				if($('input[type="radio"][name="'+radioInputs[key]+'"]').is("[placeholder]")) {
					errorXtra = $('input[type="radio"][name="'+radioInputs[key]+'"]').attr("placeholder");
				}
				else
				  errorXtra = radioInputs[key];
					
				errorStr += "Choose one option for "+errorXtra+"<br />";
				error_identifier += $('input[type="radio"][name="'+radioInputs[key]+'"]').attr("name")+"<br />";
				hasError=true;
			}
		}
		
		
		////////////////////////////// Validate Required Input[type="checkbox"] fields /////////////////////////
		var checkboxInputs = {};
		$('form#'+currFormId+' input[type="checkbox"][class="required"]').each(function(index, element) {
			var thisname = $(this).attr("name");
			checkboxInputs[thisname]=thisname;
        });
		for (var key in checkboxInputs) {
			if(!$('input[type="checkbox"][name="'+checkboxInputs[key]+'"]').is(":checked")) {
				
				var errorXtra = '';
				
				if($('input[type="checkbox"][name="'+checkboxInputs[key]+'"]').is("[placeholder]")) {
					errorXtra = $('input[type="checkbox"][name="'+checkboxInputs[key]+'"]').attr("placeholder");
				}
				else
				   errorXtra = checkboxInputs[key];
					
				errorStr += "Information required for "+errorXtra+"<br />";
				error_identifier += $('input[type="checkbox"][name="'+checkboxInputs[key]+'"]').attr("name")+"<br />";
				hasError=true;
			}
		}
		
		////////////////////////////// Validate Required Textarea fields /////////////////////////
		$('form#'+currFormId+' textarea').each(function(index, element) {
            if($(this).hasClass("required")) {
				if($(this).val()=='') {
					$(this).addClass("errorclass");
					errorStr += $.fn.getTitle($(this))+" Cannot be blank<br />";
					error_identifier += $(this).attr("name")+"<br />";
					hasError=true;
				}
				else
				  $(this).removeClass("errorclass");
			}
        });
		
		
		////////////////////////////// Validate Required Input[type="file"] fields /////////////////////////
		$('form#'+currFormId+' input[type="file"]').each(function(index, element) {
			if($(this).hasClass('required')) {
				if($(this).val()=='') {
					$(this).addClass("errorclass");
					errorStr += "Choose a file for "+$.fn.getTitle($(this))+"<br />";
					error_identifier += $(this).attr("name")+"<br />";
					hasError=true;
				}
				else
				  $(this).removeClass("errorclass");
			}
        });
		
		////////////////////////////// Validate Required Select fields /////////////////////////
		$('form#'+currFormId+' select').each(function(index, element) {
			if($(this).hasClass('required')) {
				if($(this).val()=='') {
					$(this).addClass("errorclass");
					if($('a#'+$(this).attr("name")+'-button').length>0) {
						$('a#'+$(this).attr("name")+'-button').addClass("errorclass_selectmenu");
					}
					errorStr += "Select "+$.fn.getTitle($(this))+"<br />";
					error_identifier += $(this).attr("name")+"<br />";
					hasError=true;
				}
				else
				  $(this).removeClass("errorclass");
			}
        });
		
		if(hasError==true) {
			var errorArr = errorStr.split('<br />');
			var error_identifierArr = error_identifier.split('<br />');
			var newString = '';
			var destroyTooltipAfter = 5000;
			for(var i = 0; i<errorArr.length; i++) {
				if(error_identifierArr[i] != '') {
					var selector = 'form#'+currFormId+' input[name="'+error_identifierArr[i]+'"]:not([type="hidden"]),select[name="'+error_identifierArr[i]+'"],textarea[name="'+error_identifierArr[i]+'"]';					
					var offset = $(selector).offset();
					var left = offset.left;
					var top = offset.top;
					
					$(selector).tooltip({
						content : errorArr[i],
						items : "input.required,textarea.required,select.required",
						tooltipClass : 'red',
						position: {
							my: "right top-10",
							at: "right top",
							collision: "flipfit flip"
						},
					});
					
					$(selector).tooltip('open');
					
					$(selector).focus(function(e) {
						$(this).tooltip('disable');
						$(this).tooltip('destroy');
					});
					
				}
				
				if(destroyTooltipAfter) {
					setTimeout(function() {
						$('form#'+currFormId).find('input:not([type="submit"]):not([type="hidden"]),select,textarea').each(function(index, element) {
							if($(this).data("ui-tooltip") != undefined) {
								//$(this).tooltip("destroy");
								$(this).tooltip("disable");
							}
                        });
						//$('form#'+currFormId).find('input.errorclass,select.errorclass,textarea.errorclass').removeClass('errorclass');
					},destroyTooltipAfter);
				}
			}
			
			//$('#errorInfo').html(newString);
			//$.fn.alertUser('Please fillout required fields');
			
		} else {
			$('form#'+currFormId).submit();
		}
    });
	
	$('input[type="submit"][name="ajaxBut"]').click(function(e) {
		e.preventDefault();
		$.fn.ajax_validate($(this).parent('form'));
	});
	
	$.fn.ajax_validate = function(e) {
		
		var currFormId = '';
		if(e.hasClass("UI_FORM_AJAX_SAVE")) {
			currFormId = e.attr("id");
			var hasError = false;
			var errorStr = '';
			error_identifier = '';
			////////////////////////////// Validate Required Input[type="text"] fields /////////////////////////
			$('form#'+currFormId+' input[type="text"]').each(function(index, element) {
				if($(this).hasClass('required')) {
					if($(this).val()=='') {
						$(this).addClass("errorclass");
						errorStr += $.fn.getTitle($(this))+" Cannot be blank<br />";
						error_identifier += $(this).attr("name")+"<br />";
						hasError=true;
					}
					else {
						if($(this).hasClass("checkEmail") || $(this).attr("type") == 'email') {
							if(!validateEmail($(this).val())) {
								$(this).addClass("errorclass");
								errorStr += $.fn.getTitle($(this))+" Invalid as Email-address<br />";
								error_identifier += $(this).attr("name")+"<br />";
								hasError=true;
							}
							else
								$(this).removeClass("errorclass");
						}
						if($(this).hasClass("checkNumber") || $(this).attr("type") == 'number') {
							if(!checkNumber($(this).val())) {
								$(this).addClass("errorclass");
								errorStr += $.fn.getTitle($(this))+" Invalid as a number<br />";
								error_identifier += $(this).attr("name")+"<br />";
								hasError=true;
							}
							else
								$(this).removeClass("errorclass");
						}
						if($(this).hasClass("checkUrl") || $(this).attr("type") == 'url') {
							if(!checkUrl($(this).val())) {
								$(this).addClass("errorclass");
								errorStr += $.fn.getTitle($(this))+" Invalid as a URL<br />";
								error_identifier += $(this).attr("name")+"<br />";
								hasError=true;
							}
							else
								$(this).removeClass("errorclass");
						}
						if($(this).hasClass("checkDateM_D_Y")) {
							if(!checkDateM_D_Y($(this).val())) {
								$(this).addClass("errorclass");
								errorStr += $.fn.getTitle($(this))+" Invalid as a date<br />";
								error_identifier += $(this).attr("name")+"<br />";
								hasError=true;
							}
							else
								$(this).removeClass("errorclass");
						}
						if($(this).hasClass("checkDateD_M_Y") || $(this).attr("type") == 'date') {
							if(!checkDateD_M_Y($(this).val())) {
								$(this).addClass("errorclass");
								errorStr += $.fn.getTitle($(this))+" Invalid as a date<br />";
								error_identifier += $(this).attr("name")+"<br />";
								hasError=true;
							}
							else
								$(this).removeClass("errorclass");
						}
						if($(this).hasClass("checkDateY_M_D")) {
							if(!checkDateY_M_D($(this).val())) {
								$(this).addClass("errorclass");
								errorStr += $.fn.getTitle($(this))+" Invalid as a date<br />";
								error_identifier += $(this).attr("name")+"<br />";
								hasError=true;
							}
							else
								$(this).removeClass("errorclass");
						}
					}
				}
				else {
					if($(this).val()!='') {
						if($(this).hasClass("checkEmail") || $(this).attr("type") == 'email') {
							if(!validateEmail($(this).val())) {
								$(this).addClass("errorclass");
								errorStr += $.fn.getTitle($(this))+" Invalid as Email-address<br />";
								error_identifier += $(this).attr("name")+"<br />";
								hasError=true;
							}
							else
								$(this).removeClass("errorclass");
						}
						if($(this).hasClass("checkNumber") || $(this).attr("type") == 'number') {
							if(!checkNumber($(this).val())) {
								$(this).addClass("errorclass");
								errorStr += $.fn.getTitle($(this))+" Invalid as a number<br />";
								error_identifier += $(this).attr("name")+"<br />";
								hasError=true;
							}
							else
								$(this).removeClass("errorclass");
						}
						if($(this).hasClass("checkUrl") || $(this).attr("type") == 'url') {
							if(!checkUrl($(this).val())) {
								$(this).addClass("errorclass");
								errorStr += $.fn.getTitle($(this))+" Invalid as a URL<br />";
								error_identifier += $(this).attr("name")+"<br />";
								hasError=true;
							}
							else
								$(this).removeClass("errorclass");
						}
						if($(this).hasClass("checkDateM_D_Y")) {
							if(!checkDateM_D_Y($(this).val())) {
								$(this).addClass("errorclass");
								errorStr += $.fn.getTitle($(this))+" Invalid as a date<br />";
								error_identifier += $(this).attr("name")+"<br />";
								hasError=true;
							}
							else
								$(this).removeClass("errorclass");
						}
						if($(this).hasClass("checkDateD_M_Y") || $(this).attr("type") == 'date') {
							if(!checkDateD_M_Y($(this).val())) {
								$(this).addClass("errorclass");
								errorStr += $.fn.getTitle($(this))+" Invalid as a date<br />";
								error_identifier += $(this).attr("name")+"<br />";
								hasError=true;
							}
							else
								$(this).removeClass("errorclass");
						}
						if($(this).hasClass("checkDateY_M_D")) {
							if(!checkDateY_M_D($(this).val())) {
								$(this).addClass("errorclass");
								errorStr += $.fn.getTitle($(this))+" Invalid as a date<br />";
								error_identifier += $(this).attr("name")+"<br />";
								hasError=true;
							}
							else
								$(this).removeClass("errorclass");
						}
					}
				}
			});
			
			$('form#'+currFormId+' input[type="password"]').each(function(index, element) {
				if($(this).hasClass('required')) {
					if($(this).val()=='') {
						$(this).addClass("errorclass");
						errorStr += $.fn.getTitle($(this))+" Cannot be blank<br />";
						error_identifier += $(this).attr("name")+"<br />";
						hasError=true;
					}
				}
			});
			
			////////////////////////////// Validate Required Input[type="radio"] fields /////////////////////////
			var radioInputs = {};
			$('form#'+currFormId+' input[type="radio"][class="required"]').each(function(index, element) {
					var thisname = $(this).attr("name");
					radioInputs[thisname]=thisname;
			});
			for (var key in radioInputs) {
				if(!$('input[type="radio"][name="'+radioInputs[key]+'"]').is(":checked")) {
					
					var errorXtra = '';
					
					if($('input[type="radio"][name="'+radioInputs[key]+'"]').is("[placeholder]")) {
						errorXtra = $('input[type="radio"][name="'+radioInputs[key]+'"]').attr("placeholder");
					}
					else
					  errorXtra = radioInputs[key];
						
					errorStr += "Choose one option for "+errorXtra+"<br />";
					error_identifier += $('input[type="radio"][name="'+radioInputs[key]+'"]').attr("name")+"<br />";
					hasError=true;
				}
			}
			
			
			////////////////////////////// Validate Required Input[type="checkbox"] fields /////////////////////////
			var checkboxInputs = {};
			$('form#'+currFormId+' input[type="checkbox"][class="required"]').each(function(index, element) {
				var thisname = $(this).attr("name");
				checkboxInputs[thisname]=thisname;
			});
			for (var key in checkboxInputs) {
				if(!$('input[type="checkbox"][name="'+checkboxInputs[key]+'"]').is(":checked")) {
					
					var errorXtra = '';
					
					if($('input[type="checkbox"][name="'+checkboxInputs[key]+'"]').is("[placeholder]")) {
						errorXtra = $('input[type="checkbox"][name="'+checkboxInputs[key]+'"]').attr("placeholder");
					}
					else
					   errorXtra = checkboxInputs[key];
						
					errorStr += "Information required for "+errorXtra+"<br />";
					error_identifier += $('input[type="checkbox"][name="'+checkboxInputs[key]+'"]').attr("name")+"<br />";
					hasError=true;
				}
			}
			
			////////////////////////////// Validate Required Textarea fields /////////////////////////
			$('form#'+currFormId+' textarea').each(function(index, element) {
				if($(this).hasClass("required")) {
					if($(this).val()=='') {
						$(this).addClass("errorclass");
						errorStr += $.fn.getTitle($(this))+" Cannot be blank<br />";
						error_identifier += $(this).attr("name")+"<br />";
						hasError=true;
					}
					else
					  $(this).removeClass("errorclass");
				}
			});
			
			
			////////////////////////////// Validate Required Input[type="file"] fields /////////////////////////
			$('form#'+currFormId+' input[type="file"]').each(function(index, element) {
				if($(this).hasClass('required')) {
					if($(this).val()=='') {
						$(this).addClass("errorclass");
						errorStr += "Choose a file for "+$.fn.getTitle($(this))+"<br />";
						error_identifier += $(this).attr("name")+"<br />";
						hasError=true;
					}
					else
					  $(this).removeClass("errorclass");
				}
			});
			
			////////////////////////////// Validate Required Select fields /////////////////////////
			$('form#'+currFormId+' select').each(function(index, element) {
				if($(this).hasClass('required')) {
					if($(this).val()=='') {
						$(this).addClass("errorclass");
						if($('a#'+$(this).attr("name")+'-button').length>0) {
							$('a#'+$(this).attr("name")+'-button').addClass("errorclass_selectmenu");
						}
						errorStr += "Select "+$.fn.getTitle($(this))+"<br />";
						error_identifier += $(this).attr("name")+"<br />";
						hasError=true;
					}
					else
					  $(this).removeClass("errorclass");
				}
			});
			
			if(hasError==true) {
				$.fn.pop_information("Please fillout required fields",'topLeft','error');
				VALIDATION_SUCCESSFUL = false;
			} else {
				VALIDATION_SUCCESSFUL = true;
				callBackFnToSaveData = $('form#'+currFormId+' input#callBackFnToSaveData').val();
				eval('$.fn.'+callBackFnToSaveData+'();');
				callBackFnToSaveData = '';
			}
		} else {
			console.log('Invalid Form!');
		}
    };
	
	
	$.fn.validate_ajax_form = function(e) {
        var currFormId = e.children('form.UI_FORM_AJAX_SAVE').attr("id");
		var hasError = false;
		var errorStr = '';
		error_identifier = '';
		////////////////////////////// Validate Required Input[type="text"] fields /////////////////////////
		$('form#'+currFormId+' input[type="text"]').each(function(index, element) {
			if($(this).hasClass('required')) {
				if($(this).val()=='') {
					$(this).addClass("errorclass");
					errorStr += $.fn.getTitle($(this))+" Cannot be blank<br />";
					error_identifier += $(this).attr("name")+"<br />";
					hasError=true;
				}
				else {
					if($(this).hasClass("checkEmail")) {
						if(!validateEmail($(this).val())) {
							$(this).addClass("errorclass");
							errorStr += $.fn.getTitle($(this))+" Invalid as Email-address<br />";
							error_identifier += $(this).attr("name")+"<br />";
							hasError=true;
						}
						else
							$(this).removeClass("errorclass");
					}
				}
			}
        });
		
		$('form#'+currFormId+' input[type="password"]').each(function(index, element) {
			if($(this).hasClass('required')) {
				if($(this).val()=='') {
					$(this).addClass("errorclass");
					errorStr += $.fn.getTitle($(this))+" Cannot be blank<br />";
					error_identifier += $(this).attr("name")+"<br />";
					hasError=true;
				}
			}
        });
		
		////////////////////////////// Validate Required Input[type="radio"] fields /////////////////////////
		var radioInputs = {};
		$('form#'+currFormId+' input[type="radio"][class="required"]').each(function(index, element) {
				var thisname = $(this).attr("name");
				radioInputs[thisname]=thisname;
        });
		for (var key in radioInputs) {
			if(!$('input[type="radio"][name="'+radioInputs[key]+'"]').is(":checked")) {
				
				var errorXtra = '';
				
				if($('input[type="radio"][name="'+radioInputs[key]+'"]').is("[placeholder]")) {
					errorXtra = $('input[type="radio"][name="'+radioInputs[key]+'"]').attr("placeholder");
				}
				else
				  errorXtra = radioInputs[key];
					
				errorStr += "Choose one option for "+errorXtra+"<br />";
				error_identifier += $('input[type="radio"][name="'+radioInputs[key]+'"]').attr("name")+"<br />";
				hasError=true;
			}
		}
		
		
		////////////////////////////// Validate Required Input[type="checkbox"] fields /////////////////////////
		var checkboxInputs = {};
		$('form#'+currFormId+' input[type="checkbox"][class="required"]').each(function(index, element) {
			var thisname = $(this).attr("name");
			checkboxInputs[thisname]=thisname;
        });
		for (var key in checkboxInputs) {
			if(!$('input[type="checkbox"][name="'+checkboxInputs[key]+'"]').is(":checked")) {
				
				var errorXtra = '';
				
				if($('input[type="checkbox"][name="'+checkboxInputs[key]+'"]').is("[placeholder]")) {
					errorXtra = $('input[type="checkbox"][name="'+checkboxInputs[key]+'"]').attr("placeholder");
				}
				else
				   errorXtra = checkboxInputs[key];
					
				errorStr += "Information required for "+errorXtra+"<br />";
				error_identifier += $('input[type="checkbox"][name="'+checkboxInputs[key]+'"]').attr("name")+"<br />";
				hasError=true;
			}
		}
		
		////////////////////////////// Validate Required Textarea fields /////////////////////////
		$('form#'+currFormId+' textarea').each(function(index, element) {
            if($(this).hasClass("required")) {
				if($(this).val()=='') {
					$(this).addClass("errorclass");
					errorStr += $.fn.getTitle($(this))+" Cannot be blank<br />";
					error_identifier += $(this).attr("name")+"<br />";
					hasError=true;
				}
				else
				  $(this).removeClass("errorclass");
			}
        });
		
		
		////////////////////////////// Validate Required Input[type="file"] fields /////////////////////////
		$('form#'+currFormId+' input[type="file"]').each(function(index, element) {
			if($(this).hasClass('required')) {
				if($(this).val()=='') {
					$(this).addClass("errorclass");
					errorStr += "Choose a file for "+$.fn.getTitle($(this))+"<br />";
					error_identifier += $(this).attr("name")+"<br />";
					hasError=true;
				}
				else
				  $(this).removeClass("errorclass");
			}
        });
		
		////////////////////////////// Validate Required Select fields /////////////////////////
		$('form#'+currFormId+' select').each(function(index, element) {
			if($(this).hasClass('required')) {
				if($(this).val()=='') {
					$(this).addClass("errorclass");
					if($('a#'+$(this).attr("name")+'-button').length>0) {
						$('a#'+$(this).attr("name")+'-button').addClass("errorclass_selectmenu");
					}
					errorStr += "Select "+$.fn.getTitle($(this))+"<br />";
					error_identifier += $(this).attr("name")+"<br />";
					hasError=true;
				}
				else
				  $(this).removeClass("errorclass");
			}
        });
		
		if(hasError==true) {
			$.fn.pop_information("Please fillout required fields",'topLeft','error');
			VALIDATION_SUCCESSFUL = false;
		} else {
			VALIDATION_SUCCESSFUL = true;
			callBackFnToSaveData = $('form#'+currFormId+' input#callBackFnToSaveData').val();
			eval('$.fn.'+callBackFnToSaveData+'();');
			callBackFnToSaveData = '';
		}
    };
	
	
	$.fn.saveDataToDB = function(table,data,mode,condition,db_type) {
		if(db_type==undefined) {
			db_type = '';
		}
		if(table!='' && data != '' && mode!='' && db_type!='') {
			$.ajax({
				type: 'GET',
				url: 'ajax/?action=saveDataToDB',
				data: {'params[table]':table, 'params[db_type]':db_type, 'params[data]':data, 'params[mode]':mode, 'params[condition]':condition},
				success: function(data) {
					var json_data = $.parseJSON(data);
					if(json_data.error==0) {
						$.fn.pop_information("Data saved!",'topLeft','success');
						//console.log('saveDataToDB');
					} else {
						$.fn.pop_information("Error in AJAX Response",'topLeft','warning');
						console.log(json_data.message);
					}
				},
				dataType: 'html',
				async:false
			});
		}
	};

	$('input').focus(function(e) {
        $(this).removeClass("errorclass");
    });
	$('select').focus(function(e) {
        $(this).removeClass("errorclass");
		if($('a#'+$(this).attr("name")+'-button').length>0) {
			$('a#'+$(this).attr("name")+'-button').removeClass("errorclass_selectmenu");
		}
    });
		
	$('textarea').focus(function(e) {
        $(this).removeClass("errorclass");
    });
	
});