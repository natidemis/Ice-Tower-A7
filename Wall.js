function Wall(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.sprite = g_sprites.Wall;
    
    // Set normal drawing scale, and warp state off
    this._scale = 0.4;

    this.width = this.sprite.width*this._scale;
    this.height = this.sprite.height*this._scale;
};

Wall.prototype = new Entity();

Wall.prototype.cx = 875;
Wall.prototype.cy = 450;

Wall.prototype.update = function(du){
    spatialManager.unregister(this);

    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    this.wrapPosition();

    spatialManager.register(this);
};

Wall.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;

    this.sprite.scale = this._scale;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, 0
    );
    this.sprite.scale = origScale;
};