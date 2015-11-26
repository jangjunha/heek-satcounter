var fps = 60;
var snow_timer_id = 0;
var snow_elements = [];
var snow_maxheight;

function snowing() {
    $('#message').css('background-color', 'rgba(255, 255, 255, 0)');
    $('body').css('background-color', '#b0d0ef');

    snow_maxheight = $(document).height() * 2;
    snow_timer_id = setInterval('snow_falling()', 1000 / fps);
}

function stop_snowing() {
    if (snow_timer_id != 0) {
        clearInterval(snow_timer_id);
    }
}

function create_snow() {
    var maxwidth = $(document).width();
    var snow_elem = $('<div style="display: none; background-color: rgba(255,255,255,0.6); box-shadow: 0 0 10px rgba(255,255,255,0.6); width: 10px; height: 10px; border-radius: 5px; z-index: -1"></div>').appendTo('body');
    var left = Math.floor(Math.random() * maxwidth);
    snow_elem.css('left', left);
    snow_elem.css('top', '-32px');
    snow_elem.css('position', 'absolute');
    snow_elem.css('display', 'block');

    snow_elements.push(snow_elem);
}

function snow_falling() {
    if (Math.floor(Math.random() * fps) % Math.floor(fps * 0.8) == 0) {
        create_snow();
    }

    var top, len;
    var new_snow_elements = [];
    for (var i in snow_elements) {
        top = Number(snow_elements[i].css('top').replace('px', ''));
        top = top + 1;

        len = snow_elements.length;
        if (top < snow_maxheight) {
            new_snow_elements.push(snow_elements[i]);
        } else {
            snow_elements[i].remove();
        }

        snow_elements[i].css('top', top + 'px');
    }
    snow_elements = new_snow_elements;
}