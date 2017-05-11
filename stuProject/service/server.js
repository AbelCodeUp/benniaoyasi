var httpService = angular.module('httpService',['ngCookies'])

function getCookie(param_cookie) {
    var cookies = {},
                cookieArr = param_cookie.split(';'),
                currentCookie = '';

    for (var i = 0; i < cookieArr.length; i++) {
        currentCookie = cookieArr[i];
        if (currentCookie) {
            cookies[currentCookie.split('=')[0].trim()] = currentCookie.split('=')[1].trim();
        }
    }
    return cookies;
}

	/** 通用http服务 **/
httpService.factory('httpService', function ($http,$rootScope,$cookies) {
    return {
        post: function (url, data, timeout) {

            return $http({
                method: 'post',
                url: url,
                data: $.param(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    ,'Authorization': $cookies.get('tonken')
                },
                timeout: timeout
            });
        },
        get: function (url, data, timeout) {
            return $http({
                method: 'get',
                url: url,
                params: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                   ,'Authorization':$cookies.get('tonken')
                },
                timeout: timeout
            })
              
        }
    };
});
	/** login register http服务 **/
httpService.factory('loginService', function ($http,$cookies) {
    return {
        post: function (url, data, timeout) {
            return $http({
                method: 'post',
                url: url,
                data: $.param(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                timeout: timeout
            });
        },
        get: function (url, data, timeout) {

            return $http({
                method: 'get',
                url: url,
                params: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                timeout: timeout
            });
        }
    };
});
/*判断登录状态*/
httpService.factory('isLoginState', function($cookies){
	return {
		isSave:function(){
            var user = {};
            user.username = $cookies.get('username');
            user.password = $cookies.get('password');
            user.btnstaus = $cookies.get('btnstaus');
            return user;
        }
	}
})
// 判断登录是否过期
httpService.factory('isGuoQi', function($cookies){
    return {
        isGuoQi:function(){
            if($cookies.get('isGuoQi')){
                return true;
            }else{
                return false;
            }
        }
    }
})

/**  通用页面之间参数传递  **/
httpService.factory('sendParam', function ($cookies) {
    //定义服务返回对象
    var paramService = {};
    //定义参数设置对象
    var paramsObj = {};

    //定义设置参数的set函数
    var _set = function (data) {
        paramsObj = data;
    };
    //定义获取参数的get函数
    var _get = function () {
        return paramsObj;
    };

    paramService.set = _set;
    paramService.get = _get;

    return paramService;

});
// 下拉无限滚动（暂不用）
httpService.factory('Reddit', function($http, $cookies) {

  // return Reddit;
  var Reddit = function(date,time,sex) {

        this.items = [];
        this.busy = false;
        this.pageIndex = 1;
        this.pageSize = 24;
        this.sex = sex;
        this.time = time;
        this.date = date;
  };

  Reddit.prototype.nextPage = function() {

    if (this.busy) return;
        this.busy = true;
      $http({
        method:'GET',
        url:_AjaxURL.GetPageTeacherLesson,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
            ,'Authorization':$cookies.get('tokien')
        },
        params:{
            'pageIndex':this.pageIndex,
            'pageSize':this.pageSize,
            'bookingId':1,
            'sex':this.sex,
            'date':this.date,
            'time':this.time
        }
    }).success(function(data) {
      if(data.result == 1){
        var dataAttr = data.data;
         for (var i = 0; i < dataAttr.length; i++) {
              this.items.push(dataAttr[i]);
        }
      }
       
        this.busy = false;
        this.pageIndex += 1;
        
    }.bind(this));
  };

  return Reddit;
});
// 判断移动端
httpService.service('mobile',function(){
    this.isMobile = function(){
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
           //苹果端
            $('.Learning-Record').css('background-size','14%');
           return false;
        } else {
           //pc端
           return true;
        }
    }
})
