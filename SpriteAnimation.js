function SpriteAnimation(sx, sy, width, height) {
    this.sx = sx;
    this.sy = sy;
    this.width = width;
    this.height = height;
    this.image = g_images.spritesheet;
}

SpriteAnimation.prototype.drawAt = function (ctx, cx, cy) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(this.scale, this.scale);
    ctx.translate(-cx,-cy);
    ctx.drawImage(this.image,
         this.sx + 3, this.sy + 8, this.width, this.height,
         cx , cy , this.width, this.height);
    ctx.restore();
}


