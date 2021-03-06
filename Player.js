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

  this.selectCharacter(menuManager.characterModel);

  // Set normal drawing scale, and warp state off
  this._scale = 1.4;

  this.width = 30 * this._scale;
  this.height = 58 * this._scale;

};

Player.prototype = new Entity();

Player.prototype.selectCharacter = function(model = 1) {
  let player1 = model === 1;
  this.player = player1 ? g_players.player1 : g_players.player2;
}

Player.prototype.KEY_JUMP = ' '.charCodeAt(0);

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
Player.prototype._isBoostJumping = false;
Player.prototype.rotation = 0;
Player.prototype.started = false;


// sound managers
Player.prototype._landed = false;
Player.prototype._initState = true;

// þarf líklegast að tweaka gildin sem eru notuð her
Player.prototype.applyAccelX = function (du) {

  if (keys[KEY_D] || keys[KEY_RIGHT_ARROW]) {
    if (this.velX < this.maxVelX)
      this.velX += this.accelX*du;
  }

  if (keys[KEY_A] || keys[KEY_LEFT_ARROW]) {
    if (this.velX > -this.maxVelX)
      this.velX -= this.accelX*du;
  }
  // friction if both or neither are pressed
  if (!((keys[KEY_D] || keys[KEY_RIGHT_ARROW]) || (keys[KEY_A] || keys[KEY_LEFT_ARROW])) ||
    ((keys[KEY_D] || keys[KEY_RIGHT_ARROW]) && (keys[KEY_A] || keys[KEY_LEFT_ARROW]))) {
    this.velX *= this.friction;
    if (Math.abs(this.velX) < 0.001) {
      this.velX = 0;
    }
  }

}

Player.prototype.wallcollide = function (du) {
  if (this.cx+16 > 850 && 0 < this.velX) {
    this.velX *= -1;
    this.cx = 840;
  }

  else if (this.cx-16 < 50 && 0 > this.velX) {
    this.velX *= -1;
    this.cx = 60;
  }
}

Player.prototype.update = function (du) {
  spatialManager.unregister(this);

  if(g_canvas.height < this.cy - this.height/2){
    playGameOver();
    window.alert("Your score was: "+ (Math.round(g_score-(g_score % 10))));
    entityManager.resetEntities();
    playTryAgain();
  }

  // apply acceleration
  this.applyAccelX(du);
  // update position
  this.cx += this.velX*du;

  if (keys[KEY_NUMPAD_9]) {
      this.velY -= 10;
  }

  if (this._isBoostJumping) {
    this.rotation = (this.rotation + 0.2 * du) % (2 * Math.PI);
  }

  if ((keys[this.KEY_JUMP] && (this.velY == 0)) && ((this.velX < 0.79 * this.maxVelX) && (this.velX > 0.79 * (-this.maxVelX)))) {
    this._isJumping = true;
    this.started = true;
    if ( (this.velX > 0.5 * this.maxVelX) || (this.velX < 0.5 * (-this.maxVelX))){
      this.velY -= 20;
      playJumpMed();
    }else{
      this.velY -= 17;
      playJumpNormal();
    }
  }

  if ((keys[this.KEY_JUMP] && (this.velY == 0)) && (this.velX > 0.8 * this.maxVelX)) {
    this.velY -= 30;
    this._isJumping = true;
    this.started = true;
    playJumpHigh();
  }

  else if ((keys[this.KEY_JUMP] && (this.velY == 0)) && (this.velX < 0.8 * (-this.maxVelX))) {
    this.velY -= 30;
    this._isJumping = true;
    this.started = true;
    playJumpHigh();
  }

  if (this.velY < this.maxFallingVel) {
    this.velY += this.gAccel*du;
  }

  this.wallcollide();

  // if falling
  if (0 < this.velY) {
    var floorY = spatialManager.findEntityInRange(this.cx, this.cy, this.width, this.height)
    // is colliding?
    if (floorY) {
      this._isBoostJumping = false;
      this.velY = 0;
      this.cy = floorY;
      if (this._landed) {
        playLand();
        this._landed = false;

      }
    } else {
      this._landed = true;
    }
  }

  if (this._isDeadNow) {
    return entityManager.KILL_ME_NOW;
  }
  
  this.cy += this.velY*du + entityManager._speed*du;

  spatialManager.register(this);
};

// interval is tweakable, controls speed of player animation
var interval = 15;

var buffer = 0;
var cellIdx = 0;
var spritePlayer;
Player.prototype.render = function (ctx) { 
  var spritePlayer = this.player.stationaryArray[0];
  
  this.isBoostJumping();

  if(this.isGasping()){
    spritePlayer = this.player.playerGasp[0];
  }

  else if (this.isStationary()) {
    spritePlayer = this.player.stationaryArray[cellIdx % 3];
  }
  else if (this.isRunning()) {
    spritePlayer = this.player.runningArray[cellIdx % 4];
  }

  if (this.isJumpingStationary()) {
    spritePlayer = this.player.jumpingStationary[0];
  }
  else if (this.isJumping()) {
    spritePlayer = this.player.jumping[cellIdx % 3];
  }
  else if(this.isFallingStationary()){
    spritePlayer = this.player.jumpingStationary[0];
  }
  else if (this.isFalling()) {
    spritePlayer = this.player.edgeFall[cellIdx % 2];
  }
  if (this._isBoostJumping) {
    spritePlayer = this.player.boostJump[0];
  } else {
    this.rotation = 0;
  }
  if(this.edgeFall()){
    spritePlayer = this.player.edgeFall[celldIdx % 2];
  }
  
  // flip the duude
  var flip = this.velX < 0;

  spritePlayer.scale = this._scale;
  spritePlayer.drawAt(
    ctx, this.cx, this.cy, this.rotation, flip
  );

  buffer += 1;
  if (buffer % interval == 0) {
    if (cellIdx > 100) {
      cellIdx -= 100;
    }
    cellIdx += 1;
  }
};

Player.prototype.isStationary = function () {
  return (Math.abs(this.velX) <= 0.1 && Math.abs(this.velY) <= 0.01);
};

Player.prototype.isRunning = function () {
  return (Math.abs(this.velX) > 0 && Math.abs(this.velY <= 0.0001));
};
Player.prototype.isJumpingStationary = function () {
  return (Math.abs(this.velX) < 0.1 && this.velY < 0);
};
Player.prototype.isJumping = function () {
  return (this.velY < 0);
};
Player.prototype.isFalling = function () {
  return (this.velY > 0);
};
Player.prototype.isFallingStationary = function () {
  return ((this.velY > 0) && (this.velX <= 0.1))
};
Player.prototype.isBoostJumping = function () {
  if (this.velY < -20) {
    this._isBoostJumping = true;
  }
};
Player.prototype.edgeFall = function () { 
  //return (this.cx > floorY.width- (floorY.width * 0.05));
};

Player.prototype.isGasping = function () {
  if(this.started){
    return this.cy > g_canvas.height * 0.8;
  }
}
