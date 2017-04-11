$(function() {
    /* 导航点击*/
    $(".philippines_nav_rel li").click(function() {
        $(".philippines_nav_rel li").last().removeClass("curr");
        $(this).addClass("curr").siblings().removeClass("curr");
    });
    $(".philippines_nav_rel li").eq(0).click(function() {
        var gouzi_t = $('#contact').offset().top - 120;
        $('html, body').animate({
            scrollTop: gouzi_t + "px"
        }, 600);
    });
    $(".philippines_nav_rel li").eq(1).click(function() {
        var gouzi_t = $('#career').offset().top - 60;
        $('html, body').animate({
            scrollTop: gouzi_t + "px"
        }, 600);
    });
    $(".philippines_nav_rel li").eq(2).click(function() {
        var gouzi_t = $('#aboutus').offset().top - 120;
        $('html, body').animate({
            scrollTop: gouzi_t + "px"
        }, 600);
    });
    $(".philippines_nav_rel li").eq(3).click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
    });
    $(".philippines_navbtu").click(function() {
        var gouzi_t = $('#apply').offset().top - 60;
        $('html, body').animate({
            scrollTop: gouzi_t + "px"
        }, 600);
    });

    /*滚动条*/
    window.onscroll = function() {
        var gouzi_t1 = $('#contact').offset().top - 200;
        var gouzi_t2 = $('#career').offset().top - 200;
        var gouzi_t3 = $('#aboutus').offset().top - 300;
        var gouzi_t4 = $('#apply').offset().top - 60;
        if ($(window).scrollTop() > gouzi_t3 && $(window).scrollTop() < gouzi_t2) { //垂直滚动条钓offset 大于90时。
            $(".philippines_nav_rel li").eq(2).addClass("curr").siblings().removeClass("curr");
        } else if ($(window).scrollTop() > gouzi_t2 && $(window).scrollTop() < gouzi_t1) {
            $(".philippines_nav_rel li").eq(1).addClass("curr").siblings().removeClass("curr");
        } else if ($(window).scrollTop() > gouzi_t1 && $(window).scrollTop() < gouzi_t4) {
            $(".philippines_nav_rel li").eq(0).addClass("curr").siblings().removeClass("curr");
        } else if ($(window).scrollTop() > gouzi_t4) {
            $(".philippines_nav_rel li").removeClass("curr");
        } else {
            $(".philippines_nav_rel li").eq(3).addClass("curr").siblings().removeClass("curr");
        }
    };


    /*职位点击*/
    $(".philippines_career_item_list dl").click(function() {
        $(this).addClass("curr").siblings().removeClass("curr");
        var philippines_career_item_list_eq = $(this).index();
        $(".philippines_career_item_rel").eq(philippines_career_item_list_eq).addClass("curr").siblings().removeClass("curr");
    });


    /*上下箭头点击*/
    $(".philippines_career_pre").click(function() {
        var philippines_career_item_list_now = $(".philippines_career_item_list dl.curr").index() - 1;
        if (philippines_career_item_list_now < 0) {
            philippines_career_item_list_now = 6;
        }
        $(".philippines_career_item_list dl").removeClass("curr").eq(philippines_career_item_list_now).addClass("curr");
        $(".philippines_career_item_rel").removeClass("curr").eq(philippines_career_item_list_now).addClass("curr");
    });
    $(".philippines_career_nex").click(function() {
        var philippines_career_item_list_now = $(".philippines_career_item_list dl.curr").index() + 1;
        if (philippines_career_item_list_now > 6) {
            philippines_career_item_list_now = 0;
        }
        $(".philippines_career_item_list dl").removeClass("curr").eq(philippines_career_item_list_now).addClass("curr");
        $(".philippines_career_item_rel").removeClass("curr").eq(philippines_career_item_list_now).addClass("curr");
    });

    /*职位按钮点击*/
    $("#car_btu").click(function() {
        var gouzi_t = $('#apply').offset().top - 60;
        $('html, body').animate({
            scrollTop: gouzi_t + "px"
        }, 600);
        var philippines_career_item_list_now = $(".philippines_career_item_list dl.curr").index();
        $("#philippines_apply_select option").eq(philippines_career_item_list_now).attr('selected', true);
    });


    /*提交函数*/
    jQuery.submit_phili = function() {
        /*姓名非空*/
        var first_name = $("#first_name").val();
        if (first_name == "") {
            alert("Please enter your first name");
            return false;
        }
        var last_name = $("#last_name").val();
        if (last_name == "") {
            alert("Please enter your last name");
            return false;
        }
        /*验证邮箱*/
        var email = $("#email").val();
        if (email == "") {
            alert("Please enter your email");
            return false;
        } else {
            var bValidate = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            if (!bValidate.test(email)) {
                alert("Please enter a valid email address");
                $("#email").val("");
                return false;
            }

        }
        /*电话验证*/
        var mobile = $("#mobile").val();
        if (mobile == "") {
            alert("Please enter your phone number");
            return false;
        } else if (mobile.length < 10) {

            alert("Please enter a valid phone number");
            return false;
        }
        /*简历*/
        var cv = $("#upfile").val();
        if (cv == "") {
            alert("Please upload your resume");
            return false;
        }
        var pos = $("#philippines_apply_select").val();

        // $.ajax({
        //     type:'POST',
        //     data:{'Position':pos,'FirstName':first_name,'LastName':last_name,'Email':email,'Mobile':mobile,'CV'}
        // })
        // $.ajax({
        //     url: "http://w.gogo-talk.com/api/HR/HRMessageSubmit",
        //     type: "post",
        //     data: {'Position':pos,'FirstName':first_name,'LastName':last_name,'Email':email,'Mobile':mobile,'CV':cv},
        //     enctype: 'multipart/form-data',
        //     success: function(data) {
        //         alert("操作成功！");
        //     },
        //     error: function(e) {
        //         alert("网络错误，请重试！！");
        //     }
        // });
        // alert(cv)
        $('#philippines_apply_form_rel').ajaxSubmit({  
            url: "http://w.gogo-talk.com/api/HR/HRMessageSubmit",
            type: "post",
            enctype: 'multipart/form-data',
            dataType: 'json',  
            success: function(data){
                alert(data);
            }
        });  
        //  $("#philippines_apply_form_rel").ajaxSubmit({
        //     success: function (data) {
        //         alert(data);
        //     },
        //     error: function (error) { alert(error); },
        //     url: 'http://w.gogo-talk.com/api/HR/HRMessageSubmit', /*设置post提交到的页面*/
        //     type: "post", /*设置表单以post方法提交*/
        //     dataType: "json" /*设置返回值类型为文本*/
        // });
        // $("#philippines_apply_form_rel").submit();

    };
    $('#first_name').keydown(function(e) {
        if (e.keyCode == 13) {
            $("#last_name").focus();
        }
    });
    $('#last_name').keydown(function(e) {
        if (e.keyCode == 13) {
            $("#email").focus();
        }
    });
    $('#email').keydown(function(e) {
        if (e.keyCode == 13) {
            $("#mobile").focus();
        }
    });

    /*职位按钮点击*/
    $("#philippines_apply_submit").click(function() {
        if ($('.gou_img').hasClass('gou_img_dis')) {} else {
            $.submit_phili();
        }
    });


    $(".gou").click(function() {
        $(".gou_img").toggleClass("gou_img_dis");
        if ($('.gou_img').hasClass('gou_img_dis')) {
            $("#philippines_apply_submit").css({
                background: "#666"
            });
        } else {
            $("#philippines_apply_submit").css({
                background: "#e50113"
            });
        }
    })
});