/**
 * Created by c on 2017/5/5.
 */
jQuery.extend({
    jAlert:function(texts,type){
        type = type || "error";
        if(!$("body>div").hasClass('phoneEbox')){
            if(type=='error'){
                $('<div class="phoneEboxbig"><div class="phoneEbox"><div class="phoneEzhezhao"></div><div class="phoneE"><div class="phoneEimg"><img src="../images_new/indexImages_new/corder/error.png" alt=""></div><span class="phoneEp">'+texts+'</span></div></div></div>').appendTo('body');
            }else if(type=='success'){
                $('<div class="phoneEboxbig"><div class="phoneEbox"><div class="phoneEzhezhao"></div><div class="phoneE"><div class="phoneEimg"><img src="../images_new/indexImages_new/corder/success.png" alt=""></div><span class="phoneEp">'+texts+'</span></div></div></div>').appendTo('body');
            }
            $(".phoneEbox").css('height',$("document").height())
            $(".phoneE").css("width",$(".phoneEp").width()+73)
            $(".phoneEbox").fadeIn(300).delay(2000).fadeOut(300,function () {
                $(".phoneEboxbig").empty()
            });
            $("input#search_ord_161026").val("");
        }
    }
});