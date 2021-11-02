function Wall(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.sprite = g_sprites.wall;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1;

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
    if(this.align === "left"){
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, 1*Math.PI

    );
    }
    else{
        this.sprite.drawCentredAt(
            ctx, this.cx, this.cy, 2*Math.PI
    
        );
    }
    this.sprite.scale = origScale;
};