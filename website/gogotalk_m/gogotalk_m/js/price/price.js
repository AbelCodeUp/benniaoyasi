$(function () {
    var goodId;
    $(".price_table_p3").click(function () {
        $(".querendingdan").show();
        $(".yuyue_b").hide();
    });
    $(".close_pri").click(function () {
        $(".querendingdan").hide();
        $(".yuyue_b").show();
    });


    /*input值改变*/
    $(".div5 #shoujihaoma").keyup(function () {
        var mobile = $("input#shoujihaoma").val();
        var re = /^1[3|5|7|8|][0-9]{9}$/;
        if (re.test(mobile)) {
            $(".duigou2").show();
        } else {
            $(".duigou2").hide();
        }
    });
    $(".duigou").click(function () {
        $(".duigou i").toggleClass("duigou_i_dis");
        $(".buy_form div.btu4_0426").toggleClass("btu4_04262");
    });


    getTdData();
    function getTdData(){
        var lessonBox = $('#lessonBox');
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
                            '<td class="price_table_w1 price_table_p1">'+ClassHours+'</td>'+
                            '<td class="price_table_w2 price_table_p2">'+ExpireDay+'</td>'+
                            '<td class="price_table_w3 price_table_p3" data-bid="'+ tdD.GoodsId +'"><span class="yen">&yen;</span>'+GPrice+'<span class="pri_jiantou"></span></td>'+
                            '</tr>';
                        lessonBox.append(tdStr);
                    }
                }
            },
            error:function(msg,textStatus){
                console.log(msg);
                console.log(textStatus);
            }
        });
        lessonBox.on('click','.price_table_p3',function(){
            goodId = $(this).data('bid');
            $(".querendingdan").show();
            $(".yuyue_b").hide();

            $.get("http://w.gogo-talk.com/api/order/GetNewOrderNum",{ 'GoodsId':goodId },function(data){

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
    }
    $('#buy_queren_zhifubao').on('click',function(){
        payType(1);
    });
    //支付
    function payType(type){
        var postUrl = 'http://w.gogo-talk.com/api/order/PhonePostZhiFu';
        var ZhiFuType = type;
        var OrderNum = $('#dingdanhaoma').val();
        var GoodsId = goodId;
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

                }else{
                    alert(data.data);
                }
            });
        }
    }

});

