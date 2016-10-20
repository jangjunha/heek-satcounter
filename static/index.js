function calc(dms) {
	var ms = dms;
        var sec = ms / 1000;    ms %= 1000;
        var min = sec / 60;             sec %= 60;
        var hr = min / 60;              min %= 60;
        var day = hr / 24;              hr %= 24;
        ms = Math.floor(ms);
        sec = Math.floor(sec);
        min = Math.floor(min);
        hr = Math.floor(hr);
        day = Math.floor(day);

        var blue = Math.floor(dms / (365 * 24 * 60 * 60 * 1000) * 255);
        var red = 255 - blue;
        var color = 'rgb(' + red + ',' + blue + ',0)';

	return {'color': color, 'day': day, 'hr': hr, 'min': min, 'sec': sec, 'ms': ms};
}


$(document).ready(function() {
	$('#message').keypress(function(e) {
		if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			submit();
			return false;
		}
		return true;
	});

	var a9 = false;
	setInterval(function() {
		var now = new Date();
		then_a9 = new Date(2016, 5 - 1, 25, 14, 00, 0, 0);
		then = new Date(2016, 11 - 1, 17, 8, 40, 0, 0);

		var dms = then.getTime() - now.getTime();
		if (then_a9.getTime() - now.getTime() > 0) {
            then = then_a9;
            dms = then_a9.getTime() - now.getTime();
		}

		var res = calc(dms);		

		$('#day').text(res.day + '일');
		$('#hr').text(res.hr + '시간');
		$('#min').text(res.min + '분');
		$('#sec').text(res.sec + '초');
		$('#ms').text(res.ms);

		$('#time').css('color', res.color);
	},25);
});
