function Star(descr, idx) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    this.star = g_stars[idx];
    // Set normal drawing scale, and warp state off
    this._scale = 1;
    

    this.height = this.floor.height*this._scale;
    this.width = this.floor.width*this._Scale;

    this.flip = Math.random() < 0.5;
    
};

Star.prototype = new Entity();

Star.prototype.cx = 0;
Star.prototype.cy = 0;

Star.prototype.update = function(du){
    spatialManager.unregister(this);


    spatialManager.register(this);
};

Star.prototype.render = function (ctx) {
    this.star.scale = this._scale;
    this.star.drawAt(
        ctx,this.cx, this.cy, 0, this._scale
    );
};