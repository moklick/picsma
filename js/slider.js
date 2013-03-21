function Slider(min, max, step, val, height, width) {
    "use strict";
    this.val = val || 0;
    this.min = min || 0;
    this.max = max || 100;
    this.step = step || 1;
    this.onChange = null;
    this.height = height || 12;
    this.width = width || 150;
    this.active=false;
    var self = this;
    var omm, omu;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.onmousedown = function(e) {
        e.preventDefault();
        omm = document.onmousemove;
        omu = document.onmouseup;
        self.active=true;
        self.change(e.pageX- $(self.canvas).offset().left);

        document.onmousemove = function(e) {
            e.preventDefault();
            omm && omm();
            self.change(e.pageX- $(self.canvas).offset().left);
        }

        document.onmouseup = function() {
            e.preventDefault();
            omu && omu();
            document.onmousemove = omm;
            document.onmouseup = omu;
            self.active=false;
            self.draw();
        }
    }
    this.change = function(newX) {
        this.val = newX/this.width*(this.max-this.min)+this.min;
        if (this.val < this.min)
            this.val = this.min;
        if (this.val > this.max)
            this.val = this.max;
        this.draw();
        this.onChange && this.onChange();
    }
    this.draw = function() {
        var ctx = this.ctx;
        ctx.clearRect(0,0,this.width,this.height);
        ctx.fillStyle = "rgba(0,0,0,.25)";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle =this.active?"#ccc":"#999";
        ctx.fillRect(0,0,this.width*(this.val-this.min)/(this.max-this.min),this.height);
    }
    this.draw();
}
