function SpriteAnimation(sx, sy, width, height) {
    this.sx = sx;
    this.sy = sy;
    this.width = width;
    this.height = height;
    this.image = g_images.spritesheet;
}

SpriteAnimation.prototype.drawAt = function (ctx, cx, cy, rotation) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(this.scale, this.scale);
    ctx.rotate(rotation)
    ctx.translate(-cx,-cy);
    ctx.drawImage(this.image, this.sx, this.sy, this.width, this.height,
        cx , cy , this.width, this.height);
    ctx.restore();
}
