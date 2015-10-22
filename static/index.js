$(document).ready(function() {
	$('#message').keypress(function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			submit();
			return false;
		}
		return true;
	});

	
	setInterval(function() {
		var now = new Date();
		then = new Date(2015, 10, 12, 8, 40, 0, 0);
		then_next = new Date(2016, 11 - 1, 17, 8, 40, 0, 0);

		var dms = then.getTime() - now.getTime();
		if (dms < 0) {
			then = then_next;
			dms = then.getTime() - now.getTime();
		}

		var ms = dms;
		var sec = ms / 1000;	ms %= 1000;
		var min = sec / 60;		sec %= 60;
		var hr = min / 60;		min %= 60;
		var day = hr / 24;		hr %= 24;
		ms = Math.floor(ms);
		sec = Math.floor(sec);
		min = Math.floor(min);
		hr = Math.floor(hr);
		day = Math.floor(day);

		var blue = Math.floor(dms / (365 * 24 * 60 * 60 * 1000) * 255);
		var red = 255 - blue;
		var color = 'rgb(' + red + ',' + blue + ',0)';

		var res = day + "일 " + hr + "시간 " + min + "분 " + sec + "초 " + ms;
		$('#time').text(res);
		$('#time').css('color', color);
	},25);
});
