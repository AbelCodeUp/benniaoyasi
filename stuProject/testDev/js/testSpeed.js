
        //JUST AN EXAMPLE, PLEASE USE YOUR OWN PICTURE!
var imageAddr = "http://teacher.4000669696.com/teacher/Des6.png"; 
var downloadSize = 1315840; //bytes
var curData;
var resultTestNet;
curData=getRandomString(1);
function ShowProgressMessage(msg) {
    if (console) {
        if (typeof msg == "string") {
            console.log(msg);
        } else {
            for (var i = 0; i < msg.length; i++) {
                console.log(msg[i]);
            }
        }
    }
    
    var oProgress = document.getElementById("progress");
    if (oProgress) {
        var actualHTML = (typeof msg == "string") ? msg : msg.join("");
        oProgress.innerHTML = actualHTML;
    }
}
var timerDown;
function InitiateSpeedDetection() {
    // ShowProgressMessage("正在检测你的上传下载速度");
    // document.getElementById('testNetMsg').style.display = 'block';
    timerDown= window.setInterval(MeasureConnectionSpeed,5000);
    MeasureConnectionSpeed();
};    

// if (window.addEventListener) {
//     window.addEventListener('load', InitiateSpeedDetection, false);
// } else if (window.attachEvent) {
//     window.attachEvent('onload', InitiateSpeedDetection);
// }
var count=0;

function MeasureConnectionSpeed() {
    count++;
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    
    download.onerror = function (err, msg) {
        ShowProgressMessage("Invalid image, or error downloading");
    }
    
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;
    
    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8 ;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(0);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        // var downloadSpeed = speedKbps;
        // if(downloadSpeed<100){
        //     document.getElementById( 'downloadNet' ).innerHTML = '<span style="color:red;">极差</span>';
        // }
        // else if(downloadSpeed>=100 && downloadSpeed<200){
        //     document.getElementById( 'downloadNet' ).innerHTML = '<span style="color:#d00;">差</span>';
        // }
        // else if(downloadSpeed>=200 && downloadSpeed < 300){
        //     document.getElementById( 'downloadNet' ).innerHTML = '<span style="color:#000;">正常</span>';
        // }
        // else if(downloadSpeed > 300){
        //     document.getElementById( 'downloadNet' ).innerHTML = '<span style="color:green;">良好</span>';
        // }
        //   ShowProgressMessage([
        //       "下载速度：", 
        // //      speedBps + " bps", 
        //       (speedKbps/8).toFixed(0) + " kb/s" 
        //       //speedMbps + " Mbps"
        //   ]);
        // document.getElementById('downloadNet').innerHTML = (speedKbps/8).toFixed(0) + " kb/s" ;

        $('#downloadNet').html((speedKbps/8).toFixed(0) + " kb/s");
        if(parseInt($('#downloadNet').html())>200){
            downNet = true;
            $('#downloadNet').next().removeClass('warning').addClass('success').html('良好');
        }
        else{
            downNet = false;
            $('#downloadNet').next().removeClass('success').addClass('warning').html('差').next().html('网络不稳定，上课时请勿下载或缓存其他内容');
        }
        $('#uploadNet').next().html(loadImg);
        
        if(count==5){
            window.clearInterval( timerDown );
            checkUploadSpeed( 5, function ( speed, average ) {
                //document.getElementById( 'speed' ).textContent = 'speed: ' + speed + 'kbs';   
                // document.getElementById( 'average' ).textContent = '上传速度： ' + (speed/8).toFixed(0) + ' kb/s';
                // var uploadNet = (speed/8).toFixed(0);
                // if(uploadNet<100){
                //     document.getElementById( 'uploadNet' ).innerHTML = '<span style="color:red;">极差</span>';
                // }
                // else if(uploadNet>=100 && uploadNet<200){
                //     document.getElementById( 'uploadNet' ).innerHTML = '<span style="color:#d00;">差</span>';
                // }
                // else if(uploadNet>=200 && uploadNet < 300){
                //     document.getElementById( 'uploadNet' ).innerHTML = '<span style="color:#000;">正常</span>';
                // }
                // else if(uploadNet > 300){
                //     document.getElementById( 'uploadNet' ).innerHTML = '<span style="color:green;">良好</span>';
                // }

                $('#uploadNet').html((speed).toFixed(0) + " kb/s");
                if(parseInt($('#uploadNet').html())>200){
                    upNet = true;
                    $('#uploadNet').next().addClass('success').html('良好');
                }
                else{
                    upNet = false;
                    $('#uploadNet').next().addClass('warning').html('差').next().html('网络不稳定，上课时请勿下载或缓存其他内容');
                }

                // document.getElementById( 'uploadNet' ).textContent = (speed/8).toFixed(0) + ' kb/s';
                // document.getElementById('testNetMsg').style.display = 'none';
                resultTestNet = true;
            });
        }
    }
};
function checkUploadSpeed( iterations, update ) {
    var average = 0,
        index = 0,
        timer = window.setInterval( check, 5000 ); //check every 5 seconds
        check();

    function check() {
        var xhr = new XMLHttpRequest(),
            url = 'http://www.weiyicloud.com/?cache=' + Math.floor( Math.random() * 10000 ), //random number prevents url caching
            data = curData, //1 meg POST size handled by all servers
            startTime,
            speed = 0;
        xhr.onreadystatechange = function ( event ) {
            if( xhr.readyState == 4 ) {
                speed = Math.round( 1024 / ( ( new Date() - startTime ) / 1000 ) );
                average == 0 
                    ? average = speed 
                    : average = Math.round( ( average + speed ) / 2 );
                update( speed, average );
                index++;
                if( index == iterations ) {
                    window.clearInterval( timer );
                };
            };
        };
        xhr.open( 'POST', url, true );
        startTime = new Date();
        xhr.send( data );
    }; 
};

function getRandomString( sizeInMb ) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+`-=[]\{}|;'://,./<>?"; //random data prevents gzip effect
    var itera = sizeInMb * 1024 * 1024, //get byte count
        result = '';
    for( var index = 0; index < itera; index++ ) {
        result += chars.charAt( Math.floor( Math.random() * chars.length ) );
    };     
    return result;
};

//监听是否检测完网速
gotoTestDev();
function gotoTestDev(){
    //console.log(resultTestNet);
    
    var audio = document.getElementById('audio');
    if(resultTestNet){
        $('#testHomePage').hide();
        $("#erjiTest").show();
        audio.play();
    }
    else{
        window.setTimeout(gotoTestDev,2000);
    }
}
