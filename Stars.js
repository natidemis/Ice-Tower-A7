function Star(descr, idx) {
    // Common inherited setup logic from Entity
    this.setup(descr);
    this.star = g_stars[idx];
    // Set normal drawing scale, and warp state off
    this._scale = 1;
    

    this.height = this.star.height*this._scale;
    this.width = this.star.width*this._Scale;

    this.flip = Math.random() < 0.5;
    
};

Star.prototype = new Entity();
Star.prototype.show = false;

Star.prototype.cx = 0;
Star.prototype.cy = 0;
Star.prototype.life = 1;

Star.prototype.update = function(du){
    spatialManager.unregister(this);
    this.life -= 0.01*du;
    this.cy += entityManager._speed+2*du;
    if(this.life <= 0){
        return entityManager.KILL_ME_NOW;
    }

    spatialManager.register(this);
};

Star.prototype.render = function (ctx) {
    this.star.scale = this._scale;
    this.star.drawAtOpac(
        ctx,this.cx, this.cy, 0, this._scale,this.life
    );
};