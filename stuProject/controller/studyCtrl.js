
var studyCtrl = angular.module('studyCtrl',[]);

    studyCtrl.controller('studyListCtrl',function($scope, $rootScope, $cookies, $filter, httpService, $http, $timeout){

       //右边栏显示隐藏
      $rootScope.isShowRightBar = false;
      $rootScope.studyIndex = 1;
      $scope.noData = false;
    	$rootScope.getStudyList = function (pageIndex){
        var index1 = layer.load();
	    	$scope.pageSize = 4;
	    	// $scope.stime = $filter('date')($rootScope.serviceTime,'yyyy-MM-dd');
	    	// var nextYear = new Date($rootScope.serviceTime).setFullYear(new Date($rootScope.serviceTime).getFullYear() + 1);

	    	// $scope.etime = $filter('date')(nextYear,'yyyy-MM-dd');
        $('#studyNo').hide(); 
	        httpService.get(_AjaxURL.GetStuLearnPage,{
	        	'pageIndex':pageIndex,
	        	'pageSize':$scope.pageSize,
	        	'stime':'2016-11-20',
	        	'etime':'2027-11-20'
	        })
        	.success(function(res){
          		if(res.result == 1){
                $('.studyList').show();
                if(res.data.length == 0 && pageIndex == 1){
                    $('#studyNo').show();
                    $('.studyList').hide();
                    
                }
       				$scope.studyLists = res.data;
          			jsonpage(res, pageIndex, $scope.pageSize);
                layer.close(index1);
          		}else if(res.result >= 1000){
                  layer.close(index1);
                  $cookies.remove('tonken');
                  $cookies.remove('username');
                  $cookies.remove('isComplete');
                  $cookies.remove('password');
                  $cookies.remove('bookingId');
                  // alert('登录时间太久，请重新登录');
                  $rootScope.$state.go('index.login');
              }
        		
        	})
    	}

      $http({
          method: 'get',
          url: _AjaxURL.serverTime,
          params: {},
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
              , 'Authorization': $cookies.get('tonken')
          }
      }).success(function (res) {
          if (res.result == 1) {
              $rootScope._serveTime = res.data.timestamp * 1000;
          }else if(res.result >= 1000){
              $cookies.remove('tonken');
              $cookies.remove('username');
              $cookies.remove('isComplete');
              $cookies.remove('password');
              $cookies.remove('bookingId');
              // alert('登录时间太久，请重新登录');
              $rootScope.$state.go('index.login');
          }

      })



      //取消约课
      $scope.DelLesson = function (lessonId){
        _czc.push(['_trackEvent', '学习记录页,取消课程', '点击', '学习记录页,取消课程']);
        layer.confirm('确定取消该节课程', {
          btn: ['确定','取消'] //按钮
        }, function(){
            var index = layer.load();
            httpService.get(_AjaxURL.DelLesson,{
                'lessonId':lessonId
            })
              .success(function(res){
                if(res.result == 1){
                  layer.close(index);
                    layer.msg('取消成功', {icon: 1});
                    $rootScope.getStudyList($rootScope.studyIndex);
                }else if(res.result >= 1000){
                    $cookies.remove('tonken');
                    $cookies.remove('username');
                    $cookies.remove('isComplete');
                    $cookies.remove('password');
                    $cookies.remove('bookingId');
                    // alert('登录时间太久，请重新登录');
                    $rootScope.$state.go('index.login');
                }
              })
          
        });
          

      }

      $scope.lookpj = function(e){
        
        var thisDom =$(e.target);
        $scope.tchName = thisDom.data('name');
        $scope.tchTime = thisDom.data('time');
        $scope.tchText = thisDom.data('remark');
        $scope.scoreStar = thisDom.data('score');
        $timeout(function(){
          $('#lookStar').raty({
            starOn   : 'lib/img/star-on.png',
            starOff  : 'lib/img/star-off.png',
            readOnly: true,
            score: function() {
                return $(this).attr('data-score');
            }
          });
        },100)
        
        $('#lookpj').modal('show');
      }
      // layerpage 
      function jsonpage(json, pageIndex, pageSize) {
         var coun = json.total;
         var pagecount = coun % pageSize == 0 ? coun / pageSize : coun / pageSize + 1;
         var laypageindex = laypage({
             cont: 'laypage', //容器。值支持id名、原生dom对象，jquery对象。
             skin: '#fb771f',
             pages: pagecount, //通过后台拿到的总页数
             curr: pageIndex, //初始化当前页
             first: '首页', //将首页显示为数字1,。若不显示，设置false即可
             last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
             prev: '上一页', //若不显示，设置false即可
             next: '下一页', //若不显示，设置false即可
             jump: function (obj, first) { //触发分页后的回调

                 if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                  $rootScope.studyIndex = obj.curr;
                     $rootScope.getStudyList($rootScope.studyIndex);
                 }
                 
             }
         });
     }
     $rootScope.getStudyList(1);


    });