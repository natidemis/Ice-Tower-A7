// ==========
// PLAYER STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Player(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();
    
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.player;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1;
};

Player.prototype = new Entitiy();

Player.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Player.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

Player.prototype.KEY_JUMP   = ' '.charCodeAt(0);

Player.prototype.cx = 300;
Player.prototype.cy = 500;
Player.prototype.velX = 0;
Player.prototype.velY = 0;

Player.prototype.jumpVel = 3;

Player.prototype._isJumping = function (du){

};

Player.prototype.update = function (du){
    spatialManager.unregister(this);

    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    /** this._isJumping(); */

    /** if(this._isfallen){
     * DO something 
    } */

    spatialManager.register(this);
};

Player.prototype.render = function (ctx){
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
    );
    this.sprite.scale = origScale;
};
