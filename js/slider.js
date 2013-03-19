
function Slider(min, max, step, val, height, width) {
    this.val = val || 0;
    this.min = min || 0;
    this.max = max || 100;
    this.step = step || 1;
    this.onChange = null;
    this.height = height || 12;
    this.width = width || 150;
    var self = this;
    var omm, omu, lastX, lastY;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.onmousedown = function(e) {
        omm = document.onmousemove;
        omu = document.onmouseup;
        lastX = e.pageX;
        lastY = e.pageY;
        var osLeft = 0, osTop = 0, el = this
        self.change(e.pageX- $(self.canvas).offset().left, 0);

        document.onmousemove = function(e) {
            omm && omm();
            console.log(self);
            self.change(e.pageX- $(self.canvas).offset().left, 0);
        }
        document.onmouseup = function() {
            omu && omu();
            document.onmousemove = omm;
            document.onmouseup = omu;
        }
    }
    this.change = function(newX, newY) {
 //       console.log(this.val+", "+newX);
        var dX = newX - lastX;
        var dY = lastY - newY;
        //this.val += Math.abs(dX) > Math.abs(dY) ? dX : dY;
        this.val = newX/this.width*(this.max-this.min)+this.min;
        lastX = newX;
        lastY = newY;
        if (this.val < this.min)
            this.val = this.min;
        if (this.val > this.max)
            this.val = this.max;
        this.draw();
        this.onChange && this.onChange();
    }
    this.draw = function() {
        var ctx = this.ctx;
        var hs = this.size / 2;
        ctx.clearRect(0,0,this.width,this.height);
        ctx.fillStyle = "rgba(0,0,0,.25)";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle ="#999";
        ctx.fillRect(0,0,this.width*(this.val-this.min)/(this.max-this.min),this.height);
//        ctx.fillRect(0,0,100,100);
/*        ctx.lineWidth = 2;
        ctx.shadowColor = "#000";
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(hs, hs, hs - 4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        var aVal = ((this.val - this.min) / (this.max - this.min)) * Math.PI * 1.5 + Math.PI * .75;
        ctx.beginPath();
        ctx.moveTo(hs, hs);
        ctx.lineTo(hs + Math.cos(aVal) * (hs - 4), hs + Math.sin(aVal) * (hs - 4));
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(1, this.size - 1);
        ctx.lineTo(this.size*.15, this.size*.85);
        ctx.moveTo(this.size - 1, this.size - 1);
        ctx.lineTo(this.size *.85, this.size *.85);
        ctx.stroke();  */
    }
    this.draw();
}
