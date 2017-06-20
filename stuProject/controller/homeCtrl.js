var homeCtrl = angular.module('homeCtrl', []);
homeCtrl.controller('homeCtrl', ['$scope', '$rootScope', 'isLoginState', 'httpService', '$cookies', 'mobile', function($scope, $rootScope, isLoginState, httpService, $cookies, mobile) {

		$rootScope.stepIsShow = true;



	}])
	//右侧
homeCtrl.controller('rightbarCtrl', ['$scope', '$rootScope', 'isLoginState', '$cookies', 'httpService', '$filter', function($scope, $rootScope, isLoginState, $cookies, httpService, $filter) {
	if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
		//苹果端
		$('.appraisal_allri2_top_smy').css({
			'background-size': '13%'
		});
	} else {
		$('.appraisal_allri2_top_smy').css('background-size', '34%');
	}
	//右边栏状态
	$rootScope.isComplete = $cookies.get('isComplete');

	$scope.chageTime = function() {
		$rootScope.showAlert('时间已更换', 1);
	}
	$scope.nohave = false;

	function GetHotTeacher() {

		httpService.get(_AjaxURL.GetHotTeacher, {

			})
			.success(function(res) {
				if (res.result == 1) {
					$scope.hotTeachers = res.data;
					if (res.data.length == 0) {
						$scope.nohave = true;
					}
				} else {
					$scope.nohave = true;
					layer.closeAll('loading')
				}
			})

	}



	//随堂笔记
	//	路由：Home
	//	方法名：GetTeacherComment
	//	参数： pageIndex 页码索引  pageSize 每页行数
	//	返回值：TchName 教师姓名 StartTime 上课时间 StuScore学生分数 Remark 教师评价

	function getTeacherComment() {
		$scope.noNote = false;
		httpService.get(_AjaxURL.GetTeacherComment, {
				'pageIndex': 1,
				'pageSize': 10
			})
			.success(function(res) {
				if (res.result == 1) {
					$scope.Comments = res.data;
					if (res.data.length == 0) {
						$scope.noNote = true;
					}
				} else {
					$scope.noNote = true;
				}

			})
	}

	function getRightState() {
		$scope.noBuyMeal = 0;
		httpService.get(_AjaxURL.GetState, {
				'isComplete': 1
			})
			.success(function(res) {
				if (res.result == 1) {
					var showData = res.data;
					//是否套餐
					if (showData.package.length > 0) {
						$scope.noBuyMeal = 1;
						$scope.package = showData.package[0];

						var eTime = $scope.package.ExpireTime.split(' ')[0];
						$scope.getDiffDay = DateDiff(eTime, $filter('date')($rootScope.serviceTime, 'yyyy-MM-dd'))

					} else {
						$scope.noBuyMeal = 0;
					}
					//学习时长字段
					$scope.fen = showData.fen;
					$scope.jinri = showData.jinri;
					$scope.lianxu = showData.lianxu;
					$scope.level = showData.level;

					//套餐


				} else if (res.result >= 1000) {
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
	//计算天数差的函数，通用  
	function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式
		var aDate, oDate1, oDate2, iDays
		aDate = sDate1.split("-")
		oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]) //转换为12-18-2006格式  
		aDate = sDate2.split("-")
		oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0])
		iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数  
		return iDays
	}

	$scope.fnInit = function() {
		GetHotTeacher();
		getRightState();
		getTeacherComment();
	};
	$scope.fnInit();

}])

