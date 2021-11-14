function Background(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.sprite = g_sprites.background;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1.5;

    this.width = this.sprite.width*this._scale;
    this.height = this.sprite.height*this._scale;
};

Background.prototype = new Entity();

Background.prototype.cx = g_canvas.width/2;
Background.prototype.cy = g_canvas.height/2;

Background.prototype.update = function(du){

    spatialManager.unregister(this);

    var velY = entityManager._speed/10;
    this.cy = this.cy + velY*du;

    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }
    this.wrapPosition();
    spatialManager.register(this);
};

Background.prototype.render = function(ctx) {
    var origScale = this.sprite.scale;
    var rot;
    this.sprite.scale = this._scale;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, rot
        );
    this.sprite.scale = origScale;
};