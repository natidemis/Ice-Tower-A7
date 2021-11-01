function Floor(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();
    
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.floor;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1;
    this._isWarping = false;
};

Floor.prototype = new Entity();

Floor.prototype.cx = 300;
Floor.prototype.cy = 550;

Floor.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;

    this.sprite.scale = this._scale;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, 0
    );
    this.sprite.scale = origScale;
}