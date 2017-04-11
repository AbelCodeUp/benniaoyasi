/* Start of 前端与服务端基本基本路径配置 */

//	本地路径配置
var FED_BaseUrl = 'http://localhost/';
var Server_BaseUrl = 'http://learnapi.gogo-talk.com:9332/';

if (location.href.indexOf("http://test.com/") >= 0) {
    //	测试服务器路径配置
    FED_BaseUrl = "http://test.com/";
    Server_BaseUrl = 'http://test.com/server/';
}
if (location.href.indexOf("http://form.com/") >= 0) {
    //	正式服务器路径配置
    FED_BaseUrl = "http://form.com/";
    Server_BaseUrl = 'http://form.com/server/';
}
/* End of 前端与服务端基本基本路径配置 */

/* Start of AJAX 请求接口路径 */
var _AjaxURL = {
    // 点击关注老师
    'Attention': Server_BaseUrl + "api/Attention/Attention"
    // 点击取消关注老师
    ,'DeleteAttention': Server_BaseUrl + "api/Attention/DeleteAttention"
    // 引导
    ,'UpdateIsShowGuide': Server_BaseUrl + "api/User/UpdateIsShowGuide"
    //  关注老师对应的课程
    ,'GetTeacherFollow': Server_BaseUrl + "api/Teacher/GetTeacherFollow"
    //关注老师
    ,'GetTearcherList': Server_BaseUrl + "api/Lesson/GetTearcherList"
    /*登录*/
    ,'login': Server_BaseUrl + "api/User/Login"
	, 'login_out': Server_BaseUrl + "api/User/LoginOut"
    /*注册*/
	, 'AddUser': Server_BaseUrl + 'api/User/AddUser'
    , 'chagePwd': Server_BaseUrl + 'api/User/ChangePwdByCode'
    , 'sendCode': Server_BaseUrl + 'api/User/SendChangePwdSMS'
    /*服务器时间*/
    ,'serverTime': Server_BaseUrl + 'api/User/GetBeijingDate'
    ,'GetMyLesson': Server_BaseUrl + 'api/Lesson/GetMyLesson'

    /*预约老师*/
	,'GetPageTeacherLesson': Server_BaseUrl + 'api/Lesson/GetPageTeacherLesson'
    
    ,'ChangePwdByOldPwd': Server_BaseUrl + 'api/User/ChangePwdByOldPwd'
    
    , 'GetStuLearnPage': Server_BaseUrl + 'api/Lesson/GetStuLearnPage'
    //获取教材
    , 'GetList': Server_BaseUrl + 'api/Booking/GetList'
    //章节预约
    , 'AddLesson': Server_BaseUrl + 'api/Lesson/AddLesson'
    //预约下一节
    , 'AddNextLesson': Server_BaseUrl + 'api/Lesson/AddNextLesson'
    //报告列表
    , 'GetReportsList': Server_BaseUrl + 'api/Booking/GetReportsList'
    //进入教室
    , 'StuEnterRoom': Server_BaseUrl + 'api/Lesson/StuEnterRoom'
    //取消约课
    , 'DelLesson': Server_BaseUrl + 'api/Lesson/DelLesson'


    // GET获取课程统计信息 说英语时间 迟到 缺勤统计
    , 'GetLessonStatistics': Server_BaseUrl + 'api/Home/GetLessonStatistics'
    // Get 总课时
    ,'GetZongLessonTime': Server_BaseUrl + 'api/Home/GetZongLessonTime'
    //首页最近一次上课
    ,'GetLastAndLessonLesson': Server_BaseUrl + 'api/Home/GetLastAndLessonLesson'
    //获取推荐老师
    ,'GetHotTeacher': Server_BaseUrl + 'api/Home/GetHotTeacher'
    //获取右侧信息
    ,'GetState': Server_BaseUrl + 'api/Home/GetState'
    //课后评价
    ,'AddTeacherTag': Server_BaseUrl + 'api/Teacher/AddTeacherTag'
    //获取老师标签
    ,'GetTagList': Server_BaseUrl + 'api/Teacher/GetTagList'
    //随堂笔记
    ,'GetLastNotes': Server_BaseUrl + 'api/Home/GetLastNotes'
    //发送个人信息
    ,'UpdateStudentInfo': Server_BaseUrl + 'api/User/UpdateStudentInfo'
    //学生信息绑定
    ,'GetStudentInfo': Server_BaseUrl + 'api/User/GetStudentInfo'
    //老师星级评分
    ,'CommentTeacher': Server_BaseUrl + 'api/Teacher/CommentTeacher'
    //周报详情
    ,'GetWeekReportInfo': Server_BaseUrl + 'api/Booking/GetWeekReportInfo'
    //教师列表
    ,'GetDetailTeacherList': Server_BaseUrl + 'api/Teacher/GetDetailTeacherList'
    //老师评价
    ,'GetTeacherComment': Server_BaseUrl + 'api/Home/GetTeacherComment'

    ,'StuEnterDebug': Server_BaseUrl + 'api/Lesson/StuEnterDebug'
    //学员详情
    ,'GetInfo': Server_BaseUrl + 'api/Teacher/GetInfo'

};
/* End of AJAX 请求接口路径 */


