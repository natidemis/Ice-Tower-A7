function SpriteAnimation(sx, sy, width, height) {
    this.sx = sx;
    this.sy = sy;
    this.width = width;
    this.height = height;
    this.image = g_images.spritesheet;
}

SpriteAnimation.prototype.drawAt = function (ctx, x, y) {
    ctx.drawImage(this.image,
         this.sx, this.sy, this.width, this.height,
         x , y , this.width, this.height);
}


SpriteAnimation.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {
    if (rotation === undefined) rotation = 0;
    
    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);
    
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    ctx.drawImage(this.image,
      this.sx, this.sy, this.width, this.height,
      cx , cy , this.width, this.height);
    
    ctx.restore();
};  


