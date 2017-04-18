/**
 * Created by Administrator on 2016/4/25.
 */
$(function(){
    var goodsId = null;
    getTdData();
    function getTdData(){
        $.ajax({
               type: "GET",
               url: "http://w.gogo-talk.com/api/order/GetGoodsList",
               dataType:'json',
               success: function(data){
                    if(data.Return == 1){
                        var tdData = data.data;
                        for(var i=0;i<tdData.length;i++){
                            var tdD = tdData[i];
                            var ClassHours  =tdD.ClassHours;
                            var GPrice = tdD.GPrice;
                            var ExpireDay = Math.floor(tdD.ExpireDay/30);
                            var tdStr = '<tr>'+
                                    '<td>'+ClassHours+'课时</td>'+
                                    '<td>'+GPrice+'元</td>'+
                                    '<td>'+ExpireDay+'个月</td>'+
                                    '<td class="dispaly_none"><div class="goodsBtn" data-bid="'+ tdD.GoodsId +'">购买</div></td>'+
                                '</tr>';
                            $('.table_0513 tbody').append(tdStr);
                        }
                    }
                },
                error:function(msg,textStatus){
                    console.log(msg)
                    console.log(textStatus)
                }
            });
    }
    $('.table_0513 tbody').on('click','.goodsBtn',function(){
        goodsId = $(this).data('bid');
        $.get("http://w.gogo-talk.com/api/order/GetNewOrderNum",{ 'GoodsId':goodsId },function(data){
                
            if(data.Return == 1){
                var buyData = data.data;
                $('#dingdanhaoma').val(buyData.OrderNUM);
                $("#wx_dingdanhaoma").attr("value",buyData.OrderNUM);
                $("#kq_dingdanhaoma").attr("value",buyData.OrderNUM);

                $('#shangpinmingcheng').val(buyData.GoodsName);
                $("#wx_shangpinmingcheng").val(buyData.GoodsName);
                $("#kq_shangpinmingcheng").val(buyData.GoodsName);

                $('#fukuanjine').val(buyData.DiscountAmount.toFixed(2)); 
                $("#wx_fukuanjine").val(buyData.DiscountAmount.toFixed(2));
                $("#kq_fukuanjine").val(buyData.DiscountAmount.toFixed(2));

                $("#buy_form_0516").show();
		        $("#xf_mb").show();
            }
        });
        
    })
    // 关闭弹窗
    $('.close2_0427').click(function(){
        funClose();
    })
    $('#xf_mb').click(function(){
        funClose();
    })

    function funClose(){
        $("#shoujihaoma").css({border:"1px solid #333"});
        $("#buy_form_0516").hide();
        $("#xf_mb").hide();
    }

    // 支付宝按钮
    $('#buy_queren_zhifubao').click(function(){
        
        payType(1);
        
    })
    // 微信按钮
    $("#buy_queren_weixin").click(function () { //“提交”按钮单击事件
        payType(2)
    });
    //快钱支付
    $("#buy_queren_kuaiqian").click(function(){
        var OrderNum = $('#dingdanhaoma').val();
        var GoodsId = goodsId;
        var GoodsName = $('#shangpinmingcheng').val();
        var Gprice = $('#fukuanjine').val();
        var Mobile;
        var Remarks = $('#beizhuxinxi').val();
        if($('.duigou i').hasClass('display_duigou')){
		}else{
	        Mobile = $("#shoujihaoma").val();
	        if (Mobile == null) {
	            return false;
	        }else{
	            var re = /^1[3|5|7|8|][0-9]{9}$/;
	            if (!re.test(Mobile)) {
	                alert("请输入有效的手机号码！");
	                $("#shoujihaoma").css({border:"1px solid red"});
	                return;
	            }
	        }
	        $("input#beizhuxinxi").val("");
	        $("input#shoujihaoma").val("");
	        $("#shoujihaoma").css({border:"1px solid #333"});
            var sendMsg = 'OrderNum='+OrderNum+'&GoodsId='+goodsId+'&GoodsName='+GoodsName+'&Gprice='+Gprice+'&Mobile='+Mobile+'&Remarks='+Remarks;

            window.location.href = 'http://112.126.86.35:8456/Send.aspx?'+ sendMsg;
        }
    })

    //支付
    function payType(type){
        var postUrl = 'http://w.gogo-talk.com/api/order/PostZhiFu';
        var ZhiFuType = type;
        var OrderNum = $('#dingdanhaoma').val();
        var GoodsId = goodsId;
        var GoodsName = $('#shangpinmingcheng').val();
        var Gprice = $('#fukuanjine').val();
        var Mobile;
        var Remarks = $('#beizhuxinxi').val();
        if($('.duigou i').hasClass('display_duigou')){
		}else{
	        Mobile = $("#shoujihaoma").val();
	        if (Mobile == null) {
	            return false;
	        }else{
	            var re = /^1[3|5|7|8|][0-9]{9}$/;
	            if (!re.test(Mobile)) {
	                alert("请输入有效的手机号码！");
	                $("#shoujihaoma").css({border:"1px solid red"});
	                return;
	            }
	        }
	        $("input#beizhuxinxi").val("");
	        $("input#shoujihaoma").val("");
	        $("#shoujihaoma").css({border:"1px solid #333"});
            $.post(postUrl,{'ZhiFuType':ZhiFuType,'OrderNum':OrderNum,'GoodsId':GoodsId,'GoodsName':GoodsName,'Gprice':Gprice,'Mobile':Mobile,'Remarks':Remarks},function(data){
                if(data.Return == 1){
                    if(type == 1){ 
                        window.location.href = data.data;
                    }else if(type == 2){

                        var wxImg = encodeURIComponent("wx=*" + data.data + "*&mon="+ Gprice +"&num="+ OrderNum +"&type=" + GoodsName + "");
                        window.location.href = "wxpay.html?" + wxImg;

                    }
                    // else if(type == 3){
                    //     var data = data.data;
                    //     $('#inputCharset').val(data.inputCharset);
                    //     $('#pageUrl').val(data.pageUrl);
                    //     $('#bgUrl').val(data.bgUrl);
                    //     $('#version').val(data.version);
                    //     $('#language').val(data.language);
                    //     $('#signType').val(data.signType)
                    //     $('#signMsg').val(data.signMsg);
                    //     $('#merchantAcctId').val(data.merchantAcctId);
                    //     $('#payerName').val(data.payerName);
                    //     $('#payerContactType').val(data.payerContactType);
                    //     $('#payerContact').val(data.payerContact);
                    //     $('#orderId').val(data.orderId);
                    //     $('#orderAmount').val(data.orderAmount);
                    //     $('#orderTime').val(data.orderTime);
                    //     $('#productName').val(data.productName);
                    //     $('#productNum').val(data.productNum);
                    //     $('#productId').val(data.productId);
                    //     $('#productDesc').val(data.productDesc);
                    //     $('#ext1').val(data.ext1);
                    //     $('#ext2').val(data.ext2);
                    //     $('#payType').val(data.payType);
                    //     $('#bankId').val(data.bankId);
                    //     $('#redoFlag').val(data.redoFlag);
                    //     // $('#pid').val(data.pid);

                    //     $('#kq_buy_form').submit();
                    // }
                    
                }else{
                    alert(data.data);
                }
            });
         }
    } 
        
    
    function fun(class_hour,id){
	    //alert(window.location.href);
        $.post("http://www.gogo-talk.com/index.php?c=course&a=getCourse",{'class_hour':class_hour,'id':id},function(data){
           //alert(data);
            data = eval('('+data+')');

            //$("#dingdanhaoma").val(data.out_trade_no);
            $("#dingdanhaoma").attr("value",data.out_trade_no);
            $("#wx_dingdanhaoma").attr("value",data.out_trade_no);
            $("#kq_dingdanhaoma").attr("value",data.out_trade_no);
            
            $("#out_trade_no").val(data.out_trade_no);
            $("#wx_out_trade_no").val(data.out_trade_no);
            $("#kq_out_trade_no").val(data.out_trade_no);
            
            $("#course_id").val(data.id);
            $("#wx_course_id").val(data.id);
            $("#kq_course_id").val(data.id);
            
            $("#shangpinmingcheng").val(data.subject);
            $("#wx_shangpinmingcheng").val(data.subject);
            $("#kq_shangpinmingcheng").val(data.subject);
            
            $("#subject").val(data.subject);
            $("#wx_subject").val(data.subject);
            $("#kq_subject").val(data.subject);
            
            $("#fukuanjine").val(data.total_fee);
            $("#wx_fukuanjine").val(data.total_fee);
            $("#kq_fukuanjine").val(data.total_fee);
            
            $("#total_fee").val(data.total_fee);
            $("#wx_total_fee").val(data.total_fee);
			$("#kq_total_fee").val(data.total_fee);
			
            $("#buy_form_0516").show();
			$("#xf_mb").show();
        });

    }
   

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