var orderTeacherCtrl = angular.module('orderTeacherCtrl', []);
//选择老师
orderTeacherCtrl.controller('orderTeacherCtrl', ['$scope', '$rootScope', '$cookies', 'httpService', 'isLoginState', '$filter', 'Reddit', '$http', '$timeout', function($scope, $rootScope, $cookies, httpService, isLoginState, $filter, Reddit, $http, $timeout) {
	$scope.isBuyMeal = false;

	if ($cookies.get('bookingId') > 0) {
		$scope.isBuyMeal = true;
	}

	//右边栏显示隐藏
	$rootScope.isShowRightBar = false;

	$scope.ALLState = true;
	//性别 男  xb = 1
	//bookID
	$scope.bookingId = $cookies.get('bookingId');
	//暂无数据
	$scope.noData = false;
	//选择的日期
	$scope.thisDay = $filter('date')($rootScope.serviceTime, 'yyyy-MM-dd');

	// 选择的时间
	$scope.thisTime = '';
	var nowTimeHour = $filter('date')($rootScope.serviceTime, 'HH:mm');

	if (time_range('00:00', '06:00', nowTimeHour)) {

		$scope.thisTime = '08:00';

	} else {

		$scope.thisTime = get2Hour();

	}


	function formatDate(data) {

		var _time = new Date($rootScope.serviceTime);
		_time.setHours(data);

		return $filter('date')(_time, 'HH');

	}


	$scope.getToDay = $filter('date')($rootScope.serviceTime, 'd');



	//URL
	$scope.teacherUrl = _AjaxURL.GetPageTeacherLesson;
	$scope.sexType = -1;

	// 选择老师
	$scope.weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];


	//初始化时间
	$scope.getDays = getDays($rootScope.serviceTime);
	//第一个参数传服务器时间
	$scope.allDays = getHours($rootScope.serviceTime, $rootScope.serviceTime);

	function getDays(serviceTime) {
		console.log(serviceTime)
		var daysAttr = [];
		for (var i = 0; i < 7; i++) {
			var days = new Date(serviceTime);
			days.setDate(days.getDate() + i);
			daysAttr.push({
				'day': days.getDate() < 10 ? '0' + days.getDate() : days.getDate(),
				'week': $scope.weeks[days.getDay()],
				'month': days.getMonth() + 1 < 10 ? '0' + (days.getMonth() + 1) : (days.getMonth() + 1),
				'times': days.getTime()
			})
		}
		return daysAttr;
	}
	GetBookList(); ////获取教材

	$scope.nextClassName = null;

	function GetBookList() {

		httpService.get(_AjaxURL.GetList, {

				'bookingId': $scope.bookingId

			})
			.success(function(res) {

				if (res.result == 1) {

					$scope.booklists = res.data;

					$scope.nextClassName = $scope.booklists[$scope.booklists.length - 1];

				} else if (res.result >= 1000) {
					layer.closeAll('loading')
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



	//判断上下午
	function getText(thisDay) {
		var _date = new Date(thisDay);
		var _time = _date.getHours();
		var _text = '';
		if (_time >= 8 && _time < 13) {
			_text = '上午';
		} else if (_time >= 13 && _time < 18) {
			_text = '下午';
		} else if (_time >= 18 && _time < 22) {
			_text = '晚上';
		}
		return _text;
	}

	// 获取时间导航
	function getHours(thisDay, serviceTime) {
		var thisDay = thisDay;

		var newAttrs = [];
		var month = []; //早上
		var after = []; //下午
		var night = []; //晚上
		var timeAttr = ['00', '30'];

		var showTime = new Date(thisDay); //展示日期

		var thisTime = new Date(serviceTime); //当前时间 2小时后

		thisTime.setMinutes(thisTime.getMinutes() + 120); //当前时间 2小时后

		var _farTtime = $filter('date')(thisTime, 'HH:mm');


		if (_farTtime.split(':')[1] >= 30) {

			thisTime.setHours(formatDate(Number(_farTtime.split(':')[0]) + 1));
			thisTime.setMinutes(0);

		} else {

			thisTime.setHours(formatDate(_farTtime.split(':')[0]));
			thisTime.setMinutes(30);
		}

		for (var i = 8; i <= 22; i++) {
			for (var j = 0; j < timeAttr.length; j++) {
				if (i >= 8 && i <= 12) {
					newAttrs[0] = {
						dayState: '上午',
						dayAttrs: month
					}
					if (i <= 10) {
						if (compare_hms(showTime, i + ':' + timeAttr[j], thisTime) == 1) {

							month.push({
								'thisDay': thisDay,
								'time': '0' + i + ':' + timeAttr[j],
								'isLast': 1 //大于2小时
							})

						} else {
							month.push({
								'thisDay': thisDay,
								'time': '0' + i + ':' + timeAttr[j],
								'isLast': 2 //小于2小时 或 等于2小时
							})
						}
					} else {
						if (compare_hms(showTime, i + ':' + timeAttr[j], thisTime) == 1) {

							month.push({
								'thisDay': thisDay,
								'time': i + ':' + timeAttr[j],
								'isLast': 1 //大于2小时
							})

						} else {
							month.push({
								'thisDay': thisDay,
								'time': i + ':' + timeAttr[j],
								'isLast': 2 //小于2小时 或 等于2小时
							})
						}
					}
				} else if (i > 12 && i <= 17) {
					newAttrs[1] = {
						dayState: '下午',
						dayAttrs: after
					}
					if (compare_hms(showTime, i + ':' + timeAttr[j], thisTime) == 1) {

						after.push({
							'thisDay': thisDay,
							'time': i + ':' + timeAttr[j],
							'isLast': 1 //大于2小时
						})

					} else {
						after.push({
							'thisDay': thisDay,
							'time': i + ':' + timeAttr[j],
							'isLast': 2 //小于2小时 或 等于2小时
						})
					}

				} else {
					newAttrs[2] = {
						dayState: '晚上',
						dayAttrs: night
					}
					if (compare_hms(showTime, i + ':' + timeAttr[j], thisTime) == 1) {

						if (i == 22 && j == 1) {

							continue;
						} else {

							night.push({
								'thisDay': thisDay,
								'time': i + ':' + timeAttr[j],
								'isLast': 1 //大于2小时
							})

						}



					} else {

						if (i == 22 && j == 1) {

							continue;

						} else {

							night.push({
								'thisDay': thisDay,
								'time': i + ':' + timeAttr[j],
								'isLast': 2 //大于2小时
							})
						}


					}

				}
			}
		}
		console.log(newAttrs)
		return newAttrs;

	}

	function get2Hour() {

		var seTime = new Date($rootScope.serviceTime);

		seTime.setMinutes(seTime.getMinutes() + 120);

		$scope.bThisTime = $filter('date')(seTime, 'HH:mm');

		if ($scope.bThisTime.split(':')[1] >= 30) {

			return formatDate(Number($scope.bThisTime.split(':')[0]) + 1) + ':00';



		} else {

			return formatDate($scope.bThisTime.split(':')[0]) + ':30';
		}
	}

	// 日期点击事件
	$scope.weekClick = function($event) {
		$scope.teacherName = $('#searchText').val();

		$scope.thisDay = $filter('date')(this.day.times, 'yyyy-MM-dd');

		if ($scope.thisDay == $filter('date')($rootScope.serviceTime, 'yyyy-MM-dd')) {

			$scope.allDays = getHours($rootScope.serviceTime, $rootScope.serviceTime);
		} else {
			// newTime : 系统时间
			$scope.allDays = getHours(this.day.times, $rootScope.serviceTime);
		}


		$scope.pageIndex = 1;

		if (getFormatDate($rootScope.serviceTime) == getFormatDate(new Date($scope.thisDay).getTime())) {



			$scope.thisTime = get2Hour();


		} else {
			$scope.thisTime = '08:00';
		}

		$scope.sumPage = 1;
		$scope.pageSize = 10;
		$scope.items = [];
		setTimeout(function() {
			$scope.loadMore();
		}, 100);
		// getHours()
		// $scope.Reddit = new Reddit($scope.thisTime, $scope.thisDay, $scope.sexType); 
	}

	//时间点击事件
	$scope.timeClick = function($event) {
		$scope.thisTime = this.day.time;
		$scope.pageIndex = 1;
		$scope.sumPage = 1;
		$scope.pageSize = 10;
		$scope.items = [];
		$scope.teacherName = $('#searchText').val();

		setTimeout(function() {
			$scope.loadMore();
		}, 100);
		// $scope.thisTime = this.

		// $scope.Reddit = new Reddit($scope.thisTime, $scope.thisDay, $scope.sexType).nextPage(); 
		// console.log($scope.Reddit)
	}

	$scope.sexClick = function() {

			$scope.teacherName = $('#searchText').val();

			if ($("#inlineCheckbox1").is(':checked')) {
				$scope.sexType = 1;

			} else if ($("#inlineCheckbox0").is(':checked')) {
				$scope.sexType = 0;
			} else if ($("#inlineCheckbox2").is(':checked')) {
				$scope.sexType = -1;
			}

			$scope.pageIndex = 1;
			$scope.pageSize = 10;
			$scope.items = [];
			setTimeout(function() {
				$scope.loadMore();
			}, 100);
			// $scope.Reddit = new Reddit($scope.thisTime, $scope.thisDay, $scope.sexType).nextPage(); 

		}
		// 当前页数
	$scope.pageIndex = 1;
	// 总页数
	$scope.sumPage = 1;
	$scope.pageSize = 10;
	// 防止重复加载
	$scope.busy = false;
	// 存放数据
	$scope.items = [];
	// 老师姓名
	$scope.teacherName = '';

	$scope.searchTch = function() {
		$scope.teacherName = $('#searchText').val();
		$scope.pageIndex = 1;
		$scope.sumPage = 1;
		$scope.pageSize = 10;
		// 防止重复加载
		$scope.busy = false;
		// 存放数据
		$scope.items = [];
		setTimeout(function() {
			$scope.loadMore();
		}, 100);
	};

	// 请求数据方法
	$scope.loadMore = function() {
		_czc.push(['_trackEvent', '选择时间、日期、性别后加载老师列表', '点击', '选择时间、日期、性别后加载老师列表']);
		if ($scope.pageIndex <= $scope.sumPage) {

			if ($scope.busy) {
				return false;
			}
			layer.load();
			$scope.busy = true;
			// 请求后台服务器
			httpService.get($scope.teacherUrl, {
					'pageIndex': $scope.pageIndex,
					'pageSize': $scope.pageSize,
					'bookingId': $scope.bookingId,
					'sex': $scope.sexType,
					'date': $scope.thisDay,
					'time': $scope.thisTime,
					'teacherName': $scope.teacherName
				}, 3000)
				.success(function(res) {

					$scope.busy = false;
					//组织数据
					if (res.result == 1) {

						var teacherList = res.data;

						for (var i = 0; i < teacherList.length; i++) {
							$scope.items.push(teacherList[i]);
						}
						$scope.haveMore = false;

						if (teacherList.length == 0 && $scope.pageIndex == 1) {

							$scope.noData = true;

						} else {

							$scope.noData = false;

							$scope.sumPage = Math.ceil(res.total / $scope.pageSize)

							if ($scope.pageIndex <= $scope.sumPage) {
								$scope.haveMore = true;


							} else {
								$scope.haveMore = false;
							}



						}
						layer.closeAll('loading');
						$scope.pageIndex++;



						// if(Math.floor(teacherList.length/$scope.pageSize) == $scope.pageIndex){
						// 	$scope.busy = true;
						// }

					} else if (res.result >= 1000) {
						console.log('过时');
						layer.closeAll('loading');
						$cookies.remove('tonken');
						$cookies.remove('username');
						$cookies.remove('isComplete');
						$cookies.remove('password');
						$cookies.remove('bookingId');
						// alert('登录时间太久，请重新登录');
						$rootScope.$state.go('index.login');
					} else {
						$scope.noData = true;
						layer.closeAll('loading')
					}


				});
		}
	};
	// 默认第一次加载数据
	$scope.loadMore();


	//暂不用
	$scope.loadTeachers = function() {
		if ($scope.busy) return;
		$scope.busy = true;

		httpService.get($scope.teacherUrl, {
			'pageIndex': $scope.pageIndex,
			'pageSize': $scope.pageSize,
			'bookingId': $scope.bookingId,
			'sex': $scope.sexType,
			'date': $scope.thisDay,
			'time': $scope.thisTime
		}, 3000).success(function(res) {
			if (res.result == 1) {
				var teacherList = res.data;
				for (var i = 0; i < teacherList.length; i++) {
					$scope.items.push(teacherList[i]);
				}

				if (teacherList.length == 0 && $scope.pageIndex == 1) {
					$scope.noData = true;

				} else {
					$scope.noData = false;
				}

				if (Math.floor(teacherList.length / $scope.pageSize) == $scope.pageIndex) {
					$scope.busy = true;

				}

				$scope.busy = false;

				$scope.pageIndex += 1;
			} else if (res.result >= 1000) {
				layer.closeAll('loading')
				$cookies.remove('tonken');
				$cookies.remove('username');
				$cookies.remove('isComplete');
				$cookies.remove('password');
				$cookies.remove('bookingId');
				// alert('登录时间太久，请重新登录');
				$rootScope.$state.go('index.login');
			} else {
				$scope.noData = true;
			}

		})
	};
	//预约老师
	$scope.saveDataNext = null;

	$scope.AddlessonNext = function(data) {

		_czc.push(['_trackEvent', '老师预约下一节按钮', '点击', '老师预约下一节按钮']);

		$('#confirmDialog').modal('show');

		$scope.getWeeks = $scope.weeks[new Date($scope.thisDay).getDay()];

		$scope.sxw = getText($scope.thisDay + ' ' + $scope.thisTime);

		$scope.tcName = data.TeacherName;

		$scope.saveDataNext = data;

	};
	// 'lessonId': $scope.saveDataNext.lessonId,
	// 		'bookingId': $scope.nextClassName.bookingId,
	// 		'bdeId':$scope.nextClassName.BDEId

	//预约发送数据
	$scope.nextSendData = function() {

		_czc.push(['_trackEvent', '选择老师确认弹窗，预约下一节', '点击', '选择老师确认弹窗，预约下一节']);

		layer.load()
		httpService.get(_AjaxURL.AddNextLesson, {
				'lessonId': $scope.saveDataNext.LessonId
			})
			.success(function(res) {
				$('#confirmDialog').modal('hide');
				if (res.result == 1) {
					layer.closeAll('loading')
					layer.msg('预约成功', {
						icon: 1
					});
					//重新获取教材
					GetBookList();
					$scope.pageIndex--;
					// 清空数据
					$scope.items = [];
					setTimeout(function() {
						$scope.loadMore();
					}, 100);


				} else if (res.result >= 1000) {
					layer.closeAll('loading')
					$cookies.remove('tonken');
					$cookies.remove('username');
					$cookies.remove('isComplete');
					$cookies.remove('password');
					$cookies.remove('bookingId');
					// alert('登录时间太久，请重新登录');
					$rootScope.$state.go('index.login');
				} else {
					layer.closeAll('loading')
					layer.msg(res.msg);

				}



			})
	}



	//按章节预约老师
	$scope.saveDataZj = null;

	$scope.AddlessonZj = function(data, datazj) {
		_czc.push(['_trackEvent', '选择老师重上按钮', '点击', '选择老师重上按钮']);
		$('#confirmDialogZj').modal('show');

		$scope.getWeeks = $scope.weeks[new Date($scope.thisDay).getDay()];
		$scope.sxw = getText($scope.thisDay + ' ' + $scope.thisTime);

		$scope.tcName = data.TeacherName;
		$scope.saveDataZj = data;
		$scope.zjData = datazj;

	};
	//预约发送数据
	$scope.zjSendData = function() {

			_czc.push(['_trackEvent', '选择老师确认弹窗，重上', '点击', '选择老师确认弹窗，重上']);

			layer.load();
			httpService.get(_AjaxURL.AddLesson, {
					'lessonId': $scope.saveDataZj.LessonId,
					'bookingId': $scope.zjData.BookingId,
					'bdeId': $scope.zjData.BDEId
				})
				.success(function(res) {
					$('#confirmDialogZj').modal('hide');
					if (res.result == 1) {

						layer.closeAll('loading')
						layer.msg('预约成功', {
							icon: 1
						});
						$scope.pageIndex--;
						//重新获取教材
						GetBookList();
						// 清空数据
						$scope.items = [];
						setTimeout(function() {
							$scope.loadMore();
						}, 100);

					} else if (res.result >= 1000) {
						layer.closeAll('loading')
						$cookies.remove('tonken');
						$cookies.remove('username');
						$cookies.remove('isComplete');
						$cookies.remove('password');
						$cookies.remove('bookingId');
						// alert('登录时间太久，请重新登录');
						$rootScope.$state.go('index.login');
					} else {
						layer.closeAll('loading')
						layer.msg(res.msg);
					}
				})


		}

	$scope.tchState = function(state){
		$scope.state = state;
		if($scope.state == 1){
			return true;
		}else{
			return false;
		}
	}
	function getFormatDate(times) {
		return $filter('date')(times, 'MM-dd');
	}
	/**
	 * *
	 * @param  {[type]} showTime [展示时间的具体时间（年月日)]
	 * @param  {[type]} a        [展法时间的时、分]
	 * @param  {[type]} b        [服务器时间的具体时间]
	 * @return {[type]}          [description]
	 */
	function compare_hms(showTime, a, b) {
		var showTimeAttr = a.split(":");
		// console.log(showTimeAttr)
		showTime.setHours(showTimeAttr[0]);
		showTime.setMinutes(showTimeAttr[1]);

		if (showTime >= b) {
			return 1;
		} else {
			return 2;
		}
	}

	function time_range(beginTime, endTime, nowTime) {
		var strb = beginTime.split(":");
		if (strb.length != 2) {
			return false;
		}

		var stre = endTime.split(":");
		if (stre.length != 2) {
			return false;
		}

		var strn = nowTime.split(":");
		if (stre.length != 2) {
			return false;
		}

		var b = new Date($rootScope.serviceTime);
		var e = new Date($rootScope.serviceTime);
		var n = new Date($rootScope.serviceTime);

		b.setHours(strb[0]);
		b.setMinutes(strb[1]);
		e.setHours(stre[0]);
		e.setMinutes(stre[1]);
		n.setHours(strn[0]);
		n.setMinutes(strn[1]);

		if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
			return true;
		} else {
			return false;
		}
	}

}])