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

     var endtime = "2017年04月08日00时00分00秒";
     var easter_start = "2017年04月16日00时00分00秒";
     var easter_end = "2017年04月17日00时00分00秒";
    //判断日期
    if (datetime>endtime) {
        $(".banner170407").show();
        $(".banner170401").hide();
    } else {
        $(".banner170407").hide();
        $(".banner170401").show();
    }
	if (datetime>easter_start&&datetime<easter_end) {
        $(".easter_tanchuang").show();
    } else {
        $(".easter_tanchuang").hide();
    }
	
});
