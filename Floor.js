function Floor(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.floor;
    
    // Set normal drawing scale, and warp state off
    this._scale = this.scale || 1;
};

Floor.prototype = new Entity();

Floor.prototype.cx = 300;
Floor.prototype.cy = 550;

Floor.prototype.update = function(du) {
    spatialManager.unregister(this);

    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    this.cx  * du;
    this.cy  * du;

    this.wrapPosition();

    spatialManager.register(this);
};

Floor.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;

    this.sprite.scale = 1.5
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, 0
    );
    this.sprite.scale = origScale;
};