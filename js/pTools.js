window.pTools = {

    isBigEndian: function () {
        var endianCanvas = document.createElement('canvas');
        endianCanvas.width = endianCanvas.height = 1;
        var endianData = endianCanvas.getContext('2d').getImageData(0, 0, 1, 1).data;
        var endianData32 = new Int32Array(endianData.buffer);
        endianData32[0] = 0x01020304;
        return (endianData[0] === 1 && endianData[1] === 2 && endianData[3] === 3 && endianData[4] === 4)
    },

    hsv2rgb: function (h, s, v) {
        if (s === 0)
            return [v, v, v];
        var hi = ~~(h / 60);
        var f = h / 60 - hi;
        f = (hi === 1 || hi === 3 || hi === 5) ? f : (1 - f);
        var p = v * (1 - s);
        var qt = v * (1 - s * f);
        switch (hi) {
            case 0:
            case 6:
                return [v, qt, p];
                break;
            case 1:
                return [qt, v, p];
                break;
            case 2:
                return [p, v, qt];
                break;
            case 3:
                return [p, qt, v];
                break;
            case 4:
                return [qt, p, v];
                break;
            case 5:
                return [v, p, qt];
                break;
        }

    },
    rgb2hsv: function (r, g, b) {
        var max = (r > g && r > b) ? r : (g > b) ? g : b;
        var min = (r < g && r < b) ? r : (g < b) ? g : b;
        var h = max === min ? 0 : (60 * (max === r ? ((g - b) / (max - min)) : (max === g ? (2 + ((b - r) / (max - min))) : (4 + ((r - g) / (max - min))))));
        if (h < 0)h += 360;
        var s = max === 0 ? 0 : ((max - min) / max);
        return [h, s, max];
    },
    stopWatch: {
        time: 0,
        times: [],
        reset: function () {
            console.log('---StopWatch--- START');
            this.time = new Date().getTime();
        },
        lap: function (name) {
            var tname = name || ('Lap ' + this.times.length);
            var lapTime = new Date().getTime() - this.time;
            console.log('---StopWatch--- LAP (' + tname + '): ' + lapTime);
            this.times[tname] = lapTime;
            this.time = new Date().getTime();
        }
    },
    rgb2ycc: function (r, g, b) {
        return [
            0.299 * r + 0.587 * g + 0.114 * b,
            128 - 0.168736 * r - 0.331264 * g + 0.5 * b,
            128 + 0.5 * r - 0.418688 * g - 0.081312 * b
        ]
    },

    ycc2rgb: function (y, cb, cr) {
        return [
            y + 1.402 * (cr-128),
            y - 0.3441 * (cb-128) - 0.7141 * (cr-128),
            y + 1.772 * (cb-128)
        ]
    }

}