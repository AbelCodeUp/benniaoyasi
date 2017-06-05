angular.module('components', [])
    .directive('timerbutton', function($timeout, $interval, loginService) { //密码倒计时组件
        return {
            restrict: 'AE',
            scope: {
                showTimer: '=',
                timeout: '=',
                teltext: '='
            },
            replace: true,
            link: function(scope, element, attrs, ctrl) {
                scope.timerCount = scope.timeout / 1000;
                scope.text = "获取验证码";
                var reg = /^1[3-9]\d{9}$/;
                scope.onClick = function() {
                    _czc.push(['_trackEvent', '找回密码手机发送按钮', '点击', '找回密码手机发送按钮']);
                    if (reg.test(scope.teltext)) {
                        var data = {
                            'cell': scope.teltext
                        };
                        loginService.get(_AjaxURL.sendCode, data, 3000)
                            .success(function(res) {
                                if (res.result == 1) {
                                    alert(res.msg,1);
                                    scope.showTimer = true;
                                    scope.timer = true;
                                    scope.text = "秒后重新获取";
                                    var counter = $interval(function() {
                                        scope.timerCount = scope.timerCount - 1;
                                    }, 1000);

                                    $timeout(function() {
                                        scope.text = "重新获取验证码";
                                        scope.timer = false;
                                        $interval.cancel(counter);
                                        scope.showTimer = false;
                                        scope.timerCount = scope.timeout / 1000;
                                    }, scope.timeout);
                                } else {
                                    alert(res.msg);
                                    return false;
                                }
                            });


                    } else {
                        alert('手机号码格式不正确');
                    }

                }
            },
            template: '<button ng-click="onClick()" ng-disabled="timer" type="button" class="btn btn-sm find-pink">' +
                '<span ng-if="showTimer">{{ timerCount }}</span>{{text}}</button>',
        };
    })
    .directive('compare', function() { //新旧密码比较
        return {
            strict: 'AE',
            scope: {
                orgText: '=compare'
            },
            require: 'ngModel',
            link: function(scope, element, attrs, ctil) {

                ctil.$validators.compare = function(val) {
                    return val == scope.orgText;
                }

                scope.$watch('orgText', function() {
                    ctil.$validate();
                })
            }
        }
    })
    /*
     *设置老师星级
     *属性名： starnum :传入老师星级数字
     *
     */
    .directive('showstar', function() {
        return {
            strict: 'EA',
            scope: {
                starnum: '='
            },
            template: ' <div class="star_div_smy">' +
                '<i class="typcn typcn-star-full-outline"></i>' +
                '<i class="typcn typcn-star-full-outline"></i>' +
                '<i class="typcn typcn-star-full-outline"></i>' +
                '<i class="typcn typcn-star-full-outline"></i>' +
                '<i class="typcn typcn-star-full-outline"></i>' +
                '</div>',
            replace: true,
            link: function(scope, element, attrs, ctrl) {
                var ele = $(element).find('i');
                for (var i = 0; i < ele.length - 1; i++) {
                    if (i <= scope.starnum) {
                        $(ele[i]).addClass('yel_smy');
                    }
                }
            }
        }
    })

