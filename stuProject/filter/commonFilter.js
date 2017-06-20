var comfilter = angular.module('comfilter', []);
comfilter.filter('numSplit', function() {
	return function(num) {
		if (num >= 1000) {
			return '999+';
		} else {
			return num;
		}
	}
});
comfilter.filter('dayFilter', function($rootScope, $filter) {
	return function(strDateEnd) {
		var eTime = strDateEnd.split(' ')[0];
		var sTime = $filter('date')($rootScope.serviceTime, 'yyyy-MM-dd');
		var eTimes = new Date(eTime);
		var sTimes = new Date(sTime);
		return $filter('date')(eTimes - sTimes, 'MM:dd')
	}
});
comfilter.filter('status1', function() {
	return function(num) {
		if (num == 0) {
			return '缺勤';
		} else if (num == 1) {
			return '正常';
		} else if (num == -1) {
			return '迟到';
		}
	}
});

comfilter.filter('weeks', function() {
		return function(date) {
			var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
			return weeks[new Date(date).getDay()];
		}
	})
	// 学习记录状态过滤
comfilter.filter('stuList', function() {
		return function(num) {
			if (num == 4 || num == 3) {
				return '已结束';
			} else if (num == 2) {
				return '正在进行';
			} else if (num == 0) {
				return '未上课';
			} else if (num == 1) {
				return '等待上课';
			}
		}
	})
	// 过滤半小时
comfilter.filter('fateDate', function($rootScope, $filter) {
		return function(date) {

			var date3 = new Date(date.replace(/-/g, '/')).getTime() - new Date($rootScope._serveTime).getTime();
			var diffSec = date3 / 1000 / 60;

			if (diffSec <= 10 && diffSec > -25) {
				return true;

			} else if (diffSec > 10) {

				return false;

			}
		}
	})
	//小于两小时大于半小时
comfilter.filter('fateDateHour', function($rootScope, $filter) {
	return function(date) {


		var date3 = new Date(date.replace(/-/g, '/')).getTime() - new Date($rootScope._serveTime).getTime();
		var diffSec = date3 / 1000 / 60;

		if (diffSec <= 24 * 60 && diffSec >= 30) {
			return true;
		} else {
			return false;
		}
	}
})
comfilter.filter('weekDay', function() {
	return function(date) {
			var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
			var day = new Date(date).getDay();
			return weeks[day];
		}
	})
	// 课程第几节
comfilter.filter('pageIndex', function() {
	return function(num) {
			return num + 1;
		}
	})
	// 等级状态
comfilter.filter('levelStatus', function() {
	return function(level) {
		if(level == 0){
			return '预备级1'
		}else if(level == -1){
			return '预备级2'
		}else{
			return level;
		}
	}
})
//收藏
comfilter.filter('fiiterNum', function() {
	return function(data) {
		if(data == '1'){
			return '已  约'
		}else if(data == '0'){
			return '可预约'
		}else{
			return '';
		}
	}
})
// 关注
comfilter.filter('isGuanZhu', function() {
	return function(data) {
		if(data == 1){
			return '已关注'
		}else if(data == 0){
			return '关注'
		}else{
			return '';
		}
	}
})
// 年龄
comfilter.filter('getAge', function($rootScope) {
	return function(data) {
		var serverTime = $rootScope.serviceTime;
        function getAge(t,s){
            var sTime = new Date(s);
            var tTime = new Date(t);
            return (sTime.getFullYear() - tTime.getFullYear() + 1) + '岁';
        }


		// return  getAge(data,serverTime) == NaN ? '' : getAge(data,serverTime);
		return  getAge(data,serverTime) == 'NaN岁' ? '--' : getAge(data,serverTime);
	}
})