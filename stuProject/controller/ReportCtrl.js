var ReportCtrl = angular.module('ReportCtrl', []);
ReportCtrl.controller('ReportListCtrl', function($scope, $rootScope, $cookies, httpService) {

    //右边栏显示隐藏
    $rootScope.isShowRightBar = false;

    $scope.noData = false; //默认没有数据
    httpService.get(_AjaxURL.GetReportsList, {

        })
        .success(function(res) {
            if (res.result == 1) {
                $scope.weekReports = [];
                $scope.monReports = [];
                $scope.rePorts = res.data;
                for (var i = 0; i < $scope.rePorts.length; i++) {
                    if ($scope.rePorts[i].IsDemo == '周报') {
                        $scope.weekReports.push($scope.rePorts[i]);
                    } else if ($scope.rePorts[i].IsDemo == '体验报告') {
                        $scope.monReports.push($scope.rePorts[i]);
                    }
                }
                if (res.data.length == 0) {
                    $scope.noData = true;
                }
            }
        })

});
ReportCtrl.controller('ReportDetailCtrl', function($scope, $rootScope, $cookies, httpService) {



});
ReportCtrl.controller('weekReportDetailCtrl', function($scope, $rootScope, $cookies, httpService, $stateParams) {

    $scope.weekId = $stateParams.weekId;

    httpService.get(_AjaxURL.GetWeekReportInfo, {
            'weekId': $scope.weekId
        })
        .success(function(res) {
            if (res.result == 1) {

                $scope.weekDetail = res.data;

                var maxLen = 160;

                if (res.data.StudentDes.length >= maxLen) {
                    $scope.StudentDes = res.data.StudentDes.substring(0, maxLen);
                } else {
                    $scope.StudentDes = res.data.StudentDes;
                }

                $scope.CodeImage ='http://'+ location.host + res.data.CodeImage;
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

    setTimeout(print, 1000);

    function print() {
        html2canvas($("div#weekDown"), {
            onrendered: function(canvas) {
                $('#down_button').attr('href', canvas.toDataURL());
                $('#down_button').attr('download', 'myjobdeer.png');
            }
        });
    }



});