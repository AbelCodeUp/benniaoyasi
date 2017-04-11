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

    var starttime = "2017年02月11日00时00分00秒";
    var endtime = "2017年02月12日00时00分00秒";
    //判断日期
    if (datetime > starttime && endtime > datetime) {
        $(".banneryuanxiao").show();
        $(".banner170204").hide();
    } else {
        $(".banneryuanxiao").hide();
        $(".banner170204").show();
    }
});
