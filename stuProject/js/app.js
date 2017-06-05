var app = angular.module('main', ['ui.router',
                                    'comfilter',
                                    'loginCtrl',
                                    'ngCookies',
                                    'httpService',
                                    'components',
                                    'indexCtrl',
                                    'personCenterCtrl',
                                    'homeCtrl',
                                    'myCalenderCtrl',
                                    'ReportCtrl',
                                    'studyCtrl',
                                    'calendar',
                                    'orderTeacherCtrl',
                                    'teacherDetailCtrl',
                                    'infinite-scroll',
                                    'MyAttentionCtrl'
                                    ]);

/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
app.run(function ($rootScope, $state, $stateParams, $cookies, $http) {
    
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    
    $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
        // 如果需要阻止事件的完成  evt.preventDefault();});
        $(window).scrollTop(0); //滚动条变为0

        

    })
    $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {  
        // to be used for back button //won't work when page is reloaded.  
        $rootScope.previousState_name = fromState.name;  
        $rootScope.previousState_params = fromParams;
            
            
    });  
    //back button function called from back button's ng-click="back()"  
    $rootScope.back = function() {//实现返回的函数
        $state.go($rootScope.previousState_name,$rootScope.previousState_params);  
    };



    

});


app.config(function ($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.otherwise('index');

    $stateProvider.state('index', {
        url: '/index',
        views: {
            '': {
                templateUrl: 'template/loginview.html?rgg=' + Math.floor(Date.now() / 1000),
            },
            'loginview@index': {
                templateUrl: 'template/login_mis.html?rgg=' + Math.floor(Date.now() / 1000),
                controller: 'loginCtrl'
            }
        },

    })

        .state('index.regjoin', {
            url: '/regjoin',
            views: {
                'loginview@index': {
                    templateUrl: 'template/regjoin.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller: 'regjoinCtrl'
                }
            },

        })
        .state('index.loginregister', {
            url: '/loginregister',
            views: {
                'loginview@index': {
                    templateUrl: 'template/login_register.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller: 'registerCtrl'
                }
            },

        })
        .state('index.register', {
            url: '/register',
            views: {
                'loginview@index': {
                    templateUrl: 'template/register.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller: 'registerCtrl'
                }
            },

        })
        .state('index.ggtlogin', {
            url: '/ggtlogin',
            views: {
                'loginview@index': {
                    templateUrl: 'template/login_ggt.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller: 'loginCtrl'
                }
            },
        })
        .state('index.mislogin', {
            url: '/mislogin',
            views: {
                'loginview@index': {
                    templateUrl: 'template/login_mis.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller: 'loginCtrl'
                }
            },
        })
        .state('index.findpwd', {
            url: '/findpwd',
            views: {
                'loginview@index': {
                    templateUrl: 'template/findPwd.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller: 'findpwdCtrl'
                }
            },

        })
        .state('index.backps', {
            url: '/backps',
            views: {
                'loginview@index': {
                    templateUrl: 'template/login_backps.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller: 'findpwdCtrl'
                }
            },

        })
        .state('index.backpssuccess', {
            url: '/backpssuccess',
            views: {
                'loginview@index': {
                    templateUrl: 'template/login_backps_success.html?rgg=' + Math.floor(Date.now() / 1000)
                }
            },

        })
        .state('index.wxregister', {
            url: '/wxregister',
            views: {
                'loginview@index': {
                    templateUrl: 'template/wxregister.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller:function($scope,$rootScope,$interval){
                        $scope.timer = 5;
                   
                        $scope.wxnext = true;
                        $scope.joinMain= '进入首页(5s)';
                        var count = $interval(function(){
                            $scope.timer --;
                            $scope.joinMain = '进入首页('+$scope.timer+'s)';
                            if($scope.timer <= 0){
                                $scope.joinMain = '进入首页';
                                $scope.wxnext = false;
                                $interval.cancel(count);
                            }
                        },1000)

                        $scope.goHome = function(){
                            _czc.push(['_trackEvent', '5s内进入首页按钮', '点击', '注册完成进入首页按钮']);
                            $rootScope.$state.go('home');
                        }
                    }
                }
            }

        })
        .state('index.registersuccess', {
            url: '/registersuccess',
            views: {
                'loginview@index': {
                    templateUrl: 'template/login_register_success.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller:function($scope,$rootScope,$interval){                       

                        $scope.goHome = function(){
                            _czc.push(['_trackEvent', '5s内进入首页按钮', '点击', '注册完成进入首页按钮']);
                            $rootScope.$state.go('home');
                        }
                    }
                }
            }

        })
        .state('index.login', {
            url: '/login',
            views: {
                'loginview@index': {
                    templateUrl: 'template/login_mis.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller: 'loginCtrl'
                }
            },

        })
        .state('home.pcenter', {
            url: '/personcenter',
            views: {
                'content@home': {
                    templateUrl: 'template/main-person-center.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller: 'personCtrl'
                }
            },

        })
        .state('home', {
            url: '/home',
            views: {
                '': {
                    templateUrl: 'template/homeview.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller: 'homeCtrl'
                },
                'header@home': {
                    templateUrl: 'template/header.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller: 'headerCtrl'
                },
                'leftbar@home': {
                    templateUrl: 'template/leftbar.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller: 'leftbarCtrl'
                },
                'content@home': {
                    templateUrl: 'template/main-content-class2.html',
                    controller: 'homeContentCtrl'
                },
                'rightside@home': {
                    templateUrl: 'template/main-rightbar.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller: 'rightbarCtrl'
                },
                'bottomcontent@home':{
                    templateUrl: 'template/bottom.html?rgg=' + Math.floor(Date.now() / 1000),
                }
            },
            resolve: {
                currentDetails: function ($http, $cookies, $rootScope) {
                    return $http({
                        method: 'get',
                        url: _AjaxURL.serverTime,
                        params: {},
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                            , 'Authorization': $cookies.get('tonken')
                        }
                    }).success(function (res) {
                        if (res.result == 1) {
                            $rootScope.serviceTime = res.data.timestamp * 1000;
                           
                        }else if(res.result >= 1000){
                            $cookies.remove('tonken');
                            $cookies.remove('username');
                            $cookies.remove('isComplete');
                            $cookies.remove('password');
                            $cookies.remove('bookingId');
                            $rootScope.$state.go('index.login');
                        }

                    })
                        
                }
            }

        })
        .state('home.class', {
            url: '/class',
            views: {
                'content@home': {
                    templateUrl: 'template/main-content-class2.html?rgg=' + Math.floor(Date.now() / 1000),
                }
            }
        })

        .state('home.testlist', {
            url: '/testlist',
            views: {
                'content@home': {
                    templateUrl: 'template/testlist.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller:function($rootScope,$sce,$scope){
                       //右边栏显示隐藏
                        $rootScope.isShowRightBar = false;

                        
                    }
                }
            }
        })

        .state('home.device', {
            url: '/device',
            views: {
                'content@home': {
                    templateUrl: 'testDev/testDevPage.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller:function($rootScope,$sce,$scope){
                       //右边栏显示隐藏
                        $rootScope.isShowRightBar = false;
                    }
                }
            }
        })

        .state('home.orderteacher', {
            url: '/orderteacher',
            views: {
                'content@home': {
                    templateUrl: 'template/main-order-teacher.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller: 'orderTeacherCtrl'
                }
            }

        })
        .state('home.mycalendar', { //我的课表
            url: '/mycalendar',
            views: {
                'content@home': {
                    templateUrl: 'template/main-order-calendar.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller: 'myCalenderCtrl'
                }
            }

        })
        .state('home.testReportList', { // 我的测评列表
            url: '/testReportlist',
            views: {
                'content@home': {
                    templateUrl: 'template/main-my-appraisal.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller: 'ReportListCtrl'
                }
            }

        })
        .state('home.weekReportDetail',{ //周报详情
            url:'/weekReportDetail/:weekId',
            views:{
                'content@home':{
                    templateUrl:'template/main-week-ReportDetail.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller:'weekReportDetailCtrl'
                }
            }
        })
        .state('home.testReportDetail', { //测评详情
            url: '/testReportDetail/:inboxId',
            views: {
                'content@home': {
                    templateUrl: 'template/main-Assessment-details.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller: 'ReportDetailCtrl'
                }
            }

        })
        .state('home.teacherDetail', { //老师详情
            url:'/teacherDateil/:teacherId',
            views: {
                'content@home': {
                    templateUrl: 'template/main-teacher-detail.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller:'teacherDetailCtrl'

                }
            }
        })
        .state('home.studyList', { //学习记录
            url:'/studyhistory',
            views: {
                'content@home': {
                    templateUrl: 'template/main-learning-table.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller:'studyListCtrl'

                }
            }
        })

        .state('home.attention', { //我的关注
            url:'/attention',
            views: {
                'content@home': {
                    templateUrl: 'template/main-my-attention.html?rgg=' + Math.floor(Date.now() / 1000),
                    controller:'MyAttentionCtrl'

                }
            }
        })


});
