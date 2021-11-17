function Combo() {
};

Combo.prototype = new Entity();

Combo.prototype.cx = g_canvas.width*0.09;
Combo.prototype.cy = g_canvas.height*0.9;
Combo.prototype.meter = 0;
Combo.prototype.delta = 0.005;


Combo.prototype.update = function(du) {
    if(entityManager._players[0]._isBoostJumping){
        this.meter = 1;
    } else {
        this.meter -= this.delta*du;
        if(this.meter < 0){
            this.meter = 0;
        }
    }
};

Combo.prototype.render = function (ctx) {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.fillRect(this.cx, this.cy, 20, -(this.meter/1)*100);
    ctx.restore();
};