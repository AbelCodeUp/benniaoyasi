/**
 * Created by Administrator on 2016/4/5.
 */
$().ready(function () {
    //获取客户端日期并格式化
    var myDate = new Date();
    var datetime = myDate.getFullYear() + "年" + ((myDate.getMonth() + 1) > 10 ? (myDate.getMonth() + 1) : "0"
        + (myDate.getMonth() + 1)) + "月" + (myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate
            .getDate()) + "日" + (myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate
            .getHours()) + "时" + (myDate.getMinutes() < 10 ? "0" + myDate.getMinutes() : myDate
            .getMinutes()) + "分" + (myDate.getSeconds() < 10 ? "0" + myDate.getSeconds() : myDate
            .getSeconds()) + "秒";

    var starttime = "2016年12月22日00时00分00秒";
    var endtime = "2016年12月27日00时00分00秒";
    //判断日期
    if (datetime > starttime && endtime > datetime) {
        $("#banner").hide();
        $("body").prepend('<div id="banner2" class="smy_wapper smy_1223_page1"><img class="smy_1223_logo" src="/images_m_1212/ch/logo.png"><img class="smy_1223_bannerz1" src="/images_m_1212/ch/old.png"><img class="smy_1223_bannerz2" src="/images_m_1212/ch/ling.png"><img class="smy_1223_bannerz3" src="/images_m_1212/ch/yuan.png"></div>');
    } else {
        $("#banner").show();
    }
});
