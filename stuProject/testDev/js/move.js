	var timer = null;
	function startMove(obj,attr,iTarget){

		clearInterval(timer);

		timer = setInterval(function(){

			var iCur = parseInt(getStyle(obj,attr));
			
			var iSpeed = (iTarget - iCur)/8;

			iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

			if(iTarget == iCur){
				clearInterval(timer);
			}
			else{
				obj.style[attr] = iCur + iSpeed + 'px';
			}
		},30);


	}
	function getStyle(obj,attr){

		if(getComputedStyle){
			return getComputedStyle(obj,false)[attr];
		}
		else{
			return obj.currentStyle[attr];
		}

	}
