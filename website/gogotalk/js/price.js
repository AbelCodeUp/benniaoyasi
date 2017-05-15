/**
 * Created by Administrator on 2016/4/25.
 */
$(function(){
    $(".rel_nav_0425 li:eq(3)").addClass("current_0426");
    $(".rel_nav_0425 li").hover(function () {
        $(this).addClass("current_0426").siblings().removeClass("current_0426");
    }, function () {
        $(".rel_nav_0425 li:eq(3)").addClass("current_0426").siblings().removeClass("current_0426");
    });
    if ((navigator.userAgent.indexOf('MSIE') >= 0)
        && (navigator.userAgent.indexOf('Opera') < 0)){
        $(".btu2_0426").hover(function(){
            $(this).addClass("btu_0426_hover2");
        },function(){
            $(this).removeClass("btu_0426_hover2");
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
        $(".btu2_0426").hover(function(){
            $(this).addClass("btu_0426_hover2");
        },function(){
            $(this).removeClass("btu_0426_hover2");
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
   // $(".banner_0512_au2").animate({top:"299px",right:"-400px"},300).animate({top:"40px", right:"0"},4000);
    //$(".jishi").animate({top:"-399px"},200).animate({top:"0"},400).animate({top:"-30"},100).animate({top:"0"},100);


     /* ajax */
    $("#buy_queren_zhifubao").click(function () { //“提交”按钮单击事件
	    if($('.duigou i').hasClass('display_duigou')){
		}else{
	        var mobile = $("#shoujihaoma").val();
	        if (mobile == null) {
	            return false;
	        }else{
	            var re = /^1[3|5|7|8|][0-9]{9}$/;
	            if (!re.test(mobile)) {
	                $.jAlert("请输入有效的手机号码！");
	                $("#shoujihaoma").css({border:"1px solid red"});
	                return;
	            }
	        }
	        $("#sourceurl_buy").val(window.location.href);
	        $("#buy_form").submit();
	        $("input#beizhuxinxi").val("");
	        $("input#shoujihaoma").val("");
	        $("#shoujihaoma").css({border:"1px solid #333"});

         }
    });
    $("#buy_queren_weixin").click(function () { //“提交”按钮单击事件
        if($('.duigou i').hasClass('display_duigou')){
        }else{
            var mobile = $("#shoujihaoma").val();
            if (mobile == null) {
                return false;
            }else{
                var re = /^1[3|5|7|8|][0-9]{9}$/;
                if (!re.test(mobile)) {
                    $.jAlert("请输入有效的手机号码！");
                    $("#shoujihaoma").css({border:"1px solid red"});
                    return;
                }
            }
            $("#sourceurl_buy").val(window.location.href);
            var liuyan= $("#beizhuxinxi").val();
            $("#wx_shoujihaoma").val(mobile);
            $("#wx_beizhuxinxi").val(liuyan);
            $("#wx_buy_form").submit();
            $("input#wx_beizhuxinxi").val("");
            $("input#wx_shoujihaoma").val("");
            $("#shoujihaoma").css({border:"1px solid #333"});

        }
    });
    //块钱支付
    $("#buy_queren_kuaiqian").click(function () { //“提交”按钮单击事件
        
        if($('.duigou i').hasClass('display_duigou')){
        }else{
	        
            var mobile = $("#shoujihaoma").val();
            if (mobile == null) {
                return false;
            }else{
                var re = /^1[3|5|7|8|][0-9]{9}$/;
                if (!re.test(mobile)) {
                    $.jAlert("请输入有效的手机号码！");
                    $("#shoujihaoma").css({border:"1px solid red"});
                    return;
                }
            }
            $("#sourceurl_buy").val(window.location.href);
            var liuyan= $("#beizhuxinxi").val();
            //课程id
            var course_id = $("#wx_course_id").val();
            //手机号码
            $("#kq_shoujihaoma").val(mobile);
            //手机号码
            var kq_payerContact = mobile;
            
            //订单编号
            var kq_orderId = $("#kq_dingdanhaoma").val();
            
            //商品价格
            var kq_orderAmount = $("#kq_total_fee").val() * 100;
            
			//商品名称
            var kq_productName = $("#kq_shangpinmingcheng").val();
            
            //商品代码
            var kq_productId = kq_productName;
            
            
            //商品描述
            var kq_productDesc = $("#beizhuxinxi").val();
            
            
            $("#kq_beizhuxinxi").val(liuyan);
            //通过post获取认证信息
            $.post("/index.php?c=price&a=kq_setInfo2",{course_id:course_id,payerContact:kq_payerContact,orderId:kq_orderId,orderAmount:kq_orderAmount,productName:kq_productName,productId:kq_productId,productDesc:kq_productDesc},function(data){
	           // alert(data);

	            if(data != 0){
		            $("#kq_input").html(data);
		            //提交
		            $("#kq_buy_form").submit();
		            $("input#kq_beizhuxinxi").val("");
		            $("input#kq_shoujihaoma").val("");
		            $("#shoujihaoma").css({border:"1px solid #333"});
	            }else{
		            $.jAlert("订单已存在");
	            }

            });
            

        }
    });
    $(".duigou i").click(function(){
        $(this).toggleClass("display_duigou");
        if($('.duigou i').hasClass('display_duigou')){
            $("#buy_queren_zhifubao").css({background:"#666"});
            $("#buy_queren_weixin").css({background:"#666"});
            $("#buy_queren_kuaiqian").css({background:"#666"});
            //alert(000);
        }else{
            $("#buy_queren_zhifubao").css({background:"#fb5624"});
            $("#buy_queren_weixin").css({background:"#fb5624"});
            $("#buy_queren_kuaiqian").css({background:"#fb5624"});
        }
    });
});