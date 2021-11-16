function Floor(descr, idx, xScale = 0.32) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    this.floor = g_floors[idx];
    // Set normal drawing scale, and warp state off
    this._scale = 0.32;
    this._xScale = xScale;

    this.height = this.floor.height*this._scale;
    this.width = this.floor.width*xScale;
    
};

Floor.prototype = new Entity();

Floor.prototype.cx = 0;
Floor.prototype.cy = 0;


Floor.prototype.update = function(du) {
    spatialManager.unregister(this);
    var velY = entityManager._speed;
    this.cy = this.cy + velY*du;

    if(this.cy > g_canvas.height+500){
        return entityManager.KILL_ME_NOW;
    }

    spatialManager.register(this);
};

Floor.prototype.render = function (ctx) {
    this.floor.scale = this._scale;
    this.floor.drawAt(
        ctx, this.cx, this.cy, 0, this._xScale
    );
};