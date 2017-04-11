
var resultTestNet = false; //网速测试是否完成

var loadImg = '<img src="testDev/imgs/load.gif" alt="检测中" />';//loading_img


//麦克，摄像头，耳机
var micIsOk = false;
var videoIsOk = false;
var erjiIsOk = false;

//上、下载
var upNet = false;
var downNet = false;

// var erjiMsg = "<ul><li>如果您未听到声音,可能存在以下问题?</li><li>1、扬声器没有接好或耳机未插好</li><li>2、扬声器未打开或音量调节过小</li><li>3、声卡可能有问题，尝试重启电脑</li></ul>";
// var videoMsg = '<ul><li>看不到视频?</li><li>1、外置摄像头未接好</li><li>2、摄像头设备被其他软件占用 </li><li>3、摄像头驱动可能有问题，尝试重启电脑</li></ul>';
var testCount = 0;
function nextTestMic(){
	// testCount++;
	if(!m_hasAudio){
		$('.testPage').hide();
		$('#testMic').show();
		$('#video_box').hide();
		$('#video_main').css({
			'width':0,
			'height':0
		});
	}
		
}
$(function(){

	$('#downloadApp').on('click',function(){

		$('#mainCover').css({
			'width':$("#main_test").width(),
			'height':$("#main_test").height(),
			'position':'absolute',
			'background':'black',
			'opacity':'0.3',
			'filter':'alpha(opacity:30)',
			'left':0,
			'top':0
		}).show();
	});

	$(".downTeamView,.submitPhone,#closeTeamView").on('click',function(){
		$('#mainCover,.teamViewPanel').hide();
	});
	var audio = document.getElementById('audio');//音乐
	audio.pause();

	$("#video_main").css({
		'width':0,
		'height':0
	});
	$("#startTest").on('click',function(){
		
		nextPage($('#startPage'),$('#video_box'));
		$('#video_main').css({
			'width':400,
			'height':300
		});
	});

	$('#next').click(function(){
		// if(!canNext){
		// 	$('.msg').css({
		// 		'color':'red',
		// 		'font-size':'20px'
		// 	});
		// 	return false;
		// }
		$('#video_box').hide();
		unpublisAudio();
		$('#video_main').css({
			'width':0,
			'height':0
		});
		$('#testHomePage').show();

		//检测浏览器、falsh、系统
		var getOs = getOSAndBrowser();
		//检测系统开始(info为系统,system为flash)
		if(getOs.info){
			$('#sys').text(getOs.info).next().addClass('success').html('正常');
		}
		else{
			$('#sys').text('--').next().addClass('warning').html('异常');
		}
		$('#browser').next().html(loadImg);
		if(getOs.system){
			$('#browser').text(getOs.system).next().addClass('success').html('正常');
		}
		else{
			$('#browser').text('--').next().addClass('warning').html('异常');
		}

		//检测flash开始
		$('#flash').next().html(loadImg);
		var flash = flashChecker();
		console.log(flash.v*1)
		if(flash.v*1<13){
			$('#testFlashView').show();
			$('.testPage').hide();
			$('#video_box').hide();
		}
		if(flash.v){
			$('#flash').text('Flash '+flash.v).next().addClass('success').html('正常');
		}
		else{
			$('#flash').text('--').next().addClass('warning').html('异常');
		}


		$('#downloadNet').next().html(loadImg);
		//测速开始
		InitiateSpeedDetection();
	});

	document.getElementById('camsel').onchange = function(){
		onCamChange(this.value);
	};

	// $('#jiance').click(function(){
	// 	nextPage($('#testHomePage'),$("#erjiTest"));
	// });
	
	$("#canListen").on('click',function(){
		nextPage($('#erjiTest'),$("#micTest"));
		erjiIsOk = true;
		$('#erjiResult').html('检测到耳机').next().addClass('success').html('设备正常');
		audio.pause();
		publisAudio();
		thisMovie("video_main").Flash_PlayAudio(m_peerID);
		// nextTestMic();
		startMicTest();
	});
	$("#noListen").on('click',function(){
		nextPage($('#erjiTest'),$("#micTest"));
		erjiIsOk = false;
		$('#erjiResult').html('检测到耳机').next().addClass('warning').html('设备异常');
		$('#erjiMsg').html('请检查或更换耳机');
		// nextTestMic();
		audio.pause();
		startMicTest();
	});
	$('#downloadApp').on('click',function(){
		$('.teamViewPanel').show();
	})

	$("#micCanListen").on('click',function(){
		nextPage($('#micTest'),$("#videoTest"));
		// var videoPs = document.getElementsByClassName('video')[0];
		// console.log(videoPs.offsetLeft);
		$("#video_main").css({
			'width':320,
			'height':240,
			'left':'50%',
			'margin-left':-300,
			'top':270
		});
		micIsOk = true;
		$('#micResult').html('检测到麦克风').next().addClass('success').html('设备正常');
		stopMicTest();
	});
	$("#micNoListen").on('click',function(){
		nextPage($('#micTest'),$("#videoTest"));
		// var videoPs = document.getElementsByClassName('video')[0];
		// console.log(videoPs.offsetLeft);
		$("#video_main").css({
			'width':320,
			'height':240,
			'left':'50%',
			'margin-left':-300,
			'top':270
		});
		micIsOk = false;
		$('#micResult').html('检测到麦克风').next().addClass('warning').html('设备异常');
		$('#micMsg').html('请检查或更换麦克风');
		stopMicTest();
	});


	$('#canSee').on('click',function(){
		$("#video_main").css({
			'width':0,
			'height':0
		});
		
		nextPage($('#videoTest'),$('#testHomePage'));
		videoIsOk = true;
		$('#videoResult').html('检测到摄像头').next().addClass('success').html('设备正常');
		if(videoIsOk && micIsOk && erjiIsOk && upNet && downNet){
			$('#testing').text('检测完成：').next().text('您的电脑一切正常，可以顺利上课');
		}
		else{
			$('#testing').text('检测完成：').next().addClass('warning').text('建议您根据提示进行相应优化操作，以免影响您正常上课');
		}
		$('.bottom').show();
		$('#jiance').show();
	});
	$('#noSee').on('click',function(){
		$("#video_main").css({
			'width':0,
			'height':0
		});
		
		nextPage($('#videoTest'),$('#testHomePage'));
		videoIsOk = false;
		$('#videoResult').html('检测到摄像头').next().addClass('warning').html('设备异常');
		$('.bottom').show();
		$('#jiance').show();
		$('#testing').text('检测完成：').next().addClass('warning').text('检测到部分设备存在问题，建议优化您的电脑，以免影响您正常上课');
		$('#videoMsg').html('请检查或更换摄像头');
	});
	$('#jiance').on('click',function(){
		window.location.reload();
		// resultTestNet = false;
		// $('#videoTest').hide();
		// $('#video_box').show();
		// $("#video_main").css({
		// 'width':320,
		// 'height':240,
		// 'left':'50%',
		// 'margin-left':'-160px',
		// 'top':'160px',
		// 'z-index': 10
		// });
		// $('.testPage').hide();
	});


	//关闭teamView下载窗口
	$('#closeTeamView').on('click',function(){
		$(".teamViewPanel").hide();
	})

	function nextPage($hide,$show){
		$hide.hide();
		$show.show();
	}
})




















