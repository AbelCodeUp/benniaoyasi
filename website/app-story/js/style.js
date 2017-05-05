$(function(){

	var g;//第几集
	$.ajax({
		url: 'http://w.gogo-talk.com/api/BedTimeSotry/GetBedTimeSotryList',
		data: {},
		type: 'post',
		dataType: 'json',
		success: function (res) {
//                    格式化数据
			var aData = res.DataResult;
			var aObj = {};
			aObj['G' + aData[0].Grade] = [];
			for (var i = 0; i < aData.length; i++) {
				for (var j in aObj) {
					if (j == 'G' + aData[i].Grade) {
						aObj['G' + aData[i].Grade].push(aData[i])
					} else {
						aObj['G' + aData[i].Grade] = [];
						aObj['G' + aData[i].Grade].push(aData[i])
					}
				}

			}
			addItem('vKey',aObj);

//                    绑定dom
			for (var k in aObj) {
				var str = '<div class="swiper-slide nav">' +
					'<p  data-g="'+ k+'" >'+ k +'</p>' +
					'<div class="nav-line"></div>'+
					'</div>';

				var itembox = $('<ul class="container-video-list g-bg vpanel-active">');
				for (var s = 0; s < aObj[k].length; s++) {
					var vHtml = '<li class="c-video fl">' +
						'<div class="video-box bg">' +
						'<div class="playimgbox" data-l="'+ aObj[k][s].PlayTimes +'" data-id="' +  aObj[k][s].BedtimeStoryId + '"  data-url="' + aObj[k][s].VideoUrl + '" data-name="' + aObj[k][s].StoryName + '">'+
						'<img src="' + aObj[k][s].VideoImg + 'g">' +
						'<div class="imgbox img play">' +
						'</div></div><div class="play-direction">' +
						'<p class="pname">' + aObj[k][s].StoryName + '</p>' +
						'<p class="pnum">' +
						'<span class="play-look img look"></span><span class="play-look">'+ aObj[k][s].PlayTimes +'次</span>'+
						'</p>'+
						'</div></div></li>';
					itembox.append(vHtml);
				}
				$('#nav').append(str);
				$('#container').append(itembox);
				g = $('.nav').eq(0).find('p').data('g');
				$($('.nav-line')[0]).addClass('nav-line-active');
				$($('.container-video-list')[0]).addClass('vpanel-active');
			}

			var swiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				slidesPerView: 2,
				paginationClickable: true,
				spaceBetween: 30
			});

			//var tPage = location.hash.split('#')[1];
			//$($('#itembox .list_tab_top_item')[tPage]).addClass('list_tab_top_itemcur').siblings().removeClass('list_tab_top_itemcur');
			//$($('#videobox .list_tab_bottom_itembox')[tPage]).addClass('list_tab_bottom_itembox_cur').siblings().removeClass('list_tab_bottom_itembox_cur');


		}
	});
	//页面跳转
	$('#container').on('click','.playimgbox',function(){
		var url = $(this).data('url');
		var name = $(this).data('name');
		var id =  $(this).data('id');
		var num =  $(this).data('l');
		window.location.href = 'video.html?v='+url+'&n='+ name+'&d='+id+'&l='+num+'&g='+g;
	});


	// 头部导航
	$('#nav').on('click','.nav',function(){
		var index = $(this).index();
		$(this).children('.nav-line').addClass('nav-line-active')
			.parent().siblings().find('.nav-line').removeClass('nav-line-active');
		g = $(this).children('p').data('g');
		$('.container-video-list').eq(index).addClass('vpanel-active').siblings().removeClass('vpanel-active');
	})
})	
