function Wall(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.sprite = g_sprites.wall;
    
    // Set normal drawing scale, and warp state off
    this._scale = 0.35;

    this.width = this.sprite.width*this._scale;
    this.height = this.sprite.height*this._scale;
};

Wall.prototype = new Entity();

Wall.prototype.cx = 875;
Wall.prototype.cy = 450;

Wall.prototype.update = function(du){
    spatialManager.unregister(this);

    var velY = ((g_canvas.height-entityManager._players[0].cy)/100);
    this.cy = this.cy + velY*du;

    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    this.wrapPosition();

    spatialManager.register(this);
};

Wall.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    var rot; 
    if(this.align === "left"){
        rot = 1*Math.PI
    } else {rot = 2*Math.PI}
    this.sprite.scale = this._scale;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, rot
        );
    this.sprite.scale = origScale;
};