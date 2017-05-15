/**
 * Created by Administrator on 2016/10/26.
 */
/* Ë®Ó¡Ð§¹û ½¹µãÊÂ¼þ*/
$(document).ready(function () {
    //focusblur
    jQuery.focusblur = function (focusid) {
        var focusblurid = $(focusid);
        var defval = focusblurid.val();
        focusblurid.focus(function () {
            var thisval = $(this).val();
            if (thisval == defval) {
                $(this).val("");
                $(this).css({ color: '#19b955' });
            }
        });
        focusblurid.blur(function () {
            var thisval = $(this).val();
            if (thisval == "") {
                $(this).val(defval);
                $(this).css({ color: '#000' });
            }
        });
    };
    /*ÏÂÃæÊÇµ÷ÓÃ·½·¨*/
    $.focusblur(".search_ord_161026");
});




/* ²à±ßÀ¸ */
$(function () {
    $(".cebianlan_161025_red").hover(function () {
        $(this).stop().animate({ "right": 0 }, 400);
    }, function () {
        $(this).stop().animate({ "right": "-148px" }, 400);
    });

    $(".cebianlan_161025_blue").hover(function () {
        $(this).stop().animate({ "right": 0 }, 400);
        $(".cebianlan_161025_blue_form").show();
    }, function () {
        $(".cebianlan_161025_blue_form").hide();
        $(this).stop().animate({ "right": "-148px" }, 400);

    });
    $(".cebianlan_161025_green").hover(function () {
        $(".cebianlan_161025_green2").stop().animate({ "right": 0 }, 400);
        $(".cebianlan_161025_green1").hide();
    }, function () {
        $(".cebianlan_161025_green2").stop().animate({ "right": "-134px" }, 400);
        $(".cebianlan_161025_green1").show();


    });

    /* ²éÑ¯¶©µ¥ */
    $(".search_ord_161026_button").click(function () { //°´Å¥µ¥»÷ÊÂ¼þ
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
        if (e.keyCode == 13) {                                  //»Ø³µÊÂ¼þ
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


/* Ô¤Ô¼ÊÔÌý */
$(function () {
    //ÕÚÕÖ²ã
    var bodyH = $(window).height();
    $(".yuyuezhezhao_new_161026").height(bodyH);

    //¹Ø±Õ°´Å¥
    $(".yuyueshiting_new_161026_close").click(function () {
        $(this).parents(".shitingbox_new_161026").hide();
    });
    $(".yuyueshiting_new_161026_btu2").click(function () {
        $(this).parents(".shitingbox_new_161026").hide();
    });

    //Ô¤Ô¼ÊÔÌýµã»÷µ¯³öÊÂ¼þ
    $(".yuyueshiting_btu_js").click(function () {
        $(".yuyueshiting_box1_new_161026").show();
    });

    //µ¯´°±íµ¥keydownÊÂ¼þ
    $('.yuyuezhezhao_new_161026_form_name').keydown(function (e) {
        if (e.keyCode == 13) {                                  //»Ø³µÊÂ¼þ
            $(".yuyuezhezhao_new_161026_form_tel").focus();
        }
    });
    $('.yuyuezhezhao_new_161026_form_tel').keydown(function (e) {
        if (e.keyCode == 13) {                                  //»Ø³µÊÂ¼þ
            var name = $("input#yuyuezhezhao_new_161026_form_name").val();
            if (name == "") {
                return false;
            }
            var mobile = $("input#yuyuezhezhao_new_161026_form_tel").val();
            if (mobile == "") {
                return false;
            } else {
                var re = /^1[3|5|7|8|][0-9]{9}$/;
                if (!re.test(mobile)) {
                    $.jAlert("请输入正确的手机号");
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
    $("#yuyueshiting_new_161026_btu").click(function () { //¡°Ìá½»¡±°´Å¥µ¥»÷ÊÂ¼þ
        var name = $("input#yuyuezhezhao_new_161026_form_name").val();
        if (name == "") {
            return false;
        }
        var mobile = $("input#yuyuezhezhao_new_161026_form_tel").val();
        if (mobile == "") {
            return false;
        } else {
            var re = /^1[3|5|7|8|][0-9]{9}$/;
            if (!re.test(mobile)) {
                $.jAlert("请输入正确的手机号");
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