<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="testDevPage.aspx.cs" Inherits="StudentPlatform.videoCheck.testDevPage" %>
<%@ Register Src="~/controls/LeftMenu.ascx" TagPrefix="uc1" TagName="LeftMenu" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>设备测试</title>
    <link rel="stylesheet" href="css/base.css" />
    <meta name="google" value="notranslate" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="css/index.css" />
    <script type="text/javascript" src='js/jquery.js'></script>
    <script type="text/javascript" src='js/index.js'></script>
    <script type="text/javascript" src='js/flash.js'></script>
    <link rel="stylesheet" type="text/css" href="css/history.css" />
    <script type="text/javascript" src="js/history.js"></script>
    <script type="text/javascript" src="js/swfobject.js"></script>
    <script type="text/javascript" src='js/getOSAndBrowser.js'></script>
    <script type="text/javascript" src='js/testSpeed.js'></script>

    <!-- 加载白板模块 -->
    <script type="text/javascript">
        // For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. 
        var swfVersionStr = "11.1.0";
        // To use express install, set to playerProductInstall.swf, otherwise the empty string. 
        var xiSwfUrlStr = "playerProductInstall.swf";
			
        //<!-- ip:web服务器ip -->
        //<!-- port:web服务器端口 -->
        //<!-- mid:会议号 -->
        //<!-- uname:用户名 -->
        //<!-- pwd:会议密码 -->
        //<!-- utype:用户类型。0：学生、1：教师 -->
			
        var flashvars = {ip:"www.weiyicloud.com",port:"80",mid:"204390934",uname:"keguan",pwd:"123456",utype:1};
        var params = {};
        params.quality = "high";
        params.bgcolor = "#869ca7";
        params.allowscriptaccess = "sameDomain";
        params.allowfullscreen = "true";
        var attributes = {};
        attributes.id = "MicroLanguage_WB";
        attributes.name = "MicroLanguage_WB";
        attributes.align = "left";
        swfobject.embedSWF(
            "MicroLanguage_WB.swf", "whiteboard", 
            "600", "450", 
            swfVersionStr, xiSwfUrlStr, 
            flashvars, params, attributes);
        // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
        swfobject.createCSS("#whiteboard", "display:block;text-align:left;");
    </script>


    <!-- 加载主视频模块，发布、播放自己的音视频，及播放其他人的音频，均调用此模块中的接口完成 -->

    <script type="text/javascript">
        // For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. 
        var swfVersionStr = "11.1.0";
        // To use express install, set to playerProductInstall.swf, otherwise the empty string. 
        var xiSwfUrlStr = "playerProductInstall.swf";
        //<!----------------------------------------------------------------------------------------------------------------------------->
        //<!-- mid:会议号 -->
        //<!-- toolbarinvisible：不显示工具条。0：显示、1：不显示。主视频模块可选择显示，从视频模块可选择不显示 -->
        //<!-- uncollectav:不采集音视频。即是否弹出Adobe Flash Player的允许决绝对话框。若不弹出此对话框，则无法使用音视频设备采集音视频，但可以播放音视频 -->
        //<!-- 从视频模块可选择不弹出此对话框，因为从视频模块一般只用来播放视频。0：采集(弹出对话框)、1:不采集(不弹出对话框) -->
        //<!----------------------------------------------------------------------------------------------------------------------------->
        var flashvars = {mid:"204390934",toolbarinvisible:1,uncollectav:0};
        var params = {};
        params.quality = "high";
        params.bgcolor = "#869ca7";
        params.allowscriptaccess = "sameDomain";
        params.allowfullscreen = "true";
        var attributes = {};
        attributes.id = "video_main";
        attributes.name = "video_main";
        attributes.align = "middle";
        swfobject.embedSWF(
            "MicroLanguage_Video.swf", "video_main", 
            "320", "240", 
            swfVersionStr, xiSwfUrlStr, 
            flashvars, params, attributes);
        // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
        swfobject.createCSS("#video_main", "display:block;text-align:left;");
    </script>

    <style type="text/css" media="screen">
        html {
            height: 100%;
            overflow: hidden;
        }

        body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: auto;
        }

        object:focus {
            outline: none;
        }

        #MicroLanguage_WB, #whiteboard {
            width: 0;
            height: 0;
        }
    </style>
