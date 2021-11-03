function Floor(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.sprite = g_sprites.floor;
    
    // Set normal drawing scale, and warp state off
    this._scale = 0.3;

    this.width = this.sprite.width*this._scale;
    this.height = this.sprite.height*this._scale;
};

Floor.prototype = new Entity();

Floor.prototype.cx = 300;
Floor.prototype.cy = 800;


Floor.prototype.update = function(du) {
    spatialManager.unregister(this);

    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    this.wrapPosition();

    spatialManager.register(this);
};

Floor.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;

    this.sprite.scale = this._scale;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, 0
    );
    this.sprite.scale = origScale;
};