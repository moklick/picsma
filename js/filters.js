CanvasRenderingContext2D.prototype.picsma = {

    grayscale: function () {
        var imgdata = this.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        var data = imgdata.data;
        for (var i = data.length - 4; i >= 0; i = i - 4)
            data[i] = data[i + 1] = data[i + 2] = ~~(data[i] * .299 + data[i + 1] * .587 + data[i + 2] * .114)
        this.putImageData(imgdata, 0, 0);
    },

    errorDiffusion: function () {
        var w = this.canvas.clientWidth, h = this.canvas.clientHeight;
        var imgdata = this.getImageData(0, 0, w, h);
        var data = imgdata.data;
        var newdata = new Int32Array(data);
        var x, y, c, e, n, p0, p1, p2, p3;
        for (x = 0; x < w; x++)
            for (y = 0; y < h; y++) {
                p0 = (y * w + x) * 4;
                p1 = x === w - 1 ? null : (y * w + x + 1) * 4;
                p2 = y === h - 1 ? null : (y * w + x + w) * 4;
                p3 = x === w - 1 || y === h - 1 ? null : (y * w + x + 1 + w) * 4;
                for (c = 0; c < 4; c = c + 1) {
                    n = newdata[p0 + c] < 128 ? 0 : 255;
                    e = newdata[p0 + c] - n;
                    newdata[p0 + c] = n;
                    p1 && (newdata[p1 + c] += e >> 1);
                    p2 && (newdata[p2 + c] += e >> 2);
                    p3 && (newdata[p3 + c] += e >> 2);
                }
            }
        data.set(newdata);
        this.putImageData(imgdata, 0, 0);
    },

    median: function (rad) {
        var w = this.canvas.clientWidth, h = this.canvas.clientHeight;
        var imgdata = this.getImageData(0, 0, w, h);
        var oriimgdata = this.getImageData(0, 0, w, h);
        var data = new Int32Array(imgdata.data.buffer);
        var oridata = new Int32Array(oriimgdata.data.buffer);
        var vals = new Array((rad * 2 + 1) * (rad * 2 + 1));
        var x, y, xx, yy, mx, my, p;
        var l, r, k, x, i, j, t, pivotIndex, start, end, pivotValue, tmp;
        for (x = 0; x < w; x++) {
            for (y = 0; y < h; y++) {
                for (xx = x - (x === 0 ? 0 : rad), mx = x + (x === (w - 1) ? 0 : rad), p = 0; xx <= mx; xx = xx + 1) {
                    for (yy = y - (y === 0 ? 0 : rad), my = y + (y === (h - 1) ? 0 : rad); yy <= my; yy = yy + 1, p = p + 1) {
                        vals[p] = oridata[yy * w + xx];
                    }
                }
                start = 0;
                end = p - 1;
                do {
                    pivotIndex = end >> 1;
                    pivotValue = BIGENDIAN ? (((vals[pivotIndex] >> 24) & 0xff) + ((vals[pivotIndex] >> 16) & 0xff) + ((vals[pivotIndex] >> 8) & 0xff)) : ((vals[pivotIndex] & 0xff) + ((vals[pivotIndex] >> 8) & 0xff) + ((vals[pivotIndex] >> 16) & 0xff));
                    tmp = vals[pivotIndex];
                    vals[pivotIndex] = vals[end];
                    vals[end] = tmp;
                    pivotIndex = start;
                    for (i = start; i < end; i = i + 1) {
                        if ((BIGENDIAN ? (((vals[i] >> 24) & 0xff) + ((vals[i] >> 16) & 0xff) + ((vals[i] >> 8) & 0xff)) : ((vals[i] & 0xff) + ((vals[i] >> 8) & 0xff) + ((vals[i] >> 16) & 0xff))) < pivotValue) {
                            tmp = vals[i];
                            vals[i] = vals[pivotIndex];
                            vals[pivotIndex] = tmp;
                            pivotIndex++;
                        }
                    }
                    tmp = vals[pivotIndex];
                    vals[pivotIndex] = vals[end];
                    vals[end] = tmp;
                    if (pivotIndex > (p >> 1)) {
                        end = pivotIndex - 1
                    } else if (pivotIndex < (p >> 1)) {
                        start = pivotIndex + 1
                    }
                } while (pivotIndex != (p >> 1))
                data[y * w + x] = vals[pivotIndex];
            }
        }
        this.putImageData(imgdata, 0, 0);
    },

    raster: function (size) {
        var w = this.canvas.clientWidth, h = this.canvas.clientHeight, imgdata = this.getImageData(0, 0, w, h);
        var data = imgdata.data;
        var blocksX = Math.ceil(w / size), blocksY = Math.ceil(h / size);
        var r = 0, g = 0, b = 0, c = 0;
        for (var x = 0; x < blocksX; x += size) {
            for (var y = 0; y < blocksY; y += size) {
                r = g = b = 0;
                for (var xx = (x + size) >= w ? w - 1 : x + size; xx >= x; xx--) {
                    for (var yy = (y + size) >= h ? h - 1 : y + size; yy >= y; yy--) {
                        c++;

                    }
                }
            }
        }
        this.putImageData(imgdata, 0, 0);
    }
}
