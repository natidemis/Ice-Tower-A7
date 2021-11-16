function Floorboards(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.sprite = g_sprites.floorboard;
    
    // Set normal drawing scale, and warp state off
    this._scale = 0.05;

    this.width = this.sprite.width*this._scale;
    this.height = this.sprite.height*this._scale;
    
};

Floorboards.prototype = new Entity();

Floorboards.prototype.cx = 0;
Floorboards.prototype.cy = 0;
Floorboards.prototype.level = 0;


Floorboards.prototype.update = function(du) {
    spatialManager.unregister(this);
    var velY = entityManager._speed;
    this.cy = this.cy + velY*du;

    if(this.cy > g_canvas.height+500 || this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    spatialManager.register(this);
};

Floorboards.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;

    this.sprite.scale = this._scale;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, 0
    );
    this.sprite.scale = origScale;
    ctx.font ="bold 14px verdana";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(this.level,this.cx, this.cy+7);
};