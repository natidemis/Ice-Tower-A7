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
    
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.player;
    
    // Set normal drawing scale, and warp state off
    this._scale = 0.2;

    this.width = this.sprite.width*this._scale;
    this.height = this.sprite.height*this._scale;
};

Player.prototype = new Entity();

Player.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Player.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

Player.prototype.KEY_JUMP   = ' '.charCodeAt(0);

Player.prototype.cx = 300;
Player.prototype.cy = 50;
Player.prototype.velX = 0;
Player.prototype.velY = 0;

Player.prototype.jumpVel = 3;

Player.prototype._isJumping = false;

Player.prototype.update = function (du){
    spatialManager.unregister(this);

    if(keys[this.KEY_RIGHT]){
        this.cx += 5*du;
    }

    if(keys[this.KEY_LEFT]){
        this.cx -= 5*du;
    }
        

    if(keys[this.KEY_JUMP] && (this.velY == 0)){
        this.velY -= 20;
        this._isJumping = true;
    }

    if(this.velY < 25){
        this.velY += 0.8*du;
    }

    // if falling
    if(0 < this.velY){
        var floorY = spatialManager.findEntityInRange(this.cx, this.cy, this.width, this.height)
        // is colliding?
        if (floorY){
            this.cy = floorY;
            this.velY = 0;
        }    
    }

    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    this.cy += this.velY * du;

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
