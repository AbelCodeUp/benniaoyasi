/**
 * Created by Administrator on 2016/4/25.
 */
$(function(){
    $(".rel_nav_0425 li:eq(2)").addClass("current_0426");
    $(".rel_nav_0425 li").hover(function () {
        $(this).addClass("current_0426").siblings().removeClass("current_0426");
    }, function () {
        $(".rel_nav_0425 li:eq(2)").addClass("current_0426").siblings().removeClass("current_0426");
    });

    if ((navigator.userAgent.indexOf('MSIE') >= 0)
        && (navigator.userAgent.indexOf('Opera') < 0)){
        $(".btu_0426").hover(function(){
            $(this).addClass("btu_0426_hover2");
        },function(){
            $(this).removeClass("btu_0426_hover2");
        });
        $(".btu2_0426").hover(function(){
            $(this).addClass("btu2_0426_hover2");
        },function(){
            $(this).removeClass("btu2_0426_hover2");
        });
        $(".btu3_0426").hover(function(){
            $(this).addClass("btu_0426_hover2");
        },function(){
            $(this).removeClass("btu_0426_hover2");
        });
        $(".btu4_0426").hover(function(){
            $(this).addClass("btu_0426_hover2");
        },function(){
            $(this).removeClass("btu_0426_hover2");
        });
    }else if (navigator.userAgent.indexOf('Firefox') >= 0){
        $(".btu_0426").hover(function(){
            $(this).addClass("btu_0426_hover");
        },function(){
            $(this).removeClass("btu_0426_hover");
        });
        $(".btu2_0426").hover(function(){
            $(this).addClass("btu2_0426_hover");
        },function(){
            $(this).removeClass("btu2_0426_hover");
        });
        $(".btu3_0426").hover(function(){
            $(this).addClass("btu3_0426_hover");
        },function(){
            $(this).removeClass("btu3_0426_hover");
        });
        $(".btu4_0426").hover(function(){
            $(this).addClass("btu4_0426_hover");
        },function(){
            $(this).removeClass("btu4_0426_hover");
        })
    }else if (navigator.userAgent.indexOf('Opera') >= 0){
        $(".btu_0426").hover(function(){
            $(this).addClass("btu_0426_hover");
        },function(){
            $(this).removeClass("btu_0426_hover");
        });
        $(".btu2_0426").hover(function(){
            $(this).addClass("btu2_0426_hover");
        },function(){
            $(this).removeClass("btu2_0426_hover");
        });
        $(".btu3_0426").hover(function(){
            $(this).addClass("btu3_0426_hover");
        },function(){
            $(this).removeClass("btu3_0426_hover");
        });
        $(".btu4_0426").hover(function(){
            $(this).addClass("btu4_0426_hover");
        },function(){
            $(this).removeClass("btu4_0426_hover");
        })
    }else if (navigator.userAgent.indexOf('Chrome') >= 0){
        $(".btu_0426").hover(function(){
            $(this).addClass("btu_0426_hover");
        },function(){
            $(this).removeClass("btu_0426_hover");
        });
        $(".btu2_0426").hover(function(){
            $(this).addClass("btu2_0426_hover");
        },function(){
            $(this).removeClass("btu2_0426_hover");
        });
        $(".btu3_0426").hover(function(){
            $(this).addClass("btu3_0426_hover");
        },function(){
            $(this).removeClass("btu3_0426_hover");
        });
        $(".btu4_0426").hover(function(){
            $(this).addClass("btu4_0426_hover");
        },function(){
            $(this).removeClass("btu4_0426_hover");
        })
    }else if (navigator.userAgent.indexOf('Safari') >= 0){
        $(".btu_0426").hover(function(){
            $(this).addClass("btu_0426_hover");
        },function(){
            $(this).removeClass("btu_0426_hover");
        });
        $(".btu2_0426").hover(function(){
            $(this).addClass("btu2_0426_hover");
        },function(){
            $(this).removeClass("btu2_0426_hover");
        });
        $(".btu3_0426").hover(function(){
            $(this).addClass("btu3_0426_hover");
        },function(){
            $(this).removeClass("btu3_0426_hover");
        });
        $(".btu4_0426").hover(function(){
            $(this).addClass("btu4_0426_hover");
        },function(){
            $(this).removeClass("btu4_0426_hover");
        })
    }else{
        $(".btu_0426").hover(function(){
            $(this).addClass("btu_0426_hover2");
        },function(){
            $(this).removeClass("btu_0426_hover2");
        });
        $(".btu2_0426").hover(function(){
            $(this).addClass("btu2_0426_hover2");
        },function(){
            $(this).removeClass("btu2_0426_hover2");
        });
        $(".btu3_0426").hover(function(){
            $(this).addClass("btu_0426_hover2");
        },function(){
            $(this).removeClass("btu_0426_hover2");
        });
        $(".btu4_0426").hover(function(){
            $(this).addClass("btu_0426_hover2");
        },function(){
            $(this).removeClass("btu_0426_hover2");
        })
    }


    $(".banner_title_0512").animate({left:"2999px"},0).animate({left:"756px"},1000);
    $(".banner_xian_0512").animate({left:"2999px"},100).animate({left:"742px"},1000);
    $(".banner_div1_0512").animate({left:"2999px"},200).animate({left:"736px"},1000);
    $(".banner_div2_0512").animate({left:"2999px"},300).animate({left:"728px"},1000);
    $(".banner_div3_0512").animate({left:"2999px"},400).animate({left:"720px"},1000);
    $(".banner_div4_0512").animate({left:"2999px"},500).animate({left:"714px"},1000);
    $(".banner_div5_0512").animate({left:"2999px"},600).animate({left:"706px"},1000);
    $(".btu_0426").animate({left:"2999px"},700).animate({left:"692px"},1000);

});