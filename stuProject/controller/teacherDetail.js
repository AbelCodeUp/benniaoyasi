var teacherDetailCtrl = angular.module('teacherDetailCtrl', []);
teacherDetailCtrl.controller('teacherDetailCtrl', function($scope, $rootScope, $cookies, httpService, $stateParams, $filter, $timeout) {

	//右边栏显示隐藏
	$rootScope.isShowRightBar = false;

	//获取老师ID
	$scope.teacherId = $stateParams.teacherId;
	$rootScope.cTeacherID = $stateParams.teacherId;

	//bookID
	$scope.bookingId = $cookies.get('bookingId');

	//保存老师ID

	getTeacherInfo($scope.teacherId);

	$scope.noData = false;



	//获取老师列表
	$scope.getTeacherList = function(teacherId) {

		httpService.get(_AjaxURL.GetDetailTeacherList, {
				teacherId: teacherId,
				pageSize: 4
			})
			.success(function(res) {
				if (res.result == 1) {

					var _teacher = res.data.pop();
					res.data.unshift(_teacher);

					$scope.teacherLists = res.data;
					// |换一批时显示第一个老师详情
					$scope.thisIndex = 0;

					$scope.dateActive = 0; //默认显示第一个日期的时间

					getTeacherInfo($scope.teacherLists[0].TeacherId);
				} else if (res.result >= 1000) {
					$cookies.remove('tonken');
					$cookies.remove('username');
					$cookies.remove('isComplete');
					$cookies.remove('password');
					$cookies.remove('bookingId');
					alert('登录时间太久，请重新登录');
					$rootScope.$state.go('index.login');
				}
			})
	}
	$scope.getTeacherList($scope.teacherId);

	// 当前选择的日期
	$scope.thisDate;
	//当前选择的时间
	$scope.thisTime;
	//老师名字
	$scope.tcName;
	//当前lessonId
	$scope.thisLessonId;
	//当前上下午
	$scope.sxw;

	function isCF(data, data1) {
		for (var i = 0; i < data.length; i++) {
			if (data[i].date == data1.date) {
				return {
					'tIndex': i,
					'isyiyang': true
				};
			}
		}
		return {
			'tIndex': null,
			'isyiyang': false
		}
	}
	////获得老师详情
	function getTeacherInfo(teacherId) {
		$rootScope.cTeacherID = teacherId;
		$scope.noData = false;
		layer.load();
		httpService.get(_AjaxURL.GetInfo, {
				teacherId: teacherId
			})
			.success(function(res) {
				if (res.result == 1) {
					$scope.teacherDetail = res.data.info;
					$scope.teacherLesson = res.data.lesson;
					$('#noData').show();
					if($scope.teacherLesson.length == 0){
						$scope.teacherTimes = [];
						$scope.allTime = [];
						$('#noData').hide();
						layer.closeAll('loading');
						return false;

					}
					$scope.tcName = $scope.teacherDetail.Name; //获取老师名称
					$scope.teacherTimes = [];
					$scope.allTime = [];

					var _time = {};
					_time = {};
					_time.times = [];
					_time.date = getDate($scope.teacherLesson[0].StartTime).date;
					$scope.teacherTimes.push(_time);

					angular.forEach($scope.teacherLesson, function(data, index, array) { //重新排列时间数据[ {data: '2016-12-02',times:['12.00']} ]

						if (!isCF($scope.teacherTimes, getDate(data.StartTime)).isyiyang) {
							_time = {};
							_time.times = [];
							_time.date = getDate(data.StartTime).date;

							_time.times.push({
								'lTime': getDate(data.StartTime).time,
								'lessonId': data.LessonId
							});
							$scope.teacherTimes.push(_time)

						} else {
							$scope.teacherTimes[isCF($scope.teacherTimes, getDate(data.StartTime)).tIndex].times.push({
								'lTime': getDate(data.StartTime).time,
								'lessonId': data.LessonId
							});
						}
					});
					// console.log($scope.teacherTimes);
					// angular.forEach($scope.teacherTimes, function(data1,index,array) {


					// 				});
					// $scope.teacherTimes = dateSort($scope.teacherTimes);
					// 排序
					dateSort($scope.teacherTimes);

					if ($scope.teacherTimes.length > 0) {
						$('#noData').show();
					} else {
						$('#noData').hide();
					}

					if ($scope.teacherTimes.length > 0) {
						$scope.getTeacherTime($scope.teacherTimes[0].date);

						//默认lessonId
						$scope.thisLessonId = ($scope.teacherTimes[0].times)[0].lessonId;


						$scope.getWeeks = $filter('weekDay')($scope.thisDate);

						$scope.sxw = getText($scope.thisDate + ' ' + $scope.thisTime);

					} else {
						layer.closeAll('loading');
					}

					$scope.dateActive = 0; //默认显示第一个日期的时间

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
					layer.msg(res.msg)
				}
			})

	}
	//点击日期 显示对应时间
	$scope.allTime = null;

	function dateSort(arr) {
		arr.sort(function(a, b) {
			return a.date > b.date ? 1 : -1;
		});
		return arr;
	}

	function quickSort(arr, name, snum) {
		//如果数组<=1,则直接返回
		if (arr.length <= 1) {
			return arr;
		}
		var pivotIndex = Math.floor(arr.length / 2);
		//找基准，并把基准从原数组删除
		var pivot = arr.splice(pivotIndex, 1)[0];
		var middleNum = pivot[name];
		// 定义左右数组
		var left = [];
		var right = [];
		//比基准小的放在left，比基准大的放在right
		if (snum) {
			for (var i = 0; i < arr.length; i++) {
				if (Number(arr[i][name]) <= Number(middleNum)) {
					left.push(arr[i]);
				} else {
					right.push(arr[i]);
				}
			}
		} else {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i][name] <= middleNum) {
					left.push(arr[i]);
				} else {
					right.push(arr[i]);
				}
			}
		}
		//递归,返回所需数组
		return quickSort(left, name, snum).concat([pivot], quickSort(right, name, snum));
	}

	$scope.getTeacherTime = function(date, i) {

		$scope.dateActive = i;

		$scope.timeIndex = null; //清空选择的时间样式

		for (var index in $scope.teacherTimes) {

			if ($scope.teacherTimes[index].date == date) {
				$scope.thisDate = date;

				$scope.allTime = $scope.teacherTimes[index].times; //获取当前日期所有有课的时间

				$scope.getWeeks = $filter('weekDay')($scope.thisDate);


				layer.closeAll('loading');

				// return $scope.teacherTimes[index].times;
			}
		}
		//当前选择的时间

		$scope.timeIndex = 0;
		$scope.thisTime = $scope.allTime[0].lTime;

	}


	//点击当前时间变色且获得当前选择的时间
	$scope.timeActive = function(index, event) {
		$scope.timeIndex = index;
		$scope.thisTime = $(event.target).text(); //当前选择的时间
		$scope.thisLessonId = $(event.target).data('lessonid');
		$scope.sxw = getText($scope.thisDate + ' ' + $scope.thisTime);
	}

	//获取日期格式
	function getDate(time) {
		var _data = {}
		_data.date = time.split(' ')[0];
		_data.time = time.split(' ')[1];
		return _data;
	}
	//
	//点击老师
	$scope.thisIndex = 0;
	$scope.clickTeacher = function(index, teacherId, thName) {

		$scope.thisIndex = index;

		$rootScope.cTeacherID = teacherId;

		getTeacherInfo($rootScope.cTeacherID);

		// $scope.tcName = thName;

	}

	//获取当前老师教材
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


	//预约老师
	$scope.saveDataNext = null;

	$scope.AddlessonNext = function(data) {

		$('#confirmDialog').modal('show');

		// $scope.tcName = data.TeacherName;

		$scope.saveDataNext = data;

	};
	// 'lessonId': $scope.saveDataNext.lessonId,
	// 		'bookingId': $scope.nextClassName.bookingId,
	// 		'bdeId':$scope.nextClassName.BDEId

	//预约发送数据
	$scope.nextSendData = function() {

		httpService.get(_AjaxURL.AddNextLesson, {
				'lessonId': $scope.thisLessonId
			})
			.success(function(res) {
				$('#confirmDialog').modal('hide');
				if (res.result == 1) {
					layer.msg('预约成功', {
						icon: 1
					});
					getTeacherInfo($rootScope.cTeacherID);

				} else if (res.result >= 1000) {
					$cookies.remove('tonken');
					$cookies.remove('username');
					$cookies.remove('isComplete');
					$cookies.remove('password');
					$cookies.remove('bookingId');
					// alert('登录时间太久，请重新登录');
					$rootScope.$state.go('index.login');
				} else {
					layer.msg(res.msg);
				}


			})
	}



	//按章节预约老师
	$scope.saveDataZj = null;

	$scope.AddlessonZj = function(datazj) {
		$('#confirmDialogZj').modal('show');

		// $scope.saveDataZj = data;
		$scope.zjData = datazj;

	};
	//预约发送数据
	$scope.zjSendData = function() {

		httpService.get(_AjaxURL.AddLesson, {
				'lessonId': $scope.thisLessonId,
				'bookingId': $scope.zjData.BookingId,
				'bdeId': $scope.zjData.BDEId
			})
			.success(function(res) {
				$('#confirmDialogZj').modal('hide');
				if (res.result == 1) {


					layer.msg('预约成功', {
						icon: 1
					});
					getTeacherInfo($rootScope.cTeacherID);


				} else if (res.result >= 1000) {
					$cookies.remove('tonken');
					$cookies.remove('username');
					$cookies.remove('isComplete');
					$cookies.remove('password');
					$cookies.remove('bookingId');
					// alert('登录时间太久，请重新登录');
					$rootScope.$state.go('index.login');
				} else {
					layer.msg(res.msg);
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


	//点击当前头像显示三角形
	// console.log($('.t_active').length);
	// $scope.clickTeacher = function (event){
	// 	var thisDom = event.currentTarget;

	// 	$(thisDom).parent().parent().siblings().find('.t_active').hide();
	// 	$(thisDom).find('.t_active').show();


	// }
})