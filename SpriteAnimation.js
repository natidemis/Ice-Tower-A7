function SpriteAnimation(sx, sy, width, height) {
    this.sx = sx;
    this.sy = sy;
    this.width = width;
    this.height = height;
    this.image = g_images.spritesheet;
}

SpriteAnimation.prototype.drawAt = function (ctx, cx, cy, rotation, flip) {
    ctx.save();
    ctx.translate(cx, cy);
    if (flip) {
      ctx.scale(-this.scale, this.scale)
    } else
      ctx.scale(this.scale, this.scale);
    ctx.rotate(rotation)
    ctx.translate(-cx,-cy);
    ctx.drawImage(this.image, this.sx, this.sy, this.width, this.height,
        cx-this.width/2 , cy-this.height/2 , this.width, this.height);
    ctx.restore();
}

SpriteAnimation.prototype.drawAtOpac = function (ctx, cx, cy, rotation, flip, opac) {
    ctx.save();
    ctx.globalAlpha = opac;
    ctx.translate(cx, cy);
    if (flip) {
      ctx.scale(-this.scale, this.scale)
    } else
      ctx.scale(this.scale, this.scale);
    ctx.rotate(rotation)
    ctx.translate(-cx,-cy);
    ctx.drawImage(this.image, this.sx, this.sy, this.width, this.height,
        cx-this.width/2 , cy-this.height/2 , this.width, this.height);
    ctx.restore();
}

/*SpriteAnimation.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {
    if (rotation === undefined) rotation = 0;
    
    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);
    
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    ctx.drawImage(this.image, this.sx, this.sy, this.width, this.height,
        cx , cy , this.width, this.height);
    
    ctx.restore();
};*/  