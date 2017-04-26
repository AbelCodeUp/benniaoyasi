//提示消息类 
var tips = {
	temp: {},
	/*** 
	 * 弹出提示 
	 * 
	 * @param string msg 提示文字内容 
	 * @param string id 要弹出提示的目标对象的id,如果id错误/null/false/0则主窗口弹出 
	 * @param int time 定时消失时间毫秒数,如果为null/0/false则不定时 
	 * @param string color 提示内容的背景颜色格式为#000000 
	 * @param int width 提示窗宽度,默认300 
	 */
	show: function(msg, id, time, color, width) {
		var target = this._get(id);
		if (!target) {
			id = 'window';
		}

		//如果弹出过则移除重新弹出 
		if (this._get(id + '_tips')) {
			this.remove(id);
		}

		//设置默认值 
		msg = msg || 'error';
		color = color || '#ea0000';
		width = width || 300;
		time = time ? parseInt(time) : false;

		if (id == 'window') {
			var y = document.body.clientHeight / 2 + document.body.scrollTop;
			var x = (document.body.clientWidth - width) / 2;
			var textAlign = 'center',
				fontSize = '15',
				fontWeight = 'bold';
		} else {
			//获取对象坐标信息 
			for (var y = 0, x = 0; target != null; y += target.offsetTop, x += target.offsetLeft, target = target.offsetParent);
			var textAlign = 'left',
				fontSize = '12',
				fontWeight = 'normal';
		}

		//弹出提示 
		var tipsDiv = this._create({
			display: 'block',
			position: 'absolute',
			zIndex: '1001',
			width: (width - 2) + 'px',
			left: (x + 1) + 'px',
			padding: '5px',
			color: '#ffffff',
			fontSize: fontSize + 'px',
			backgroundColor: color,
			textAlign: textAlign,
			fontWeight: fontWeight,
			filter: 'Alpha(Opacity=50)',
			opacity: '0.7'
		}, {
			id: id + '_text',
			innerHTML: msg,
			onclick: function() {
				tips.hidden(id);
			}
		});
		document.body.appendChild(tipsDiv);
		tipsDiv.style.top = (y - tipsDiv.offsetHeight - 12) + 'px';
		document.body.appendChild(this._create({
			display: 'block',
			position: 'absolute',
			zIndex: '1000',
			width: (width + 10) + 'px',
			height: (tipsDiv.offsetHeight - 2) + 'px',
			left: x + 'px',
			top: (y - tipsDiv.offsetHeight - 11) + 'px',
			backgroundColor: color,
			filter: 'Alpha(Opacity=50)',
			opacity: '0.7'
		}, {
			id: id + '_bg'
		}));
		if (id != 'window') {
			var arrow = this._create({
				display: 'block',
				position: 'absolute',
				overflow: 'hidden',
				zIndex: '999',
				width: '20px',
				height: '10px',
				left: (x + 20) + 'px',
				top: (y - 13) + 'px'
			}, {
				id: id + '_arrow'
			});
			arrow.appendChild(this._create({
				display: 'block',
				overflow: 'hidden',
				width: '0px',
				height: '10px',
				borderTop: '10px solid ' + color,
				borderRight: '10px solid #fff',
				borderLeft: '10px solid #fff',
				filter: 'Alpha(Opacity=70)',
				opacity: '0.8'
			}));
			document.body.appendChild(arrow);
		}

		//标记已经弹出 
		this.temp[id] = id;

		//如果定时关闭 
		if (time) {
			setTimeout(function() {
				tips.hidden(id);
			}, time)
		}

		return id;
	},
	/*** 
	 * 隐藏提示 
	 * 
	 * @param string id 要隐藏提示的id,如果要隐藏主窗口提示id为window,如果要隐藏所有提示id为空即可 
	 */
	hidden: function(id) {
		if (!id) {
			for (var i in this.temp) {
				this.hidden(i);
			}
			return;
		}
		var t = this._get(id + '_text'),
			d = this._get(id + '_bg'),
			a = this._get(id + '_arrow');
		if (t) {
			t.parentNode.removeChild(t);
		}
		if (d) {
			d.parentNode.removeChild(d);
		}
		if (a) {
			a.parentNode.removeChild(a);
		}
	},
	_create: function(set, attr) {
		var obj = document.createElement('div');
		for (var i in set) {
			obj.style[i] = set[i];
		}
		for (var i in attr) {
			obj[i] = attr[i];
		}
		return obj;
	},
	_get: function(id) {
		return document.getElementById(id);
	}
};