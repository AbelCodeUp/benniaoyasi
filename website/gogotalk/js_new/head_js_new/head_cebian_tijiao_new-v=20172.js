/**
 * Created by Administrator on 2016/10/26.
 */
/* ˮӡЧ�� �����¼�*/
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
    /*�����ǵ��÷���*/
    $.focusblur(".search_ord_161026");
});


function mySubmit(flag){  
		return flag;  
	}

/* ����� */
$(function () {
    $(".cebianlan_161025_red").hover(function(){
        $(this).stop().animate({"right":0},400);
    }, function () {
        $(this).stop().animate({"right":"-148px"},400);
    });

    $(".cebianlan_161025_blue").hover(function(){
        $(this).stop().animate({"right":0},400);
        $(".cebianlan_161025_blue_form").show();
    }, function () {
        $(".cebianlan_161025_blue_form").hide();
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
	$("#cebianlan_161025_blue_form").submit(function(){  
		var mobile= $("input#search_ord_161026").val();
			if (mobile== "") {
				return false;
			}else{
				var re = /^1[3|5|7|8|][0-9]{9}$/;
				if (!re.test(mobile)) {
					alert("��������Ч���ֻ����룡");
					return mySubmit(false);  
				}else{
					 return mySubmit(true);  
				}
			}
	});  
    $(".search_ord_161026_button").click(function () { //��ť�����¼�
        $("#cebianlan_161025_blue_form").submit();
    });
});


/* ԤԼ���� */
$(function(){
    //���ֲ�
    var bodyH=$(window).height();
    $(".yuyuezhezhao_new_161026").height(bodyH);

    //�رհ�ť
    $(".yuyueshiting_new_161026_close").click(function(){
        $(this).parents(".shitingbox_new_161026").hide();
    });
    $(".yuyueshiting_new_161026_btu2").click(function(){
        $(this).parents(".shitingbox_new_161026").hide();
    });

    //ԤԼ������������¼�
    $(".yuyueshiting_btu_js").click(function(){
        $(".yuyueshiting_box1_new_161026").show();
    });

    //������keydown�¼�
    $('.yuyuezhezhao_new_161026_form_name').keydown(function(e){
        if(e.keyCode==13){                                  //�س��¼�
            $(".yuyuezhezhao_new_161026_form_tel").focus();
        }
    });
    $('.yuyuezhezhao_new_161026_form_tel').keydown(function(e){
        if(e.keyCode==13){                                  //�س��¼�
            var name = $("input#yuyuezhezhao_new_161026_form_name").val();
            if (name == "") {
                return false;
            }
            var mobile = $("input#yuyuezhezhao_new_161026_form_tel").val();
            if (mobile == "") {
                return false;
            }else{
                var re = /^1[3|5|7|8|][0-9]{9}$/;
                if (!re.test(mobile)) {
                    alert("��������Ч���ֻ����룡");
                    return;
                }
            }
            //$("#form1").submit();
            $("input#yuyuezhezhao_new_161026_form_name").val("");
            $("input#yuyuezhezhao_new_161026_form_tel").val("");
			var sources = '����ע��';
            $.post("http://www.gogo-talk.com/api.php?c=index&a=sources_tel", { name: name, mobile: mobile, sources:sources},function(data) {
	            
                if(data == 1){
                    $(".yuyueshiting_box1_new_161026").hide();
                    $(".yuyueshiting_box2_new_161026").show();
                }
            });
        }
    });

    //�������ύ�¼�
    $("#yuyueshiting_new_161026_btu").click(function () { //���ύ����ť�����¼�
        var name = $("input#yuyuezhezhao_new_161026_form_name").val();
            if (name == "") {
                return false;
            }
            var mobile = $("input#yuyuezhezhao_new_161026_form_tel").val();
            if (mobile == "") {
                return false;
            }else{
                var re = /^1[3|5|7|8|][0-9]{9}$/;
                if (!re.test(mobile)) {
                    alert("��������Ч���ֻ����룡");
                    return;
                }
            }
            //$("#form1").submit();
            $("input#yuyuezhezhao_new_161026_form_name").val("");
            $("input#yuyuezhezhao_new_161026_form_tel").val("");
			var sources = '����ע��';
            $.post("http://www.gogo-talk.com/api.php?c=index&a=sources_tel", { name: name, mobile: mobile, sources:sources },function(data) {
	            
                if(data == 1){
                    $(".yuyueshiting_box1_new_161026").hide();
                    $(".yuyueshiting_box2_new_161026").show();
                }
            });

    });
});