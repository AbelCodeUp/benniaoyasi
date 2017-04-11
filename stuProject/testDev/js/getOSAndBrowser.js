	function getOSAndBrowser(){
		var os = navigator.platform;
		var userAgent = navigator.userAgent;
		var info  = "";
		var system = '';
		var tempArray  = "";
		if(os.indexOf("Win") > -1){
			if(userAgent.indexOf("Windows NT 5.0") > -1){
				info += "Win 2000";
			}else if(userAgent.indexOf("Windows NT 5.1") > -1){
				info += "Win XP";
			}else if(userAgent.indexOf("Windows NT 5.2") > -1){
				info += "Win 2003";
			}else if(userAgent.indexOf("Windows NT 6.0") > -1){
				info += "WindowsVista";
			}else if(userAgent.indexOf("Windows NT 6.1") > -1 || userAgent.indexOf("Windows 7") > -1){
				info += "Windows 7";
			}else if(userAgent.indexOf("Windows 8") > -1){
				info += "Win 8";
			}else{
				info += "Other";
			}
		}else if(os.indexOf("Mac") > -1){
			info += "Mac";
		}else if(os.indexOf("X11") > -1){
			info += "Unix";
		}else if(os.indexOf("Linux") > -1){
			info += "Linux";
		}else{
			info += "Other";
		}
		
		if(/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)){
			tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent);
			system += tempArray[1] + 
			' '+ tempArray[2];
		}else if(/MSIE \d+\.\d+/.test(userAgent)){
			tempArray = /MS(IE) (\d+\.\d+)/.exec(userAgent);
			system += tempArray[1] + 
			' '+ tempArray[2];
		}else if(/[Cc]hrome\/\d+/.test(userAgent)){
			tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent);
			system += tempArray[1] + 
			' '+ tempArray[2];
		}else if(/[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)){
			tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/.exec(userAgent);
			system +=  tempArray[3] + 
			' '+ tempArray[1];
		}else if(/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)){
			tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent);
			system +=  tempArray[1] + 
			' '+ tempArray[2];
		}else{
			system += "unknown";
		}
		return {info:info,system:system};
	};


	function flashChecker() {
	    var hasFlash = 0; //是否安装了flash
	    var flashVersion = 0; //flash版本
	    var isIE =/*@cc_on!@*/0; //是否IE浏览器
	    if (isIE) {
	        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
	        if (swf) {
	            hasFlash = 1;
	            flashVersion = swf.GetVariable("$version");
	        }
	    } else {
	        if (navigator.plugins && navigator.plugins.length > 0) {
	            var swf = navigator.plugins["Shockwave Flash"];
	            if (swf) {
	                hasFlash = 1;
	                flashVersion = swf.description.split(" ")[2];
	            }
	        }
	    }
	    return {
	        f: hasFlash,
	        v: flashVersion
	    };
	}