//头部
homeCtrl.controller('headerCtrl', ['$scope', '$rootScope', '$cookies', 'httpService', '$timeout', function($scope, $rootScope, $cookies, httpService, $timeout) {
		
		if (!$cookies.get('tonken')) {
			$rootScope.$state.go('index.login');
		}

		// 收藏
		$scope.collect = function(url) {
				try {
					window.external.addFavorite(url, title);
				} catch (e) {
					try {
						window.sidebar.addPanel(title, url, "");
					} catch (e) {
						layer.msg("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加",{icon:2});
					}
				}
			}
			//用户名
		$rootScope.userName = $cookies.get('username');

		$rootScope.outLogin = function() {
			$cookies.remove('tonken');
			$cookies.remove('username');
			$cookies.remove('password');
			$cookies.remove('isComplete');

			$rootScope.$state.go('index.ggtlogin');
		}

		$scope.findPwdData = {

		};
		$scope.againPwd = {};
		$scope.isChageText = '确认修改';

		$scope.findpwd = function() {

			$('#isChageText').attr("disabled", true);

			$scope.isChageText = '正在修改...';
			httpService.post(_AjaxURL.ChangePwdByOldPwd, $scope.findPwdData)
				.success(function(res) {
					if (res.result == 1) {
						$('#isChageText').attr("disabled", false);
						$scope.isChageText = '修改成功';
						layer.msg(res.msg,{icon: 1});
						$('#custom-width-modal2').modal('hide');
						$('.modal-backdrop').hide();
						$timeout(function() {
							$scope.outLogin();
						}, 500);
					} else {
						layer.msg('原密码不正确',{
							icon: 2
						});
						$scope.isChageText = '确认修改';
						$('#isChageText').attr("disabled", false);
					}
				})
				.error(function(res) {
					layer.msg(res.msg,{
							icon: 2
						});
					$scope.isChageText = '确认修改';
					$('#isChageText').attr("disabled", false);
				})


		};


	}])
	//首页主区域
