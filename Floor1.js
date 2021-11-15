function Floor1(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.sprite = g_sprites.floor1;
    
    // Set normal drawing scale, and warp state off
    this._scale = 0.3;
    
    this.height = this.sprite.height*this._scale;
    this.width = this.sprite.width*this._scale;
    
};

Floor1.prototype = new Entity();

Floor1.prototype.cx = 0;
Floor1.prototype.cy = 0;


Floor1.prototype.update = function(du) {
    spatialManager.unregister(this);
    var velY = entityManager._speed;
    this.cy = this.cy + velY*du;

    if(this.cy > g_canvas.height+500){
        return entityManager.KILL_ME_NOW;
    }

    spatialManager.register(this);
};

Floor1.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;

    this.sprite.scale = this._scale;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, 0
    );
    this.sprite.scale = origScale;
};