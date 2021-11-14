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
    this.spriteArray = g_spritessheetsprite;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1.4;

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
Player.prototype.gAccel = 0.7;

Player.prototype.jumpVel = 3;

Player.prototype._isJumping = false;

// sound managers
Player.prototype._landed = false;
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
        this.velX *= -1;
    }

    else if(this.cx < 40){
        this.velX *= -1;
    }    
}

Player.prototype.update = function (du){
    spatialManager.unregister(this);

    // apply acceleration
    this.applyAccelX(du);
    // update position
    this.cx += this.velX;   

    if((keys[this.KEY_JUMP] && (this.velY == 0)) && this.velX < (0.79*this.maxVelX)){
        this.velY -= 14;
        this._isJumping = true;
        keys[this.KEY_JUMP] = false;
    }

    if((keys[this.KEY_JUMP] && (this.velY == 0)) && this.velX > (0.8*this.maxVelX)){
        this.velY -= 30;
        this._isJumping = true;
        keys[this.KEY_JUMP] = false;
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
            this.velY = 0;
            this.cy = floorY; 
            if(this._landed){
                this.landingSound.play();
                this._landed = false;
                
            }
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

var cellIdx = 14;
// ... veiða úr sprite
Player.prototype.render = function (ctx){
    
  // if is stationary
  console.log("stationary", this.isStationary());
    // if is running
    // if is jumping stationary (xvel = 0)
    // if is jumping
    // if is falling
    // if is boostjump
        // setja rotation ?

    // if is landing




    // spegla fyrir vinstri
    var spritePlayer = this.spriteArray[cellIdx];

    // pass my scale into the sprite, for drawing
    spritePlayer.scale = this._scale;
    spritePlayer.drawAt(
	    ctx, this.cx, this.cy, this.rotation
    );
    //cellIdx += 1;
    //cellIdx %= 1;
};

Player.prototype.isStationary = function() {
    if (Math.abs(this.velX) <= 0.0001 && Math.abs(this.velY) <= 0.0001) {
      return true;
    } else
      return false;
};

Player.prototype.isRunning = function() {};
Player.prototype.isJumpingStationary = function() {
  
};
Player.prototype.isJumping = function() {};
Player.prototype.isFalling = function() {};
Player.prototype.isBoostJumping = function() {};
Player.prototype.isLanding = function() {};
