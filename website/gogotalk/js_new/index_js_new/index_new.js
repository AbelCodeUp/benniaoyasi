/**
 * Created by Administrator on 2016/10/26.
 */
$(function(){
    var koubeirel_new_161026=$(".koubeirel_new_161026").width();
    $(".koubeiover_page1_new_161026").width(koubeirel_new_161026);
    $(".koubeiover_page2_new_161026").width(koubeirel_new_161026);
    $(".koubeiover_new_161026").width(koubeirel_new_161026*2);
    $(".koubei_btuleft_new_161026").hide();
    $(".koubei_bturight_new_161026").click(function(){
        $(".koubei_btuleft_new_161026").show();
        $(this).hide();
        $(".koubeiover_new_161026").animate({left:-koubeirel_new_161026},600);
    });
    $(".koubei_btuleft_new_161026").click(function(){
        $(".koubei_bturight_new_161026").show();
        $(this).hide();
        $(".koubeiover_new_161026").animate({left:0},600);
    });

    $(".koubeiover_page1_new_161026 img").hover(function(){
        var zind=$(this).index();
        var zind2=zind+10;
        $(this).removeClass("zuoyouyidong").addClass("fangda").css({"z-index":zind2});
    },function(){
        var zind=$(this).index();
        $(this).removeClass("fangda").addClass("zuoyouyidong").css({"z-index":zind});
    });
    $(".koubeiover_page2_new_161026 img").hover(function(){
        var zind=$(this).index();
        var zind2=zind+10;
        $(this).removeClass("zuoyouyidong").addClass("fangda").css({"z-index":zind2});
    },function(){
        var zind=$(this).index();
        $(this).removeClass("fangda").addClass("zuoyouyidong").css({"z-index":zind});
    });
});