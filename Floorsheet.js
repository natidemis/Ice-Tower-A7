function SpriteFloor(sx, sy, width, height) {
    this.sx = sx;
    this.sy = sy;
    this.width = width;
    this.height = height;
    this.image = g_images.floorspritesheet;
}

SpriteFloor.prototype.drawAt = function (ctx, cx, cy, rotation, flip) {
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