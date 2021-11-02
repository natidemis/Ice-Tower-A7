function Floor(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.sprite = g_sprites.floor;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1.5;

    this.width = this.sprite.width;
    this.height = this.sprite.height;
};

Floor.prototype = new Entity();

Floor.prototype.cx = 300;
Floor.prototype.cy = 550;


Floor.prototype.update = function(du) {
    spatialManager.unregister(this);
    w = this.sprite.width;
    h = this.sprite.height;

    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    this.cx * du;
    this.cy * du;

    this.wrapPosition();

    spatialManager.register(this);
};

Floor.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;

    this.sprite.scale = 1.5;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, 0
    );
    this.sprite.scale = origScale;
};