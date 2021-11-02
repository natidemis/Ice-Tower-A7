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

    this.landingSound = new Audio(
        "sounds/domm(landing).ogg"
    );

    this.yo = new Audio(
        "sounds/yo.ogg"
    );
};

Player.prototype = new Entity();

Player.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Player.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

Player.prototype.KEY_JUMP   = ' '.charCodeAt(0);

Player.prototype.cx = 300;
Player.prototype.cy = 50;
Player.prototype.velX = 0;
Player.prototype.velY = 0;

Player.prototype.accelX = 0.3;
Player.prototype.maxVelX = 15;
Player.prototype.maxFallingVel = 25;
Player.prototype.friction = 0.9;
Player.prototype.gAccel = 0.8;

Player.prototype.jumpVel = 3;

Player.prototype._isJumping = false;

//sound managers
Player.prototype._landed = true;
Player.prototype._initState = true;

// þarf líklegast að tweaka gildin sem eru notuð her
Player.prototype.applyAccelX = function (du) {
     
    if(keys[this.KEY_RIGHT]){
        if (this.velX < this.maxVelX) 
            this.velX += this.accelX * du;
    }

    if(keys[this.KEY_LEFT]){
        if (this.velX > -this.maxVelX)
            this.velX -= this.accelX * du;
    }
    // friction if both or neither are pressed
    if (!(keys[this.KEY_RIGHT] || keys[this.KEY_LEFT]) ||
        (keys[this.KEY_RIGHT] && keys[this.KEY_LEFT])) {
        this.velX *= this.friction * du;
    }
    
}

Player.prototype.wallcollide = function (du){
    if(this.cx > 860){
        this.cx = 860;
        this.velX *= -1;
        console.log("wall");
    }

    else if(this.cx < 40){
        this.cx = 40;
        this.velX *= -1;
    }    
}

Player.prototype.update = function (du){
    spatialManager.unregister(this);

    // update position
    this.cx += this.velX * du;
    // apply acceleration
    this.applyAccelX(du);
        

    if((keys[this.KEY_JUMP] && (this.velY == 0)) && this.velX < (0.2*this.maxVelX)){
        this.velY -= 20*du;
        this._isJumping = true;
    }

    if((keys[this.KEY_JUMP] && (this.velY == 0)) && this.velX > (0.8*this.maxVelX)){
        this.velY -= 30*du;
        this._isJumping = true;
    }

    if(this.velY < this.maxFallingVel){
        this.velY += this.gAccel*du;
    }

    this.wallcollide();

    // if falling
    if(0 < this.velY){
        var floorY = spatialManager.findEntityInRange(this.cx, this.cy, this.width, this.height)
        // is colliding?
        if (floorY){
            if(this._landed){
                this.landingSound.play();
                this._landed = false;
            }
            this.cy = floorY; 
            this.velY = 0;
        }else{
            this._landed = true;
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
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
    );
    this.sprite.scale = origScale;
};
