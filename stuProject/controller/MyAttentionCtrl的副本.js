var MyAttention = angular.module('MyAttentionCtrl', []);

MyAttention.controller('MyAttentionCtrl', ['$scope', '$rootScope', '$cookies', 'httpService', function($scope, $rootScope, $cookies, httpService) {

	$scope.bookingId = $cookies.get('bookingId');
	$scope.lessonId;
	//右边栏显示隐藏
	$rootScope.isShowRightBar = false;
	$scope.sTchId;
	$scope.isShow = true;
	//年月日信息
	$scope.timeAttrs = [];
	//所有时间点
	// var allTime = ['9:00','9:30','10:00','10:30','11:00','11:30','12:00',
	// 	'12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30',
	// 	'17:00','17:30','18:00','18:30'];
	function getShowTime() {
		var allTime = [];
		var t = ['00', '30'];
		for (var i = 8; i < 23; i++) {
			for (var j = 0; j < t.length; j++) {
				allTime.push((i < 10 ? '0' + i : i) + ':' + t[j]);
			}
		}
		allTime.pop();
		return allTime;
	}
	$scope.isClick;
	$scope.tchId;
	$scope.getTeacherData = function(tchId, index) {
		if (index) {
			$scope.isClick = index;
		} else {
			$scope.isClick = 0;
		}
		$scope.tchId = tchId;

		$scope.sTchId = tchId;
		var sTime = $scope.timeAttrs[0].year + '-' + $scope.timeAttrs[0].month + '-' + $scope.timeAttrs[0].day;
		var eTime = $scope.timeAttrs[6].year + '-' + $scope.timeAttrs[6].month + '-' + $scope.timeAttrs[6].day;
		layer.load();
		httpService.get(_AjaxURL.GetTearcherList, {
				'teacherId': $scope.tchId,
				'startDate': sTime,
				'endDate': eTime
			})
			.success(function(res) {
				if (res.result == 1) {

					$scope.Tdatas = [];
					var timeLength = getShowTime();
					var aData = res.data;
					if (aData != null) {
						for (var j = 0; j < timeLength.length; j++) {
							var obj = {};
							obj.tTime = timeLength[j];
							var iAttr = [];
							for (var i = 0; i < aData.length; i++) {

								var iObj = {};
								var items = aData[i].item;
								if (items != null) {
									var num = 0;
									for (var k = 0; k < items.length; k++) {
										num++;
										if (timeLength[j] == items[k].hours) {
											iObj[items[k].hours] = items[k].state;
											iObj[items[k].hours + 'lessonId'] = items[k].LessonId;
										}
									}


								} else {
									iObj[timeLength[j]] = '';
									iObj[timeLength[j] + 'lessonId'] = '';
								}
								iAttr.push(iObj);
							}
							obj.states = iAttr;
							$scope.Tdatas.push(obj);
						}

					} else {
						// 清空json队像
						for (var j = 0; j < timeLength.length; j++) {
							var obj = {};
							obj.tTime = timeLength[j];
							var iAttr = [];
							for (var i = 0; i < 7; i++) {

								var iObj = {};
								iObj[timeLength[j]] = '';
								iObj[timeLength[j] + 'lessonId'] = '';
								iAttr.push(iObj);
							}
							obj.states = iAttr;
							$scope.Tdatas.push(obj);
						}
					}

					$('.cardName').tinytooltip({message: function(tip) {
						return $(this).html();
					}});
				}
				layer.closeAll('loading')
			})
	}


	//获取7天内同一 时间点的数据
	function getSevenTime(Data, tData) {
		for (var i = 0; i < 7; i++) {
			for (var k = 0; k < items.length; k++) {
				if (timeLength[j] == items[k]) {
					iObj.time = items[k].hours;
					iObj.state = items[k].state;
					// break;
				} else {
					iObj.time = '';
					iObj.state = '';
					// break;
				}
			}
		}
	}
	// 判断右侧还有多少老师

	function getLeftRightNum(tCount, Count) {

	}

	// 请求我关注的老师
	$scope.pageIndex = 1;
	$scope.Count;
	$scope.isAll = true;
	$scope.rightCount; //左边总数量
	$scope.leftCount; //右边总数量
	$scope.loadTch = function(pageIndex) {
		layer.load();
		httpService.get(_AjaxURL.GetTeacherFollow, {
				'pageIndex': pageIndex,
				'pageSize': 5
			})
			.success(function(res) {
				if (res.result == 1) {
					if (res.data != null) {

						$scope.isShow = true;
						$scope.teacherLists = res.data;

						// 计算左右

						var Count = $scope.teacherLists[0].Count;
						$scope.Count = $scope.teacherLists[0].Count;
						var tCount = $scope.teacherLists.length;

						if (Count <= 5) {
							$scope.rightCount = 0;
							$scope.leftCount = 0;
						} else {
							if ($scope.teacherLists.length < 5 || $scope.teacherLists[0].Count == $scope.teacherLists.length * pageIndex) {
								$scope.rightCount = 0;
							} else {
								$scope.rightCount = Count - tCount * pageIndex;
							}

							if (pageIndex > 1) {
								$scope.leftCount = (pageIndex - 1) * 5;
							} else if (pageIndex == 1) {
								$scope.leftCount = 0;
							}
						}

						if ($scope.teacherLists.length < 5 || $scope.teacherLists[0].Count == $scope.teacherLists.length * pageIndex) {
							$scope.isAll = false;
						}
						$scope.sTchId = $scope.teacherLists[0].TeacherId;
						// 首次加载表格数据
						$scope.getTeacherData($scope.sTchId, $scope.isClick);
						layer.closeAll('loading')
					} else {
						$scope.isShow = false;
						layer.closeAll('loading');
					}

				} else {
					$scope.isShow = false;
					layer.closeAll('loading')
				}
			})
			.error(function(res) {
				layer.closeAll('loading');
			})
	}
	$scope.getTeacherFollow = function(type) {


		if (type == 'right') {
			if ($scope.rightCount == 0) {
				return false;
			} else {
				$scope.pageIndex++;
				$scope.loadTch($scope.pageIndex);
			}

		} else if (type == 'left') {
			$scope.pageIndex--;
			if ($scope.pageIndex <= 0) {
				$scope.pageIndex = 1;
			} else {
				$scope.loadTch($scope.pageIndex);
			}

		}

	}
	$scope.isClick = 0;

	$scope.loadTch($scope.pageIndex);
	// 当周第一天的时间	
	// 



	// 时间切换
	$scope.currentFirstDate;
	$scope.formatDate = function(date) {
		var thisDate = new Date($rootScope.serviceTime);
		var toYear = thisDate.getFullYear();
		var toMonth = thisDate.getMonth() + 1;
		var toDay = thisDate.getDate();

		var year = date.getFullYear();
		// var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth + 1);
		var month = date.getMonth() + 1;
		if (month < 10) {
			month = '0' + month;
		}
		var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
		var week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()];
		$scope.tYear = year;
		$scope.tMonth = month;
		if (toYear == year && toMonth == month && toDay == day) {
			return {
				'year': year,
				'month': month,
				'day': day,
				'week': week,
				'isToDay': 1
			};
		} else {
			return {
				'year': year,
				'month': month,
				'day': day,
				'week': week,
				'isToDay': 0
			};
		}

	};
	$scope.addDate = function(date, n) {
		date.setDate(date.getDate() + n);
		return date;
	};
	$scope.thisWeekFirst;
	$scope.setDate = function(date) {
		var week = date.getDay() - 1;
		date = $scope.addDate(date, week * -1);
		$scope.thisWeekFirst = new Date(date);
		$scope.currentFirstDate = new Date(date);;

		for (var i = 0; i < 7; i++) {
			$scope.timeAttrs.push($scope.formatDate(i == 0 ? date : $scope.addDate(date, 1)));
		}
	};
	

	function forDaTe(time) {
		var date = new Date(time);
		return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
	}

	$scope.setDate(new Date($rootScope.serviceTime));
	
	$scope.thisFirstDat = $scope.thisWeekFirst;
	if($scope.thisFirstDat.getTime() == $scope.currentFirstDate.getTime()){
		$scope.isShowUpWeek = true;
	}else{
		$scope.isShowUpWeek = false;
	}

	//上 一周下一周切换
	$scope.getWeekTime = function(type,e) {

		$(e.target).parent().addClass('week-active').siblings().removeClass('week-active');

		$scope.timeAttrs.length = 0;
		if (type == 1) {
			$scope.setDate($scope.addDate($scope.currentFirstDate, 7));
		} else if (type == 0) {
			$scope.setDate($scope.addDate($scope.currentFirstDate, -7));
		}

		// 判断当前周
		if($scope.thisFirstDat.getTime() == $scope.currentFirstDate.getTime()){
			$scope.isShowUpWeek = true;
		}else{
			$scope.isShowUpWeek = false;
		}

		$scope.getTeacherData($scope.sTchId, $scope.isClick);
	}
	

	// 时间切换end
	$scope.lessonId;
	// 点击预约
	$scope.orderTeacher = function(type, attr, event) {
			if (type == '0') {
				$scope.lessonId = $(event.target).data('lessid')[attr + 'lessonId'];

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
				$('#myModal').modal('show');
			}

		}
		// 重上
	$scope.zjSendData = function(BDEId, BookingId) {

		_czc.push(['_trackEvent', '选择老师确认弹窗，重上', '点击', '选择老师确认弹窗，重上']);

		layer.load();
		httpService.get(_AjaxURL.AddLesson, {
				'lessonId': $scope.lessonId,
				'bookingId': BookingId,
				'bdeId': BDEId
			})
			.success(function(res) {
				$('#confirmDialogZj').modal('hide');
				if (res.result == 1) {

					layer.closeAll('loading')
					layer.msg('预约成功', {
						icon: 1
					});
					$('#myModal').modal('hide');
					$scope.getTeacherData($scope.tchId, $scope.isClick)

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

	// 预约下一节
	$scope.nextSendData = function() {

			_czc.push(['_trackEvent', '选择老师确认弹窗，预约下一节', '点击', '选择老师确认弹窗，预约下一节']);

			layer.load()
			httpService.get(_AjaxURL.AddNextLesson, {
					'lessonId': $scope.lessonId
				})
				.success(function(res) {
					$('#confirmDialog').modal('hide');
					if (res.result == 1) {
						layer.closeAll('loading')
						layer.msg('预约成功', {
							icon: 1
						});
						$('#myModal').modal('hide');
						$scope.getTeacherData($scope.tchId, $scope.isClick);

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
	$scope.closeTchId;
	$scope.l_isAtten = function(tchId){
		$('#l_guanzhu').modal('show');
		$scope.closeTchId = tchId;
		// 取消关注
	}
	$scope.l_closeAtten = function() {
		layer.load();
		httpService.get(_AjaxURL.Attention, {
				'teacherId': $scope.closeTchId,
				'state': 1
			})
			.success(function(res) {
				if (res.result == 1) {

					$('#l_guanzhu').modal('hide');

					layer.msg('取消成功',{icon:1})
					//重新获取老师
					$scope.isAll = true;
					$scope.pageIndex = 1;
					$scope.loadTch($scope.pageIndex);
				} else if (res.result >= 1000) {
					layer.closeAll('loading')
					$cookies.remove('tonken');
					$cookies.remove('username');
					$cookies.remove('isComplete');
					$cookies.remove('password');
					$cookies.remove('bookingId');
					// alert('登录时间太久，请重新登录');
					$rootScope.$state.go('index.login');
				} else if (res.result <= 0) {
					layer.closeAll('loading')
					layer.msg('取消失败', {
						icon: 2
					});
				}

			})
			.error(function() {
				layer.closeAll('loading')
				layer.msg('取消失败', {
					icon: 2
				});
			})
	}

	function theWeekOfYear(curDate) {
		/* 
		 date1是当前日期 
		 date2是当年第一天 
		 d是当前日期是今年第多少天 
		 用d + 当前年的第一天的周差距的和在除以7就是本年第几周 
		 */
		var a = curDate.getFullYear();
		var b = curDate.getMonth() + 1;
		var c = curDate.getDate();

		var date1 = new Date(a, parseInt(b) - 1, c),
			date2 = new Date(a, 0, 1),
			d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
		return Math.ceil(
			(d + ((date2.getDay() + 1) - 1)) / 7
		);
	};


	// $scope.isShowUpWeek = subDay(new Date($rootScope.serverTime))


}]);