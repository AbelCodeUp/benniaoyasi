angular.module('calendar',[])
	.directive('canlendar',function($cookies,$rootScope){
		return {
			strict:'EA',
			scope:{
				username:'@'
			},
			link:function(scope, element, attrs, ctril){
			
			var CalendarApp = function () {
		        this.$body = $("body"),
		            this.$event = ('#external-events div.external-event'),
		            this.$calendar = $(element),
		            this.$saveCategoryBtn = $('.save-category'),
		            this.$categoryForm = $('#add-category form'),
		            this.$extEvents = $('#external-events'),
		            this.$calendarObj = null
		    };
	        // 点击跳转
	        CalendarApp.prototype.clickGo = function (calEvent, jsEvent, view) {
	        	_czc.push(['_trackEvent', '日历点击进入教室', '点击', '日历点击进入教室']);
	            var $this = this;

	            if (calEvent.type == 'underway') {
	                $rootScope.goClient(calEvent.lessonId,attrs.username);
	            }

	        }

		    /* Initializing */
		    CalendarApp.prototype.init = function () {
		        /*  Initialize the calendar  */
		        var date = new Date();
		        var d = date.getDate();
		        var m = date.getMonth();
		        var y = date.getFullYear();
		        var form = '';
		        var today = new Date($.now());


		        
		        var $this = this;
		        $this.$calendarObj = $this.$calendar.fullCalendar({
		            slotDuration: '00:15:00', /* If we want to split day time each 15minutes */
		            minTime: '08:00:00',
		            maxTime: '22:00:00',
		            defaultView: 'month',
		            handleWindowResize: true,
		            timeFormat: 'H:mm',
		            titleFormat:{

					},
		            height: $(window).height() - 200,
		            
		            header: {
		                left: 'prev,next today',
		                center: 'title',
		                right: ''
		            },
		            events: function (start, end, timezone, callback){
		               $.ajax({
		                  url:_AjaxURL.GetMyLesson,
		                  type:"get",
		                  data:{
		                    'stime': '2016-11-24', 'etime': '2017-12-24'
		                  },
		                  headers: {
		                        'Content-Type': 'application/x-www-form-urlencoded'
		                        ,'Authorization': $cookies.get('tonken')
		                   },
		                  success:function(res){
		                  	if(res.result == 1){
		                  		var defaultEvents = [];
			                    for(var i =0;i<res.data.length;i++){
			                            if(res.data[i].Status <= 1){
			                                defaultEvents.push({
			                                    title: res.data[i].LessonName,
			                                    type: 'noJoinClass',
			                                    start: res.data[i].StartTime,
			                                    className: 'bg-gray', //bg-danger // bg-gray //bg-primary
			                                	lessonId:res.data[i].LessonId
			                                })
			                            }else if(res.data[i].Status == 0){
			                                defaultEvents.push({
			                                    title: res.data[i].LessonName,
			                                    type: 'haved',
			                                    start: res.data[i].StartTime,
			                                    className: 'bg-primary',
			                                    lessonId:res.data[i].LessonId //bg-danger // bg-gray //bg-primary
			                                })
			                            }else if(res.data[i].Status == 2){
			                                defaultEvents.push({
			                                    title: res.data[i].LessonName,
			                                    type: 'underway',
			                                    start: res.data[i].StartTime,
			                                    className: 'bg-danger',
			                                    lessonId:res.data[i].LessonId //bg-danger // bg-gray //bg-primary
			                                })
			                            }
			                            
			                        }
			                        callback(defaultEvents)
			                  	}else if(res.result >= 1000){
			                  		$cookies.remove('tonken');
					                $cookies.remove('username');
					                $cookies.remove('isComplete');
					                $cookies.remove('password');
					                $cookies.remove('bookingId');
					                // alert('登录时间太久，请重新登录');
					                $rootScope.$state.go('index.login');
			                  	}
		                    
		                    }
		                })
		            },
		            editable: false,
		            droppable: false, // this allows things to be dropped onto the calendar !!!
		            eventLimit: true, // allow "more" link when too many events
		            selectable: false,
		            drop: false,
		            select: false,
		            monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		            monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		            dayNames: ['周日', '周一', '周二', '周三', '周日', '周五', '周六'],
		            dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
		            buttonText: {
		                prev: '<',
		                next: '>',
		                prevYear: '<',
		                nextYear: '>',
		                today: '今天',
		                month: '月',
		                week: '周',
		                day: '日'
		            },
		            eventClick: function (calEvent, jsEvent, view) {
		                // $this.clickGo(calEvent, jsEvent, view);
		            },
		            eventMouseover: function(event, jsEvent, view){
		            	var tTitle = event.title;
		            	
		            },
					eventMouseout: function(event, jsEvent, view){
					},
					eventAfterRender:function(event, jsEvent, view){
						$('.fc-day-grid-event').tinytooltip({message: function(tip) {
        		
							return $(this).html();
						}});
						if(event.type == 'underway'){  //underway
							$(jsEvent).attr({'href':'http://learn.gogo-talk.com/stuLessonRoom.html?lessonid='+ event.lessonId +'&type=lesson&r'+ Math.random(),'target':'_blank'});
						}
					}
		        });

		        //on new event
		        this.$saveCategoryBtn.on('click', function () {
		            var categoryName = $this.$categoryForm.find("input[name='category-name']").val();
		            var categoryColor = $this.$categoryForm.find("select[name='category-color']").val();
		            if (categoryName !== null && categoryName.length != 0) {
		                $this.$extEvents.append('<div class="external-event bg-' + categoryColor + '" data-class="bg-' + categoryColor + '" style="position: relative;"><i class="fa fa-move"></i>' + categoryName + '</div>')
		                $this.enableDrag();
		            }

		        });
		    },

		        //init CalendarApp
		        $.CalendarApp = new CalendarApp, $.CalendarApp.Constructor = CalendarApp;


		//initializing CalendarApp

		    $.CalendarApp.init()
		    
			}
		}
	})