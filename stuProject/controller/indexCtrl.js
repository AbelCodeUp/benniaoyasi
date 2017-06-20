var commonCtrl = angular.module('indexCtrl', []);
commonCtrl.controller('indexCtrl', ['$scope', '$rootScope', '$window', '$cookies', 'httpService', '$timeout', '$cookies', function($scope, $rootScope, $window, $cookies, httpService, $timeout, $cookies) {

	window.alert = function(msg,type){
		if(type==undefined){
			type=2;
		}
		layer.msg(msg, {
			icon: type
		})
	}

	$rootScope.showAlert = function(msg, type) {
		if (type == 1) {
			$scope.massage = msg;
			$('#dialogMsg').modal('show');
		}
	}

	//右边栏显示隐藏
	$rootScope.isShowRightBar = false;

	//默认头像
	$rootScope.defaultImg = 'images/default.png';
	//客户端教室
	$rootScope.goClient = function(lessonId, userName) {

		_czc.push(['_trackEvent', '进入客户端端教室', '点击', '进入客户端端教室']);

		httpService.get(_AjaxURL.StuEnterRoom, {
				'lessonId': lessonId
			})
			.success(function(res) {
				if (res.result == 1) {
					var wWeight = $(window).width();
					var wHeight = $(window).height();

					$rootScope.goClienturl = res.data.clienturl;
					var goClienturl = res.data.WebUrl;
					var index = layer.open({
						type: 2,
						content:$rootScope.goClienturl,
						maxmin: true,
						title: '教室',
						area: [wWeight+'px', wHeight+'px']
					});
					layer.full(index);

				} else if (res.result >= 1000) {
					$cookies.remove('tonken');
					$cookies.remove('username');
					$cookies.remove('isComplete');
					$cookies.remove('password');
					$cookies.remove('bookingId');
					// alert('登录时间太久，请重新登录');
					$rootScope.$state.go('index.login');
				} else if (res.result == 0) {
					layer.msg(res.msg);
				}

			})
	}
	$rootScope.goQQRoom = function(lessonId, userName, event) {

			_czc.push(['_trackEvent', '进入QQ教室', '点击', '进入QQ教室']);

			httpService.get(_AjaxURL.StuEnterRoom, {
					'lessonId': lessonId
				})
				.success(function(res) {
					if (res.result == 1) {

						$rootScope.goQQurl = $(event.target).data('url');
						// $('#goQQRoom').attr('src',$rootScope.goQQurl);

					} else if (res.result >= 1000) {
						$cookies.remove('tonken');
						$cookies.remove('username');
						$cookies.remove('isComplete');
						$cookies.remove('password');
						$cookies.remove('bookingId');
						// alert('登录时间太久，请重新登录');
						$rootScope.$state.go('index.login');
					} else if (res.result == 0) {
						layer.msg(res.msg, {
							icon: 2
						})
					}

				})
		}
		//test客户端教室
	$rootScope.goTestClient = function() {

		_czc.push(['_trackEvent', '进入客户端端教室检测', '点击', '进入客户端端教室检测']);

		httpService.get(_AjaxURL.StuEnterDebug, {})
			.success(function(res) {
				var wWeight = $(window).width();
				var wHeight = $(window).height();
				if (res.result == 1) {
					var roomUrl = res.data.WebUrl;
					jQuery('#goUrl').attr('href',res.clienturl);
                    jQuery("#spanId").click();
					// var index = layer.open({
					// 	type: 2,
					// 	content:$rootScope.goClienturl,
					// 	maxmin: true,
					// 	title: '教室',
					// 	area: [wWeight, wHeight]
					// });
					// layer.full(index);
					
					// $('#goClient').attr('src', $rootScope.goClienturl);
				} else if (res.result >= 1000) {
					$cookies.remove('tonken');
					$cookies.remove('username');
					$cookies.remove('isComplete');
					$cookies.remove('password');
					$cookies.remove('bookingId');
					// alert('登录时间太久，请重新登录');
					$rootScope.$state.go('index.login');
				} else {
					layer.msg(res.msg, {
						icon: 2
					})
				}

			})
	}

	$scope.stepAttr = ['images/indicate/indicate-1.jpg', 'images/indicate/indicate-2.jpg', 'images/indicate/indicate-3.jpg'];
	$rootScope.stepIsShow = false;
	//拓课
	$rootScope.joinTuokeRoom = function(lessonId, userName) {

		_czc.push(['_trackEvent', '进入web端教室', '点击', '进入web端教室']);

		var wWeight = $(window).width();
		var wHeight = $(window).height();

		httpService.get(_AjaxURL.StuEnterRoom, {
			'lessonId': lessonId
		})
		.success(function(res) {
			if (res.result == 1) {
				var roomUrl = res.data.url;
				$('#goUrl').attr('href',roomUrl);
                $("#spanId").click();


			} else if (res.result >= 1000) {
				$cookies.remove('tonken');
				$cookies.remove('username');
				$cookies.remove('isComplete');
				$cookies.remove('password');
				$cookies.remove('bookingId');
				// alert('登录时间太久，请重新登录');
				$rootScope.$state.go('index.login');
			} else if (res.result == 0) {
				layer.msg(res.msg);
			}

		})
	}
	//进入教室
	$rootScope.joinClassRoom = function(lessonId, userName) {

		_czc.push(['_trackEvent', '进入web端教室', '点击', '进入web端教室']);

		var wWeight = $(window).width();
		var wHeight = $(window).height();

		httpService.get(_AjaxURL.StuEnterRoom, {
			'lessonId': lessonId
		})
		.success(function(res) {
			if (res.result == 1) {
				var roomUrl = res.data.url;

				var index = layer.open({
						type: 2,
						content:roomUrl,
						maxmin: true,
						title: '教室',
						area: [wWeight, wHeight],
						cancel: function(index) {
							if (confirm('确定要关闭么')) {
								layer.close(index);

								$timeout.cancel(timecancel);

							}
							return false;
						}
					});
					layer.full(index);

			} else if (res.result >= 1000) {
				$cookies.remove('tonken');
				$cookies.remove('username');
				$cookies.remove('isComplete');
				$cookies.remove('password');
				$cookies.remove('bookingId');
				// alert('登录时间太久，请重新登录');
				$rootScope.$state.go('index.login');
			} else if (res.result == 0) {
				layer.msg(res.msg);
			}

		})
		// httpService.get(_AjaxURL.StuEnterRoom, {
		// 		'lessonId': lessonId
		// 	})
		// 	.success(function(res) {
		// 		if (res.result == 1) {


		// 			var timecancel;
		// 			var timehome;

		// 			var data = res.data;

		// 			var Second = data.Second ? data.Second : data.second;
		// 			var RoomNum = data.RoomNum ? data.RoomNum : data.roomNum;



		// 			//console.log('http://teacher.gogo-talk.com/room/student.html?room_Num='+data.RoomNum+'&time_surplus='+ encodeURIComponent(data.Second) +'&courseName='+encodeURIComponent(LessonName)+'&LessonId='+lessonId+'&user_Name='+userName+'&user_Pwd=123456&studentId='+data.studentId+'&role_Type=1')
		// 			//console.log();
		// 			// // 弹出即全屏
		// 			var index = layer.open({
		// 				type: 2,
		// 				content: 'http://manage.gogo-talk.com/room/student.html?room_Num=' + data.RoomNum + '&time_surplus=' + data.Second + '&courseName=' + encodeURIComponent(encodeURIComponent(LessonName)) + '&LessonId=' + lessonId + '&user_Name=' + userName + '&user_Pwd=123456&studentId=' + data.studentId + '&role_Type=0',
		// 				maxmin: true,
		// 				title: '教室',
		// 				area: [wWeight, wHeight],
		// 				cancel: function(index) {
		// 					if (confirm('确定要关闭么')) {
		// 						layer.close(index);

		// 						$timeout.cancel(timecancel);

		// 					}
		// 					return false;
		// 				}
		// 			});
		// 			layer.full(index);


		// 			var sercod = data.Second * 1000;


		// 			timecancel = $timeout(function() {
		// 				layer.closeAll();
		// 				$rootScope.AddTeacherTag(lessonId);
		// 			}, sercod);

		// 		} else if (res.result >= 1000) {
		// 			$cookies.remove('tonken');
		// 			$cookies.remove('username');
		// 			$cookies.remove('isComplete');
		// 			$cookies.remove('password');
		// 			$cookies.remove('bookingId');
		// 			// alert('登录时间太久，请重新登录');
		// 			$rootScope.$state.go('index.login');
		// 		} else {
		// 			layer.msg('30分钟内方可进入教室', {
		// 				icon: 2
		// 			})
		// 		}

		// 	})


	}

	//课后评价
	$scope.lessonTagId = null;

	$rootScope.AddTeacherTag = function(lessonId) {

		$scope.lessonTagId = lessonId;

		$scope.teacherAttr = [];

		$('#teacherTag').modal('show');

		$('#techer-content').val('');

	}

	//评价揚提交
	$rootScope.SubmitTag = function(lessonId) {

		httpService.post(_AjaxURL.CommentTeacher, {
				'lessonId': lessonId,
				'likeTchStar': $('#likeStar').data('score'),
				'rememberStar': $('#rememberStar').data('score'),
				'remark': $('#techer-content').val()

			})
			.success(function(res) {
				if (res.result == 1) {
					layer.msg('提交成功', {
						icon: 1
					});

					$('#teacherTag').modal('hide');

					// $rootScope.getStudyList(1);

					$timeout(function() {
						window.location.reload();
					}, 1000)


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
	$rootScope.closeTchId;
	$rootScope.thisEvent;
	$rootScope.Attention = function(e) {
		$rootScope.thisEvent = e;
		var teacherId = $(e.target).data('tchid');
		layer.load();
		var state = $(e.target).data('state');
		if (state == 1) {
			$rootScope.closeTchId = $(e.target).data('tchid');
			$('#guanzhu').modal('show');
			layer.closeAll('loading')
			return false;
		}
		httpService.get(_AjaxURL.Attention, {
				'teacherId': teacherId,
				'state': state
			})
			.success(function(res) {
				if (res.result == 1) {

					$(e.target).data('state', 1);
					$(e.target).removeClass('weiguanzhu').addClass('yiguanzhu');
					// $rootScope.getStudyList($rootScope.studyIndex);
					layer.closeAll('loading');
					layer.msg('关注成功', {
						icon: 1
					});
				} else if (res.result >= 1000) {

					layer.closeAll('loading')
					$cookies.remove('tonken');
					$cookies.remove('username');
					$cookies.remove('isComplete');
					$cookies.remove('password');
					$cookies.remove('bookingId');
					// alert('登录时间太久，请重新登录');
					$rootScope.$state.go('index.login');
				} else if (res.result <= 0 & state == 0) {
					layer.closeAll('loading')
					layer.msg('关注失败', {
						icon: 2
					});
				} else if (res.result <= 0 & state == 1) {
					layer.closeAll('loading')
					layer.msg('关注失败', {
						icon: 2
					});
				}

			})
			.error(function() {
				layer.closeAll('loading')
				layer.msg('关注失败', {
					icon: 2
				});
			})
	}
	$rootScope.isAtten = function(e) {
		$('#guanzhu').modal('show');
		$rootScope.closeTchId = $(e.target).data('tchid');
		// 取消关注
	}
	$rootScope.closeAtten = function() {
			var state = 1;
			layer.load();
			httpService.get(_AjaxURL.Attention, {
					'teacherId': $scope.closeTchId,
					'state': state
				})
				.success(function(res) {
					if (res.result == 1) {

						$($rootScope.thisEvent.target).data('state', 0);
						$($rootScope.thisEvent.target).removeClass('yiguanzhu').addClass('weiguanzhu');
						// $rootScope.getStudyList($rootScope.studyIndex);
						layer.closeAll('loading');
						layer.msg('取消成功', {
							icon: 1
						});
						$('#guanzhu').modal('hide');
					} else if (res.result >= 1000) {
						layer.closeAll('loading')
						$cookies.remove('tonken');
						$cookies.remove('username');
						$cookies.remove('isComplete');
						$cookies.remove('password');
						$cookies.remove('bookingId');
						// alert('登录时间太久，请重新登录');
						$rootScope.$state.go('index.login');
					} else if (res.result <= 0 & state == 0) {
						layer.closeAll('loading')
						layer.msg('取消失败', {
							icon: 2
						});
					} else if (res.result <= 0 & state == 1) {
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
		// Define the tour!
		// var tour = {
		//     id: "my-intro",
		//     steps: [
		//         {
		//             target: "tour-one",
		//             title: "Logo Here",
		//             content: "You can find here status of user who's currently online.",
		//             placement: 'left',
		//             yOffset: 10
		//         },
		//         {
		//             target: 'tour-two',
		//             title: "Small navigation button",
		//             content: "Click on the button and make sidebar navigation small.",
		//             placement: 'left',
		//             zindex: 999
		//         },
		//     ],
		//     showPrevButton: true
		// };

	// // Start the tour!
	// hopscotch.startTour(tour);



}])