// // 导航点击滑过
.directive('hovernav', function() {
        return {
            strict: 'A',
            link: function(scope, element, attrs, ctrl) {
                $(element).on('click', '.datebtn_b', function() {
                    $(this).addClass('active_nav').siblings().removeClass('active_nav');
                })
            }
        }
    })
    // // 导航点击滑过
    .directive('hovernavtime', function() {
        return {
            strict: 'A',
            link: function(scope, element, attrs, ctrl) {
                $(element).on('click', '.timebtn_b', function() {
                    $(this).parent().parent().parent().find('li').removeClass('active_nav');
                    $(this).addClass('active_nav');
                })
            }
        }
    })
    //coutnDown 倒计时
    .directive('countDown', function($timeout, $interval,$rootScope) {
        return {
            strict: 'AE',
            scope: {
                stemp: '@',
                callback: '&'
            },
            template: '<span>{{html}}</span>',
            replace: true,
            link: function(scope, element, attr, ctrl) {
                scope.html = '';

                var counter = $interval(function() {

                    var hh = parseInt(scope.stemp / 60 / 60 % 24, 10); //计算剩余的小时数
                    var mm = parseInt(scope.stemp / 60 % 60, 10); //计算剩余的分钟数
                    var ss = parseInt(scope.stemp % 60, 10); //计算剩余的秒数

                    var mhh = hh < 10 ? '0' + hh : hh;
                    var mmm = mm < 10 ? '0' + mm : mm;
                    var mss = ss < 10 ? '0' + ss : ss;
                    scope.html = mhh + ":" + mmm + ":" + mss;

                    if (scope.stemp <= 0) {
                        $interval.cancel(counter);
                        scope.stemp = 0;
                        $rootScope.getClassDatail();
                        // window.location.reload();
                    }

                    scope.stemp--;
                }, 1000);
            }
        }
    })
    //引导指令

// 定义滚动指令
.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        // body窗口的滚动加载--需要Jquery
        $(window).scroll(function() {
            //滚动条距离顶部的距离
            var scrollTop = $(window).scrollTop();
            //滚动条的高度
            var scrollHeight = $(document).height();
            //窗口的高度
            var windowHeight = $(window).height();
            if (scrollTop + windowHeight >= scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
})

//获取焦点指令
.directive('ngFocus', function() {
    var FOCUS_CLASS = "ng-focused";
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$focused = false;
            element.bind('focus', function(evt) {
                element.addClass(FOCUS_CLASS);
                scope.$apply(function() {
                    ctrl.$focused = true;
                });
            }).bind('blur', function() {
                element.removeClass(FOCUS_CLASS);
                scope.$apply(function() {
                    ctrl.$focused = false;
                })
            })
        }
    }
})

.directive('step', function($cookies) {
        return {
            restrict: 'EA',
            template: '<div class="stepImg" id="stepImg">' +
                '<img ng-src="{{img}}" alt="">' +
                '</div>',
            replace: true,
            scope: {
                stepIndex: '@',
                imgSrc: '=',
                stepShow: '='
            },
            link: function(scope, element, attrs, ctrl) {

                if (scope.stepShow == true) {
                    element.show();
                } else {
                    element.hide();
                }
                var imgArray = scope.imgSrc;
                var index = attrs.stepIndex;
                scope.img = imgArray[index];
                element.bind('click', function() {
                    index++;
                    if (index == 3) {
                        index = 0;
                        element.hide();
                    }
                    scope.$apply(function() { //触发DOM
                        scope.img = imgArray[index];
                    })

                })

            }
        }
    })
.directive('sexImg', function() {
        return {
            link: function(scope, element, attrs) {
                element.bind('error', function() {
                    if (attrs.sexImg > 0 || attrs.sexImg == '男') {
                        attrs.$set('src', 'images/men.png');
                    }else if (attrs.sexImg <= 0  || attrs.sexImg == '女'){
                        attrs.$set('src', 'images/women.png');
                    }
                });
            }
        }
    })

.directive('datepicker', function($rootScope) {
    return {
        link:function(scope, element, attrs){
            var serverTime = $rootScope.serviceTime;
            $(element).datetimepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                todayHighlight: true,
                minView:'month',
                language: 'zh-CN'
            }).on('changeDate',function(ev){
                serverTime = $rootScope.serviceTime;
                $(element).parents('.form-group').find('#sAge').text(getAge(ev.date.valueOf(),serverTime))
            });

            function getAge(t,s){
                var sTime = new Date(s);
                var tTime = new Date(t);

                return (sTime.getFullYear() - tTime.getFullYear() + 1) + '岁';
            }
        }
    }


})