function Background(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.sprite = g_sprites.background;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1;

    this.width = this.sprite.width*this._scale;
    this.height = this.sprite.height*this._scale;
};