</head>
<body>
    <!--首页主内容框 start-->
    <div id="main" class="bxk_container">
        <div class="slider">
            <uc1:leftmenu runat="server" id="LeftMenu" />
        </div>
        <div class="con_right" style='margin: 0 auto;height:auto; padding-top:78px; float: left;width:650px;'>

            <div id='main_test' style='position:relative;'>
                <div id="whiteboard">
                    
                </div>
                <div id="video_main">
                   
                </div>

                <div class="teamViewPanel" style='display:none;'>
                    <div class='tLogo'>
                        <span class="close" id='closeTeamView'>&times;</span>
                        <img src="testDev/imgs/teamView.png" alt="" />
                        远程联机程序
                    </div>
                    <div class="teamContent">
                        当您进入教室上课或耳机麦克风有问题时，专业工程师将使用此软件与您联机提供技术支持。
                        <a class='downTeamView' href="./TeamViewer_Setup_zhcn.exe">下载TeamViewer</a>
                        <div id="testPhone" style='width:274px;height:72px;overflow:hidden;margin:0 auto;  position:relative;'>
                            <div class="phoneCover" style='width:100%;height:44px;position:absolute;top:0;background:#fff;z-index:40;'></div>
                            <div class="phoneCover" style='width:5px;height:34px;position:absolute;top:44px;left:133px; background:#fff;z-index:40;'></div>
                            <iframe src="testPhone.html" style='position:absolute;left:-36px;' width='274' height='100' frameborder="0"></iframe>
                        </div>
                    </div> 
                </div>
                
                <div class="testPage" id='startPage' style='height:560px;'>
                    <div class="msg" style='margin-top:200px;'>
                        检测您的电脑是否支持在线上课？<br />
                        <br />
                        <a id='startTest' href="javascript:;">开始检测</a>
                    </div>
                </div>
                
                <!-- flash检测 -->
                <div class="testPage" id="testFlashView" style='display:none;'>
                    <div class="flashBox">
                        <div class="flashPng">
                            <img src="testDev/imgs/flashLogo.png" alt="" />
                        </div>
                        <div class="flashContent">
                            <p class='h2'>未安装Adobe Flash Player或版本过低</p>
                            <p>flash版本过低会无法正常使用教室哦！</p>
                        </div>
                    </div>
                    <a href="http://www.adobe.com/go/getflashplayer">下载最新版本</a>
                </div>

                <div class='testPage' id="video_box" style='display:none;height:648px;'>
                    <div class="msg" style='line-height:30px; text-align:left;'>
                        在页面的设置框中请点击"<span class='success'>允许</span>",或者点击鼠标右键后选中设置,然后勾选"<span class='success'>允许</span>"并"<span class='success'>记住</span>",如下图：<br />
                        <img src="testDev/imgs/navSet.png" alt="" />
                        <a id='next' href="javascript:;" style='text-align:center;display:block;margin:0 auto;margin-top:20px;'>下一步</a>
                    </div>
                </div>

                <div class="testPage" id="testMic" style='display:none;'>
                    <p class='hr1'>未检测到麦克风!</p>
                    <p>请安装或开启麦克风并重启浏览器后继续完成测试</p>
                </div>

                <div class="testPage" id='testHomePage' style='display:none;height:620px;'>
                    <div class="testPageContent">
                        <div class='tr1'><span id='testing' class='h1'>正在检测...</span><span class='statusMsg'>检测过程大概需要2分钟，请准备好麦克风和耳机，请按提示进行操作</span></div>
                        <div class="itemGroup">
                            <table>
                                <thead>
                                    <tr class='firstTr'>
                                        <th style='width:110px;'>检测项</th>
                                        <th style='width:110px;'>检测结果</th>
                                        <th style='width:70px;'>状态</th>
                                        <th style='width:140px;'>建议</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>操作系统</td>
                                        <td id='sys'>--</td>
                                        <td>等待检测</td>
                                        <td>--</td>
                                    </tr>
                                    <tr>
                                        <td>浏览器</td>
                                        <td id='browser'>--</td>
                                        <td>等待检测</td>
                                        <td>--</td>
                                    </tr>
                                    <tr class='bottomHr'>
                                        <td>Flash Player版本</td>
                                        <td id='flash'>--</td>
                                        <td>等待检测</td>
                                        <td>--</td>
                                    </tr>
                                    <tr>
                                        <td>下载速度</td>
                                        <td id='downloadNet'>--</td>
                                        <td>等待检测</td>
                                        <td style='line-height:20px;'></td>
                                    </tr>
                                    <tr class='bottomHr'>
                                        <td>上传速度</td>
                                        <td id='uploadNet'>--</td>
                                        <td>等待检测</td>
                                        <td style='line-height:20px;'></td>
                                    </tr>
                                    <!-- <tr class='bottomHr'>
                                        <td>宽带速度</td>
                                        <td>&gt;1000kb/s</td>
                                        <td></td>
                                        <td></td>
                                    </tr> -->
                                    <tr>
                                        <td>耳机</td>
                                        <td id='erjiResult'>--</td>
                                        <td>等待检测</td>
                                        <td id='erjiMsg'>--</td>
                                    </tr>
                                    <tr>
                                        <td>麦克风</td>
                                        <td id='micResult'>--</td>
                                        <td>等待检测</td>
                                        <td id='micMsg'>--</td>
                                    </tr>
                                    <tr class='bottomHr'>
                                        <td>摄像头</td>
                                        <td id='videoResult'>--</td>
                                        <td>等待检测</td>
                                        <td id='videoMsg'>--</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class='bottom' style='display:none;'>
                                <a style='color:#41caf6;' href="javascript:;" id='downloadApp'>专业工程师可以帮您远程调试设备</a>
                                <a class='a' href="javascript:;"  id='jiance'>重新检测</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="testPage" id='erjiTest' style='display:none;'>
                    <div class="testPageContent" style='width:500px;'>
                        <div class="title">耳机检测</div>
                        <dl class='erjiDev topHr bottomHr'>
                            <dt>
                                <audio src="xpg.mp3" loop preload id='audio' ></audio>
                                <span class="h1">第一步：安装耳机</span>
                                <ul>
                                    <li><i></i>将耳机插入电脑的耳机插孔，请注意，个别电脑的耳机和麦克风使用同一插孔。</li>
                                    <li><i></i>调整耳机上的音量控制旋钮至合适的音量</li>
                                </ul>
                            </dt>
                            <dd>
                                <img src="testDev/imgs/erji.png" alt="" />
                            </dd>
                            <dt>
                                <span class="h1">第二步：测试耳机</span>
                                <ul>
                                    <li><i></i>请戴上耳机我们将自动播放一段音乐</li>
                                </ul>
                            </dt>
                            <dd>
                            </dd>
                        </dl>
                    
                        <div class="btn">
                            <span class='question'>您可以听到声音吗？</span>
                            <a href="javascript:;" style='margin-left: 60px;' id='canListen'>听得到</a>
                            <a class='warning' href="javascript:;" id='noListen' style='margin-left:20px;'>听不到</a>
                        </div>
                    </div>
                </div>

                <div class="testPage" id='micTest' style='height:658px;overflow:auto;display:none;'>
                    <div class="testPageContent" style='margin-top:20px;height: 750px;padding-bottom: 100px;'>
                        <div class="title">麦克风检测</div>
                        <dl class='micDev topHr bottomHr'>
                            <dt>
                                <span class="h1">第一步：安装麦克风</span>
                                <ul>
                                    <li><i></i>将麦克风插入电脑的麦克风插孔，请注意，个别电脑的耳机和麦克风使用同一插孔。</li>
                                    <li><i></i>调整麦克风到合适的音量</li>
                                </ul>
                            </dt>
                            <dd>
                                <img src="testDev/imgs/mic.png" alt="" />
                            </dd>
                            <dt style='width:430px;height:auto;'>
                                <span class="h1">第二步：选择要使用的麦克风</span>
                                <ul>
                                    <li><i></i>找到右下角的喇叭图标右键选择录音设备，进去麦克风设置界面</li>
                                    <li><i></i>在设置界面可以看到麦克风设备是否正常工作，再多个设备的情况下，请选择使用的麦克风右键将其设置为默认设备</li>
                                    <li>
                                        <img src="testDev/imgs/mic2.png" alt="" />
                                    </li>
                                </ul>
                            </dt>
                            <dt style='width:430px;'>
                                <span class="h1">第三步：测试麦克风</span>
                                <ul>
                                    <li><i></i>对着麦克风说一段话</li>
									<li style='height:24px;'><div class='volumeBar'>
                                    <div class="volumeCount"></div></div></li>
                                    <li><i></i>如果麦克风正常，你将听到自己的声音</li>
                                </ul>
                            </dt>
                        </dl>
						<!--
                        <div class="btn">
                            <a style='float:right;' href="javascript:;" id='micCanListen'>下一步</a>
                        </div>
                        -->
                        <div class="btn">
                            <span class='question'>您可以听到声音吗？</span>
                            <a href="javascript:;" style='margin-left: 110px;' id='micCanListen'>听得到</a>
                            <a class='warning' href="javascript:;" id='micNoListen'>听不到</a>
                        </div>
                    </div>
                    
                </div>

                <div class="testPage" id='videoTest' style='display:none;height:658px;'>
                    <div class="testPageContent">
                        <div class="title">视频检测</div>
                        <dl class='video topHr bottomHr'>
                            <dt>
                                <span class="h1">第一步：打开要使用的摄像头</span>
                                <ul>
                                    <li>
                                        <select name="" id="camsel" class='micSelect'>
                                            
                                        </select>
                                    </li>
                                    <li>若此设备不能正常工作，请拆除并保证有一个设备正常工作。</li>
                                </ul>
                            </dt>
                            <dd>
                                
                            </dd>
                            <dt style='width:430px;'>
                                <span class="h1">第二步：检测摄像头</span>
                                <ul>
                                    <li>
                                        <div class="video_main"></div>
                                    </li>
                                </ul>
                            </dt>
                        </dl>
                        
                        <div class="btn">
                            <span class='question'>您可以看到图像吗？</span>
                            <a href="javascript:;" style='margin-left:206px;' id='canSee'>看得到</a>
                            <a class='warning' href="javascript:;" style='margin-left:20px;' id='noSee'>看不到</a>
                        </div>
                    </div>
                </div>



                <div id="mainCover"></div>
            </div>
        </div>
    </div>
</body>
</html>
