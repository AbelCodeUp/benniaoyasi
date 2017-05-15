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

/* 侧边栏 */
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
	


    /* ��ѯ���� */
    $(".search_ord_161026_button").click(function () { //��??????��????
        var mobile = $("input#search_ord_161026").val();
        if (mobile == "") {
            $.jAlert('手机号码不能为空!');
            return false;
        } else {
            var re = /^1[3|5|7|8|][0-9]{9}$/;
            if (!re.test(mobile)) {
                $.jAlert('请输入有效的手机号码!');
                return;
            }
        }
        window.location.href = './search.html?phone=' + mobile;
    });

    $('.search_ord_161026').keydown(function (e) {
        if (e.keyCode == 13) {                                  //????????
            var mobile = $("input#search_ord_161026").val();
            if (mobile == "") {
                $.jAlert('手机号码不能为空!');
                return false;
            } else {
                var re = /^1[3|5|7|8|][0-9]{9}$/;
                if (!re.test(mobile)) {
                    $.jAlert('请输入有效的手机号码!');
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

    //�رհ�ť
    $(".orderclose").click(function(){
        $(this).parents(".orderbox").hide();
    });
    $(".orderzhezhao").click(function(){
        $(this).parents(".orderbox").hide();
    });
    $(".queding").click(function(){
        $(this).parents(".orderbox").hide();
    });

    //预约试听点击弹出事件
    $(".yuyueshiting_btu_js").click(function(){
        $(".orderbox").show().css('height',$(document).height());
        $(".orderconbox").show();
        $(".goxinbox").hide();
        $(".name-input").val("");
        $(".phone-input").val("");
        $(".orderbox .orderconbox .formbox>li").removeClass('error');
        $('.inputbox-left1>img').attr('src','../images_new/indexImages_new/corder/name-grey.png');
        $('.inputbox-left2>img').attr('src','../images_new/indexImages_new/corder/phone-grey.png');
    });

    //������keydown�¼�
    $('.name-input').keydown(function(e){
        if(e.keyCode==13){
            var name = $(".name-input").val();
            if (name == "") {
                var parent=$(".name-input").parents('li');
                parent.addClass('error');
                parent.find('.inputbox-left>img').attr('src','../images_new/indexImages_new/corder/name-red.png');
                parent.find('.inputerror').html('姓名不能为空!');
                return false;
            }else{
                var parent=$(".name-input").parents('li');
                parent.removeClass('error');
                parent.find('.inputbox-left1>img').attr('src','../images_new/indexImages_new/corder/name-grey.png');
                parent.find('.inputerror').html('');
                $(".phone-input").focus();
            }
        }
    });
    $('.phone-input').keydown(function(e){
        if(e.keyCode==13){                                  //�س��¼�
            var mobile = $(".phone-input").val();
            if (mobile == "") {
                var parent=$(".phone-input").parents('li');
                parent.addClass('error');
                parent.find('.inputbox-left2>img').attr('src','../images_new/indexImages_new/corder/phone-red.png');
                parent.find('.inputerror').html('手机号码不能为空!');
                $(".phone-input").focus();
                return false;
            }else{
                var re = /^1[3|5|7|8|][0-9]{9}$/;
                if (!re.test(mobile)) {
                    var parent=$(".phone-input").parents('li');
                    parent.addClass('error');
                    parent.find('.inputbox-left>img').attr('src','../images_new/indexImages_new/corder/phone-red.png');
                    parent.find('.inputerror').html('请输入有效的手机号码!');
                    $(".phone-input").val("");
                    $(".phone-input").focus();
                    return;
                }else{
                    var parent=$(".phone-input").parents('li');
                    parent.removeClass('error');
                    parent.find('.inputbox-left>img').attr('src','../images_new/indexImages_new/corder/phone-grey.png');
                    parent.find('.inputerror').html('');
                }
            }
            //$("#form1").submit();
            $(".name-input").val("");
            $(".phone-input").val("");

            $.ajax({
                type: "POST",
                url: "http://w.gogo-talk.com/api/order/RegisterUser",
                data: { Mobile: mobile, Name: name },
                dataType: "json",
                success: function (data) {
                    if (data.Return == 1) {
                        $(".orderconbox").hide();
                        $(".goxinbox").show();
                    }
                }
            });
        }
    });

    //����ԤԼ�����
    $(".yuyuebtn").click(function () { //?��?��???����??????��????
        var name = $(".name-input").val();
        if (name == "") {
            var parent=$(".name-input").parents('li');
            parent.addClass('error');
            parent.find('.inputbox-left>img').attr('src','../images_new/indexImages_new/corder/name-red.png');
            parent.find('.inputerror').html('姓名不能为空!');
            $(".name-input").focus();
            return false;
        }else{
            var parent=$(".name-input").parents('li');
            parent.removeClass('error');
            parent.find('.inputbox-left1>img').attr('src','../images_new/indexImages_new/corder/name-grey.png');
            parent.find('.inputerror').html('');
        }
        var mobile = $(".phone-input").val();
        if (mobile == "") {
            var parent=$(".phone-input").parents('li');
            parent.addClass('error');
            parent.find('.inputbox-left2>img').attr('src','../images_new/indexImages_new/corder/phone-red.png');
            parent.find('.inputerror').html('手机号码不能为空!');
            $(".phone-input").focus();
            return false;
        } else {
            var re = /^1[3|5|7|8|][0-9]{9}$/;
            if (!re.test(mobile)) {
                var parent=$(".phone-input").parents('li');
                parent.addClass('error');
                parent.find('.inputbox-left>img').attr('src','../images_new/indexImages_new/corder/phone-red.png');
                parent.find('.inputerror').html('请输入有效的手机号码!');
                $(".phone-input").val("");
                $(".phone-input").focus();
                return;
            }else{
                var parent=$(".phone-input").parents('li');
                parent.removeClass('error');
                parent.find('.inputbox-left>img').attr('src','../images_new/indexImages_new/corder/phone-grey.png');
                parent.find('.inputerror').html('');
            }
        }
        //$("#form1").submit();
        $(".name-input").val("");
        $(".phone-input").val("");

        $.ajax({
            type: "POST",
            url: "http://w.gogo-talk.com/api/order/RegisterUser",
            data: { Mobile: mobile, Name: name },
            dataType: "json",
            success: function (data) {
                if (data.Return == 1) {
                    $(".orderconbox").hide();
                    $(".goxinbox").show();
                }
            }
        });


    });
});