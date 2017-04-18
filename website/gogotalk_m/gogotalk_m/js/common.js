/* 文字滚动 */
function ScrollImgLeft(){
    var speed=50;
    var scroll_begin = document.getElementById("scroll_begin");
    var scroll_end = document.getElementById("scroll_end");
    var scroll_div = document.getElementById("scroll_div");
    scroll_end.innerHTML=scroll_begin.innerHTML;
    function Marquee(){
        if(scroll_end.offsetWidth-scroll_div.scrollLeft<=0)
            scroll_div.scrollLeft-=scroll_begin.offsetWidth;
        else
            scroll_div.scrollLeft++;
    }
    var MyMar=setInterval(Marquee,speed);
    scroll_div.onmouseover=function() {clearInterval(MyMar);};
    scroll_div.onmouseout=function() {MyMar=setInterval(Marquee,speed);}
}
/*之所以在scroll_begin的div里面写这个多重复的文字，是因为这些文字的长度必须要大于scroll_div的div容器。如果小于div容易，则不会有一直滚动的效果。*/
function GetRequest() {
    //url例子：XXX.aspx?ID=" + ID + "&Name=" + Name；
    var url = location.search; //获取url中"?"符以及其后的字串
    var theRequest = new Object();
    if(url.indexOf("?") != -1)//url中存在问号，也就说有参数。
    {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++)
        {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

/*水印*/
$(document).ready(function () {
    //focusblur
    jQuery.focusblur = function (focusid) {
        var focusblurid = $(focusid);
        var defval = focusblurid.val();
        focusblurid.focus(function () {
            var thisval = $(this).val();
            if (thisval == defval) {
                $(this).val("");
                $(this).css({color:'#999'});
            }
        });
        focusblurid.blur(function () {
            var thisval = $(this).val();
            if (thisval == "") {
                $(this).val(defval);
                $(this).css({color:'#999'});
            }
        });
    };
    /*下面是调用方法*/
    $.focusblur(".input_search");
});

$().ready(function () {
    //获取客户端日期并格式化
    var myDate = new Date();
    var datetime = myDate.getFullYear() + "年" + ((myDate.getMonth() + 1) > 10 ? (myDate.getMonth() + 1) : "0"
        + (myDate.getMonth() + 1)) + "月" + (myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate
            .getDate()) + "日" + (myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate
            .getHours()) + "时" + (myDate.getMinutes() < 10 ? "0" + myDate.getMinutes() : myDate
            .getMinutes()) + "分" + (myDate.getSeconds() < 10 ? "0" + myDate.getSeconds() : myDate
            .getSeconds()) + "秒";

    var starttime = "2017年02月24日00时00分00秒";
    var endtime = "2017年03月25日00时00分00秒";
    //判断日期
    if(datetime<starttime){
    }else if(datetime > starttime && endtime > datetime) {
        $(".text_scroll").show();
        $(".zhanwei").css({"height":" 1.7rem"});
    } else {
        $(".text_scroll").hide();
    }

    //适
});




/* 按钮点击效果 开始*/
window.onload=function(){
    var meau=document.getElementById('meau');
    meau.addEventListener('touchstart',function(){
        meau.className="meau"+" "+"meau2";
    });
    meau.addEventListener('touchend',function(){
        meau.className="meau";
    });
    var form_common_btu=document.getElementById('form_common_btu');
    form_common_btu.addEventListener('touchstart',function(){
        form_common_btu.style.fontSize='0.34rem';
    });
    form_common_btu.addEventListener('touchend',function(){
        form_common_btu.style.fontSize='0.36rem';
    });
};
/* 按钮点击效果 结束*/



/*查询订单函数*/
function dingdan(mobile){


}


$(function(){
    /*隐藏出现*/
    $(".yuyue_b").click(function(){
        $(".yuyue_common_z").toggleClass("yuyue_dis2");
        $(".yuyue_b_img1").toggleClass("yuyue_dis");
        $(".yuyue_b_img2").toggleClass("yuyue_dis");
    });
    $(".meau").click(function(){
        $(".nav").fadeToggle();
        $(".yuyue_b").fadeToggle();
    });
    $(".close").click(function(){
        $(".nav").fadeToggle();
        $(".yuyue_b").fadeToggle();
    });
    $(".erweima").click(function(){
        $(".erweima_box").show();
    });
    $(".closefo").click(function(){
        $(".erweima_box").hide();
    });







    /*订单查询*/
    $(".form_search").click(function(){
        $(".input_search").focus();
    });
    $(".btu_search").click(function (){
        var mobile =$(".input_search").val();
        if (mobile == ""||mobile=="输入手机号查询订单") {
            $(".input_search").blur().val("输入手机号查询订单");
            return false;
        }else{
            var re = /^1[3|5|7|8|][0-9]{9}$/;
            if (!re.test(mobile)) {
                $(".input_search").blur().val("输入手机号查询订单");
                alert("请输入有效的手机号码！");
                return false;
            }else{
                location.href="order_search.html?tel="+mobile;
            }
        }

    });






    /*预约试听公共*/
    $("#form_common_btu").click(function () { //“提交”按钮单击事件
        var name = $("input#name_common").val();
        if (name == "") {
            alert("请输入你的姓名！");
            return false;
        }
        var mobile = $("input#mobile_common").val();
        if (mobile == "") {
            alert("请输入你的手机号码！");
            return false;
        }else{
            var re = /^1[3|5|7|8|][0-9]{9}$/;
            if (!re.test(mobile)) {
                alert("请输入有效的手机号码！");
                return;
            }
        };
        $.ajax({
            type: "POST",
            url: "http://w.gogo-talk.com/api/order/RegisterUser",
            data: { Mobile: mobile, Name: name },
            dataType: "json",
            success: function (data) {
                if (data.Return == 1) {
                    $(".yuyue_common_z").removeClass("yuyue_dis2");
                    $(".yuyue_b_img1").removeClass('yuyue_dis');
                    $(".yuyue_b_img2").addClass('yuyue_dis');
                    $("input#name_common").val("");
                    $("input#mobile_common").val("");
                }
            }
        });

    });


});




