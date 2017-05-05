/**
 * Created by Administrator on 2016/10/26.
 */
/* 水印效果 焦点事件*/
$(document).ready(function () {
    //focusblur
    jQuery.focusblur = function (focusid) {
        var focusblurid = $(focusid);
        var defval = focusblurid.val();
        focusblurid.focus(function () {
            var thisval = $(this).val();
            if (thisval == defval) {
                $(this).val("");
                $(this).css({color:'#19b955'});
            }
        });
        focusblurid.blur(function () {
            var thisval = $(this).val();
            if (thisval == "") {
                $(this).val(defval);
                $(this).css({color:'#000'});
            }
        });
    };
    /*下面是调用方法*/
    $.focusblur(".search_ord_161026");
});


function mySubmit(flag){  
		return flag;  
	}

/* 侧边栏 cebianlan_161025_blue_form_bxk*/
$(function () {
    $(".cebianlan_161025_red").hover(function(){
        $(this).stop().animate({"right":0},400);
    }, function () {
        $(this).stop().animate({"right":"-148px"},400);
    });

    $(".cebianlan_161025_blue").hover(function(){
        $(this).stop().animate({"right":0},400);
        $(".cebianlan_161025_blue_form_bxk").show();
    }, function () {
        $(".cebianlan_161025_blue_form_bxk").hide();
        $(this).stop().animate({"right":"-148px"},400);

    });
    $(".cebianlan_161025_green").hover(function(){
        $(".cebianlan_161025_green2").stop().animate({"right":0},400);
        $(".cebianlan_161025_green1").hide();
    }, function () {
        $(".cebianlan_161025_green2").stop().animate({"right":"-134px"},400);
        $(".cebianlan_161025_green1").show();


    });
	


    /* 查询订单 */
    $(".search_ord_161026_button").click(function () { //°??????÷????
        var mobile = $("input#search_ord_161026").val();
        if (mobile == "") {
            return false;
        } else {
            var re = /^1[3|5|7|8|][0-9]{9}$/;
            if (!re.test(mobile)) {
                alert("请输入正确的手机号");
                return;
            }
        }
        window.location.href = './search.html?phone=' + mobile;
    });

    $('.search_ord_161026').keydown(function (e) {
        if (e.keyCode == 13) {                                  //????????
            var mobile = $("input#search_ord_161026").val();
            if (mobile == "") {
                return false;
            } else {
                var re = /^1[3|5|7|8|][0-9]{9}$/;
                if (!re.test(mobile)) {
                    alert("请输入正确的手机号");
                    return;
                }
            }
            window.location.href = './search.html?phone=' + mobile;
        }
    });
});


/* 预约试听 */
$(function(){
    //遮罩层
    var bodyH=$(window).height();
    $(".yuyuezhezhao_new_161026").height(bodyH);

    //关闭按钮
    $(".yuyueshiting_new_161026_close").click(function(){
        $(this).parents(".shitingbox_new_161026").hide();
    });
    $(".yuyueshiting_new_161026_btu2").click(function(){
        $(this).parents(".shitingbox_new_161026").hide();
    });

    //预约试听点击弹出事件
    $(".yuyueshiting_btu_js").click(function(){
        alert(1);
        $(".yuyueshiting_box1_new_161026").show();
    });

    //弹窗表单keydown事件
    $('.yuyuezhezhao_new_161026_form_name').keydown(function(e){
        if(e.keyCode==13){                                  //回车事件
            $(".yuyuezhezhao_new_161026_form_tel").focus();
        }
    });
    $('.yuyuezhezhao_new_161026_form_tel').keydown(function(e){
        if(e.keyCode==13){                                  //回车事件
            var name = $("input#yuyuezhezhao_new_161026_form_name").val();
            if (name == "") {
                alert('请输入您的姓名');
                return false;
            }
            var mobile = $("input#yuyuezhezhao_new_161026_form_tel").val();
            if (mobile == "") {
                return false;
            } else {
                var re = /^1[3|5|7|8|][0-9]{9}$/;
                if (!re.test(mobile)) {
                    alert("请输入正确的手机号");
                    return;
                }
            }
            //$("#form1").submit();
            $("input#yuyuezhezhao_new_161026_form_name").val("");
            $("input#yuyuezhezhao_new_161026_form_tel").val("");

            $.ajax({
                type: "POST",
                url: "http://w.gogo-talk.com/api/order/RegisterUser",
                data: { Mobile: mobile, Name: name },
                dataType: "json",
                success: function (data) {
                    if (data.Return == 1) {
                        $(".yuyueshiting_box1_new_161026").hide();
                        $(".yuyueshiting_box2_new_161026").show();
                    }
                }
            });
        }
    });

    //快速预约体验课
    $("#yuyueshiting_new_161026_btu").click(function () { //?°?á???±°??????÷????
        var name = $("input#yuyuezhezhao_new_161026_form_name").val();
        if (name == "") {
            alert('请输入您的姓名');
            return false;
        }
        var mobile = $("input#yuyuezhezhao_new_161026_form_tel").val();
        if (mobile == "") {
            return false;
        } else {
            var re = /^1[3|5|7|8|][0-9]{9}$/;
            if (!re.test(mobile)) {
                alert("请输入正确的手机号");
                return;
            }
        }
        //$("#form1").submit();
        $("input#yuyuezhezhao_new_161026_form_name").val("");
        $("input#yuyuezhezhao_new_161026_form_tel").val("");

        $.ajax({
            type: "POST",
            url: "http://w.gogo-talk.com/api/order/RegisterUser",
            data: { Mobile: mobile, Name: name },
            dataType: "json",
            success: function (data) {
                if (data.Return == 1) {
                    $(".yuyueshiting_box1_new_161026").hide();
                    $(".yuyueshiting_box2_new_161026").show();
                }
            }
        });


    });
});