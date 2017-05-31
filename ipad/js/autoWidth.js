(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>750) clientWidth=750;//这里限制最大的宽度尺寸，从而实现PC端的两边留白等
            docEl.style.fontSize = 10 * (clientWidth / 877) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    
	// 判断是否为 iPhone ： 
	function isAppleMobile() { 
	    return (navigator.platform.indexOf('iPad') != -1); 
	}; 
})(document, window);