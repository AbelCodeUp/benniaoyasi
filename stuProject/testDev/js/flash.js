
	<!-- movieName:Flash模块的id -->
	function thisMovie(movieName){
        var isIE = navigator.appName.indexOf("Microsoft") != -1;
        return (isIE) ? window[movieName] : document[movieName];    
    }
	
	function thisElement(id)
	{
		return document.getElementById(id);
	}
	var canNext = null;

	var fileList = new Array();//会议中的文件列表
	var userList = new Array();//会议中的用户列表
	var isWBModuleComplete = false;//白板模块是否准备完成
	var isVideoModuleComplete = false;//视频模块是否准备完成
	var m_localUserInfo;//本地用户(自己)信息
	var m_peerID;//本地用户(自己)的ID，此ID由服务器分配，接口中所有使用的用户ID均为服务器分配的用户ID
	var m_userName;//本地用户(自己)用户名
	var m_userType;//本地用户(自己)用户类型。0：学生、1：教师
	var m_hasAudio;//本地用户(自己)是否有音频设备
	var m_hasVideo;//本地用户(自己)是否有视频设备
	var m_mediaServerIP;
	var m_mediaServerTcpPort;
	var m_mediaServerUdpPort;
	var m_micList = new Array();//麦克风列表
	var m_camList = new Array();//摄像头列表
	var m_curMicIndex;//当前麦克风索引
	var m_curMicName;//当前麦克风名字
	var m_curCamIndex;//当前摄像头索引
	var m_curCamName;//当前摄像头名字
	var m_curCamWidth;//当前摄像头分辨率---宽
	var m_curCamHeight;//当前摄像头分辨率---高
	
	<!----------------------------------------------------------------------------------------------------------------------------->
	<!-- 白板模块和视频模块的回调函数名相同，故回调处理统一在此完成 -->
	<!----------------------------------------------------------------------------------------------------------------------------->
	var OnFlashInvoke = function()
	{
		var cbkFuncName = arguments[0];
		switch (cbkFuncName)
		{
			<!-- 以下为白板模块的回调 -->
			case "OnGetMeetingFileReply":
				if(arguments[1].result == 0)
				{
					// fileList = arguments[1].meetingfile;
					// fileList.push(arguments[1].whiteboard);
					// var sel = thisElement('sel');
					// for(var index=0; index < fileList.length; index++)
					// {
					// 	var optionItem = document.createElement("OPTION");
					// 	optionItem.value=index;
					// 	optionItem.text= fileList[index].filename;//fileList中的每个文集都有filename、fileid字段
					// 	sel.options.add(optionItem);
					// }
				}
				else
				{
					alert("No files in meeting");
				}
				break;
			
			case "OnNetConnectionReply":
				onNetConnectionReply(arguments[1]);
				break;
			
			case "OnEnablePresence":
				
				m_localUserInfo = arguments[1];
				m_peerID = m_localUserInfo.peerID;
				// thisElement('uid').value = m_peerID;
				m_userName = m_localUserInfo.userName;
				m_userType = m_localUserInfo.userType;
				m_hasAudio = m_localUserInfo.hasAudio;
				m_hasVideo = m_localUserInfo.hasVideo;
				console.log(m_hasAudio);
				nextTestMic();

				break;
				
			case "OnWBModulePrepareComplete":
				isWBModuleComplete = true;
				
				m_mediaServerIP = arguments[1];
				m_mediaServerTcpPort = arguments[2];
				m_mediaServerUdpPort = arguments[3];
				
				thisMovie("MicroLanguage_WB").Flash_SetWBPenColor(0xff0000);
				thisMovie("MicroLanguage_WB").Flash_SetWBPenThickness(5);
				thisMovie("MicroLanguage_WB").Flash_SetWBPenAlpha(1);
				thisMovie("MicroLanguage_WB").Flash_SetWBRectColor(0x00ff00);
				thisMovie("MicroLanguage_WB").Flash_SetWBRectThickness(5);
				thisMovie("MicroLanguage_WB").Flash_SetWBRectAlpha(1);
				thisMovie("MicroLanguage_WB").Flash_SetWBTextColor(0x0000ff);
				thisMovie("MicroLanguage_WB").Flash_SetWBTextFont("微软雅黑");
				thisMovie("MicroLanguage_WB").Flash_SetWBTextSize(12);
				
				if(isWBModuleComplete && isVideoModuleComplete)
				{
					initial();
				}
				break;
			
			case "OnUserIn":
				userList.push(arguments[1]);
				// if (arguments[1].userName == 'jiaoshi') {
				break;
			
			case "OnUserOut":
				var outUserID = arguments[1];
				var outUserName;
				for(var i=0;i< userList.length;i++)
				{
					if(userList[i].peerID == outUserID)
					{
						outUserName = userList[i].userName;
						userList.splice(i,1);
						break;
					}
				}
				// alert("****** User Out ******\r\n"+
				// "user name: "+outUserName+"\r\n"+
				// "user id: "+outUserID);
				
				break;
				
			case "OnShowPage":
				var showingFileID = arguments[1];
				var showingPageID = arguments[2];
				for(var i=0;i<fileList.length;i++)
				{
					if(fileList[i].fileid == showingFileID)
					{
						thisElement('sel').options[i].selected = true;
						break;
					}
				}
				break;
				
			case "OnReceiveTextMsg":
				var fromID = arguments[1];
				var msgBody = arguments[2];
				var fromName;
				for(var i=0;i<userList.length;i++)
				{
					if(userList[i].peerID == fromID)
					{
						fromName = userList[i].userName;
						break;
					}
				}
				alert("message from: " + fromName + "\r\n" +
				"message content: " + msgBody);
				break;
			
			<!-- 以下为视频模块的回调 -->
			case "OnVideoModulePrepareComplete":
				isVideoModuleComplete = true;
				if(isWBModuleComplete && isVideoModuleComplete)
				{
					initial();
				}
				break;
				
			case "OnCamChanged":
				var camOpened = arguments[1];
				if(camOpened == true)
				{
					alert("Camera was opened");
				}
				else if(camOpened == false)
				{
					alert("Camera was closed");
				}
				break;
				
			case "OnMicChanged":
				var micOpend = arguments[1];
				if(micOpend == true)
				{
					alert("Microphone was opened");
				}
				else if(micOpend == false)
				{
					alert("Microphone was muted");
				}
				break;
			
			case "OnUpNetState":
				var upSta = arguments[1];
				if(upSta == 0)
				{
					// console.log("Uplink network good");
				}
				else if(upSta == 1)
				{
					// console.log("Uplink network bad");
				}
				break;
				
			case "OnDownNetState":
				var downSta = arguments[1];
				if(downSta == 0)
				{
					// console.log("Downlink network good");
				}
				else if(downSta == 1)
				{
					// console.log("Downlink network bad");
				}
				break;
				
			case "OnDetecAudioDevReply":
				var aDev = arguments[1];
				if(aDev == 0)
				{
					// console.log("Normal audio device");
				}
				else if(aDev == -1)
				{
					// console.log("No audio device");
				}
				else if(aDev == -2)
				{
					// console.log("Audio device disabled");
				}
				break;
			
			case "OnDetectVideoDevReply":
				var vDev = arguments[1];
				if(vDev == 0)
				{
					// console.log("Normal video device");
				}
				else if(vDev == -1)
				{
					// console.log("No video device");
				}
				else if(vDev == -2)
				{
					// console.log("Video device disabled");
				}
				break;
			
			case "OnDetectNetStateReply":
				var netSta = arguments[1];
				if(netSta == 0)
				{
					// console.log("Network good");
				}
				else if(netSta == 1)
				{
					// console.log("Network bad");
				}
				break;
				
			case "OnGetMicListReply":
				m_micList = arguments[1];
				m_curMicIndex = arguments[2];
				m_curMicName = arguments[3];
				
				var micsel = thisElement('micsel');
				for(var index=0; index < m_micList.length; index++)
				{
					var optionItem = document.createElement("OPTION");
					optionItem.value=index;
					optionItem.text= m_micList[index];
					micsel.options.add(optionItem);
				}
				
				if(m_curMicIndex < m_micList.length)
				{
					micsel.options[m_curMicIndex].selected = true;
				}
				break;
				
			case "OnGetCamListReply":
				m_camList = arguments[1];
				m_curCamIndex = arguments[2];
				m_curCamName = arguments[3];
				m_curCamWidth = arguments[4];
				m_curCamHeight = arguments[5];
				
				var camsel = thisElement('camsel');
				for(var index=0; index < m_camList.length; index++)
				{
					var optionItem = document.createElement("OPTION");
					optionItem.value=index;
					optionItem.text= m_camList[index];
					camsel.options.add(optionItem);
				}
				
				if(m_curCamIndex < m_camList.length)
				{
					camsel.options[m_curCamIndex].selected = true;
				}
				break;
				
			case "OnUpVideoBWReply":
				//发布自己的视频后(即调用Flash_PublishVideo)会收到此回调，每3秒收一次。单位:kbps
				// console.log("up bandwidth: "+arguments[1]+"kbps");
				break;
				
			case "OnDownVideoBWReply":
				//播放别人的视频后(即调用Flash_PlayVideo接口)会收到此回调，每3秒收一次。单位:kbps
				// console.log("user id: "+arguments[1]+"  video id："+arguments[2]+"  down bandwidth: "+arguments[3]+"kbps");
				break;
				
			case "OnDevStatusChange":
				var mutedStatus = arguments[1];
				var fir = 0;
				if(mutedStatus == -1)
				{
					canNext = false;
					fir++;
					console.log(fir);
					if(fir === 2){
						console.log('点击了拒绝');
						window.location.href = window.location.href;
					}

					// window.location.href = window.location.href;
					
					// console.log("audio&video device were muted");//点击了拒绝
				}
				else if(mutedStatus == 0)
				{
					canNext = true;
					// console.log("audio&video device were unmuted");//点击了允许
				}
				break;
			case "OnMicLoopBackVolReply":
						// thisElement("volwatcher").value = arguments[1];
					console.log(arguments[1]);
					$('.volumeCount').css({
						'width':arguments[1]+'%'
					})
					break;
			default:
				break;
		}
    }
	
	function onFileChange(value)
	{
		var fileID = fileList[value].fileid;//文档ID
		var pageNum = fileList[value].pagenum;//文档总页数。注：白板无此字段
		thisMovie("MicroLanguage_WB").Flash_ShowFile(fileID,1);
	}
	
	function playVideo()
	{
		<!-- 调用从视频模块中的播放视频方法，在从视频模块中播放指定用户的视频 -->
		//thisMovie("video_slave").Flash_PlayVideo(parseInt(thisElement("uid").value),0);
	}
	
	function unplayVideo()
	{
		<!-- 调用从视频模块中的停止播放视频方法，停止从视频模块中正在播放的视频 -->
		//thisMovie("video_slave").Flash_UnplayVideo(parseInt(thisElement("uid").value),0);
	}
	
	function playAudio()
	{
		<!-- 调用主视频模块中的播放音频方法，通过主视频模块播放指定用户的音频 -->
		thisMovie("video_main").Flash_PlayAudio(parseInt(thisElement("uid").value));
	}
	
	function unplayAudio()
	{
		<!-- 调用主视频模块中的停止播放音频方法，停止在主视频模块中正在播放的音频 -->
		thisMovie("video_main").Flash_UnplayAudio(parseInt(thisElement("uid").value));
	}
	
	function publisAudio()
	{
		<!-- 调用主视频模块中的发布音频方法，通过主视频模块发布自己的音频 -->
		thisMovie("video_main").Flash_PublishAudio();
	}
	
	function unpublisAudio()
	{
		<!-- 调用主视频模块中的停止发布音频方法，通过主视频模块停止发布自己的音频 -->
		thisMovie("video_main").Flash_UnpublishAudio();
	}
	
	function publisVideo()
	{
		<!-- 调用主视频模块中的发布视频方法，通过主视频模块发布自己的视频 -->
		thisMovie("video_main").Flash_PublishVideo(0);
	}
	
	function unpublisVideo()
	{
		<!-- 调用主视频模块中的停止发布视频方法，通过主视频模块停止发布自己的视频 -->
		thisMovie("video_main").Flash_UnpublishVideo(0);
	}
	
	function sendTextMsg()
	{
		<!-- 调用白板模块中的发送文本消息方法，向会议中其他用户发送文本消息 -->
		thisMovie("MicroLanguage_WB").Flash_SendTextMsg("hello world",0);
	}
	
	function setFocusUser()
	{
		<!-- 调用白板模块中的设置焦点用户的方法，设置录制焦点 -->
		thisMovie("MicroLanguage_WB").Flash_SetFocusUser(parseInt(thisElement("uid").value));
	}
	
	function removeFocusUser()
	{
		<!-- 调用白板模块中的移除焦点用户的方法，移除录制焦点 -->
		thisMovie("MicroLanguage_WB").Flash_RemoveFocusUser(parseInt(thisElement("uid").value));
	}
	
	function startRecord()
	{
		<!-- 调用白板模块中的开始录制方法，录制会议音视频 -->
		thisMovie("MicroLanguage_WB").Flash_StartRecord();
	}
	
	function stopRecord()
	{
		<!-- 调用白板模块中的停止录制方法，停止录制会议音视频 -->
		thisMovie("MicroLanguage_WB").Flash_StopRecord();
	}
	
	function detAudioDev()
	{
		<!-- 调用主视频模块中的检测音频设备方法，检测音频设备状态 -->
		thisMovie("video_main").Flash_DetectAudioDevice();
	}
	
	function detVideoDev()
	{
		<!-- 调用主视频模块中的检测视频设备方法，检测视频设备状态 -->
		thisMovie("video_main").Flash_DetectVideoDevice();
	}
	
	function detNetState()
	{
		<!-- 调用主视频模块中的检测网络状态方法，检测网络状态 -->
		thisMovie("video_main").Flash_DetectNetState();
	}
	
	function onNetConnectionReply(status)
	{
		switch(status)
		{
			case "Success":
				<!-- 成功连接到服务器 -->
				//alert("Connect server success");
				break;
			case "Failed":
				<!-- 无法连接到服务器 -->
				alert("Connect server failed");
				break;
			case "Rejected":
				<!-- 连接服务器被拒绝，一般是点数超限造成 -->
				alert("Connect server rejected");
				break;
			case "Closed":
				<!-- 与服务器的连接中断 -->
				alert("Server connection closed");
				break;
			default :
				break;
		}
	}
	
	function initial()
	{
		<!-- Flash_SetSelfProperty是视频模块的接口，而m_localUserInfo由白板模块得到，故要等到白板模块和视频模块都准备完成才可调用此接口 -->
		<!-- 一定要在调用任何Flash接口前调用Flash_SetSelfProperty接口，为主、从视频模块设置属性 -->
		thisMovie("video_main").Flash_SetConnectionInfo(m_mediaServerIP,m_mediaServerTcpPort,m_mediaServerUdpPort);
		thisMovie("video_main").Flash_SetSelfProperty(m_localUserInfo);
		thisMovie("video_main").Flash_PlayVideo(m_peerID,0);
		thisMovie("video_main").Flash_PlayAudio(m_peerID);
		
		getAVDevList();
		publisVideo();
    	publisAudio();
		
	}
	
	<!-- 获取音视频设备列表 -->
	<!-- 注：Flash没有获取扬声器的能力 -->
	function getAVDevList()
	{
		//获取麦克风列表，通过OnGetMicListReply回调返回麦克风信息
		thisMovie("video_main").Flash_GetMicList();
		//获取摄像头列表，通过OnGetCamListReply回调返回摄像头信息
		thisMovie("video_main").Flash_GetCamList();
	}
	
	function onMicChange(value)
	{
		//Flash_SetMicrophone(index)
		//index:麦克风索引
		thisMovie("video_main").Flash_SetMicrophone(value);
		m_curCamIndex = value;
	}
	
	function onCamChange(value)
	{
		//Flash_SetCamera(index,wid,hei)
		//index:摄像头索引
		//wid:分辨率宽
		//hei:分辨率高
		thisMovie("video_main").Flash_SetCamera(value,m_curCamWidth,m_curCamHeight);
		m_curCamIndex = value;
	}
	
	function zoomOut()
	{
		thisMovie("video_main").width = 640;
		thisMovie("video_main").height = 480;
	}
	
	function zoomIn()
	{
		thisMovie("video_main").width = 320;
		thisMovie("video_main").height = 240;
	}
	
	var micIndex = 0;
	var micTesting = false;
	function startMicTest()
	{
		// micIndex = thisElement("micsel").selectedIndex;
		thisMovie("video_main").Flash_StartMicLoopBack(0);
		micTesting = true;
	}

	function stopMicTest()
	{
		thisMovie("video_main").Flash_StopMicLoopBack(0);
	}
		