homeCtrl.controller('homeContentCtrl', ['$scope', '$rootScope', '$cookies', 'isLoginState', 'httpService', '$filter', 'mobile', function($scope, $rootScope, $cookies, isLoginState, httpService, $filter, mobile) {
	if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
		//苹果端
		$('.Learning-Record').css({
			'background-size': '14%'
		});
	} else {
		$('.Learning-Record').css('background-size', '20%');
	}
	$scope.firstIn = false;
	//右边栏显示隐藏
	if ($cookies.get('isTemp') == 1 && mobile.isMobile) {

		$('#mask3-1,#mask2-1,#mask1').show();
		$scope.firstIn = true;

	} else {
		
		$scope.firstIn = false;
		$('#mask3-1,#mask2-1,#mask1').hide();
		$('#step-btn2').hide();
		$('#step-btn3').hide();
		// $('#step-btn4').hide();

	}


	$scope.hideFun1 = function() {
		$scope.firstIn = false;
		$('#step-btn2').show();
		$('#step-btn3').hide();
		$('#step-btn4').hide();
	}

	$('#step-btn2').on('click', function() {
		$scope.firstIn = false;
		$('#step-btn2').hide();
		$('#step-btn3').show();
		// $('#step-btn4').hide();

		$('.slimscrollleft').css('overflow','visible');
		$('.slimScrollDiv').css('overflow','visible');
	})

	$('#step-btn3').on('click', function() {
		$(this).hide();

		$scope.firstIn = false;
		$('#step-btn2').hide();
		// $('#step-btn4').show();
		$rootScope.sendFun();
	})

	$rootScope.sendFun = function() {
			$('#step-btn2').hide();
			$scope.firstIn = false;
			$('#step-btn3').hide();
			// $('#step-btn4').hide();
			$('#mask3-1,#mask2-1,#mask1').hide();

			httpService.post(_AjaxURL.UpdateIsShowGuide, {})
				.success(function(res) {
					if (res.result == 1) {
						$cookies.put('isTemp', 0);
					} else {

					}
				})
				.error(function(res) {

				})
		}
		//首页提示
	$rootScope.isShowRightBar = true;

	// 退出登录
	$scope.outLogin = function() {

		$cookies.remove('tonken');
		$cookies.remove('username');
		$cookies.remove('isComplete');
		$rootScope.$state.go('index.login');
	}

	function getCookies(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	}



	//获取上课状态 
	function GetLessonStatistics() {
		httpService.get(_AjaxURL.GetLessonStatistics, {

			})
			.success(function(res) {
				if (res.result == 1) {
					var data = res.data;
					$scope.chi = data.chi;
					$scope.que = data.que;
					$scope.shuo = data.shuo;

				} else if (res.result >= 1000) {
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
	//获取上课总时间
	function GetZongLessonTime() {
		httpService.get(_AjaxURL.GetZongLessonTime, {

			})
			.success(function(res) {
				if (res.result == 1) {
					var data = res.data;
					$scope.sumKenshi = data.total;
					$scope.useKeshi = data.use;
					$scope.getKeshi = data.get;

					$scope.getBili = $scope.useKeshi / $scope.sumKenshi;
					if ($scope.useKeshi == 0 || $scope.sumKenshi == 0) {
						$scope.getBili = 0;
					} else {
						$scope.getBili = $scope.useKeshi / $scope.sumKenshi;
					}
				}

			})
	}

	function isEmptyObject(obj) {

		for (var key in obj) {
			return false
		};
		return true
	};

	$scope.underway = 1; //控制倒计时
	$scope.unbtn = 1; //控制按钮
	//最近一次课程记录
	$scope.kaikefont = '上课时间';
	$scope.classBtn = 1;
	$scope.pinjinBtn = true;

	$scope.preDataIsShow = true;
	$scope.nextDataIsShow = true;
	$rootScope.getClassDatail = function() {
		layer.load();
		$scope.isJoinClassRoom = false;
		httpService.get(_AjaxURL.GetLastAndLessonLesson, {

			})
			.success(function(res) {

				if (res.result == 1 && res.data != null) {
					if (!isEmptyObject(res.data.pre)) {
						$scope.preDataIsShow = true;
						$scope.preData = res.data.pre;
						if ($scope.preData.isComment == 0) {
							$scope.pinjin = false;
							$scope.pjText = '评价';
						} else if ($scope.preData.isComment == 1) {
							$scope.pinjin = true;
							$scope.pjText = '已评价';
						}


						// 左边
						// $scope.leftDate = new Date($scope.preData.date).getFullYear()< 2016 ? '-' : $scope.preData.date;
						// $scope.leftWeek = new Date($scope.preData.date).getFullYear()< 2016 ? '-' : $filter('weeks')($scope.preData.date);
						$scope.leftDate = $scope.preData.status == 0 ? '--' : $scope.preData.date;
						$scope.leftWeek = $scope.preData.status == 0 ? '' : $filter('weeks')($scope.preData.date);
						$scope.leftTime = $scope.preData.status == 0 ? '--' : $scope.preData.time + '-' + $scope.preData.etime;
						$scope.lessonStatue = $scope.preData.status == 0 ? '--' : $filter('status1')($scope.preData.lessonStatus);
						$scope.lessonName = $scope.preData.status == 0 || $scope.preData.lessonName == '' ? '--' : $scope.preData.lessonName;



					} else {
						$scope.preDataIsShow = false;
					}
					if (!isEmptyObject(res.data.next)) {
						$scope.nextData = res.data.next;

						if ($scope.nextData.ClassRoomType == 0) {
							$scope.classBtn = 1;
						} else {

							$scope.classBtn = $scope.nextData.ClassRoomType;
						}

						$scope.nextDataIsShow = true;
						if ($scope.nextData.status == 1) {
							// 右边课程
							$scope.startTime = $scope.nextData.startTime; //计算时间显示对应的按钮
							$scope.timeDiffDate = getDiffHour($scope.startTime);
							$scope.timeDiffDates = getDiffHour($scope.startTime) * 60;
							$scope.startClassTime = $scope.startTime.substr(0, $scope.startTime.lastIndexOf(':'));

							$scope.timeColor = false;

							if ($scope.timeDiffDate <= 720 && $scope.timeDiffDate > 0) {
								$scope.underway = 0;

								if ($scope.timeDiffDate <= 10 && $scope.timeDiffDate >= 0) {
									$scope.unbtn = 0;

								} else if ($scope.timeDiffDate > 10) {
									$scope.unbtn = 1;

								}

							} else if ($scope.timeDiffDate <= 0 && $scope.timeDiffDate >= -25) {
								$scope.underway = 1;
								$scope.kaikefont = '正在上课';
								$scope.unbtn = 0;

							} else if ($scope.timeDiffDate <= -25) {

								$scope.unbtn = 1;
								$scope.underway = 1;
							}
						}

					} else {
						$scope.nextDataIsShow = false;
					}

					layer.closeAll('loading')

				} else if (res.result >= 1000) {
					layer.closeAll('loading');
					$cookies.remove('tonken');
					$cookies.remove('username');
					$cookies.remove('isComplete');
					$cookies.remove('password');
					$cookies.remove('bookingId');
					// alert('登录时间太久，请重新登录');
					$rootScope.$state.go('index.login');
				} else {
					layer.closeAll('loading');
					$scope.leftDate = '--';
					$scope.leftWeek = '';
					$scope.leftTime = '--';
					$scope.lessonStatue = '--';
					$scope.lessonName = '--';
					$scope.pinjinBtn = false; //评价按钮
					$scope.nextDataIsShow = false;
				}

			})
	}

	function getDiffHour(time) {

		var newDate = new Date(time.replace(/-/g, '/'));
		var timeDiff = newDate.getTime() - $rootScope.serviceTime;
		return Math.floor(timeDiff / 1000 / 60);
	}
	//去选择老师
	$scope.goOrderTeacher = function() {
		_czc.push(['_trackEvent', '首页点击快速预约按钮', '点击', '首页点击快速预约按钮']);
		$rootScope.$state.go('home.orderteacher');
	}



	function homeInit() {
		GetLessonStatistics();
		GetZongLessonTime();
		$rootScope.getClassDatail();
	}
	//初始化首页
	homeInit();



}])

//左侧
homeCtrl.controller('leftbarCtrl', ['$scope', '$rootScope', '$cookies', 'isLoginState', 'httpService', '$interval', '$filter', 'mobile', function($scope, $rootScope, $cookies, isLoginState, httpService, $interval, $filter, mobile) {
	//服务器时间显示
	// $rootScope.intelTime = $interval(function(){
	// 	$rootScope.serviceTime += 1000; // 1490266727
	// },1000);
	// $('#step-btn1').show();


	dateString($rootScope.serviceTime);

	function dateString(time) {
		var str = "00:00:00";
		var nowDate = new Date(time);
		var hours = nowDate.getHours();
		var minutes = nowDate.getMinutes();
		var seconds = nowDate.getSeconds();
		var s, m, h;
		if (seconds < 10) {
			s = "0" + seconds;
		} else {
			s = seconds;
		}
		if (minutes < 10) {
			m = "0" + minutes;
		} else {
			m = minutes;
		}
		h = hours;
		str = h + ":" + m + ":" + s;
		var t = setInterval(function() {
			if (seconds >= 59) {
				seconds = -1;
				if (minutes >= 59) {
					minutes = -1;
					hours++;
					h = hours;
				}
				minutes++;
				if (minutes < 10) {
					m = "0" + minutes;
				} else {
					m = minutes;
				}
			}
			seconds++;
			if (seconds < 10) {
				s = "0" + seconds;
			} else {
				s = seconds;
			}
			str = h + ":" + m + ":" + s;

			$scope.thisServerTime = str;;
		}, 1000)
	}



	$rootScope.intelTime = $interval(function() {
		$rootScope.serviceTime += 1000; // 1490266727
	}, 1000);

	$scope.wins = mobile.isMobile();


}])