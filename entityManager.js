/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {


// "PRIVATE" DATA

_floors  : [],
_players : [],
_walls   : [],
_backgrounds : [],
_floorboards : [],
_speed: 0,

// "PRIVATE" METHODS

_generateFloors : function() {
    this.generateFloor();
},


_generateWalls : function() {
    this.generateWall();
},

_generateBackgrounds : function() {
    this.generateBackground();
},

_generateFloorboards : function() {
    this.generateFloorboard();
},

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._backgrounds, this._floors, this._walls, this._floorboards, this._players];
},

init: function() {
},

generatePlayer : function(descr){
    this._players.push(new Player(descr));
},

generateFloor : function(descr, idx, xScale) {
    this._floors.push(new Floor(descr, idx, xScale));
},

generateFloorboard : function(descr) {
    this._floorboards.push(new Floorboards(descr));
},

generateWall : function(descr) {
    this._walls.push(new Wall(descr));
},

generateBackground: function(descr) {
    this._backgrounds.push(new Background(descr));
},

spawncounter : 0,

resetEntities(){
    scoreBoard.setScore(Math.round(g_score-(g_score % 10)));
    g_score = 0;
    entityManager._speed = 0;
    entityManager.spawncounter = 0;
    for (var f = 0; f < this._floors.length; ++f) {
        if(this._floors[f]._isDeadNow === false){
            this._floors[f]._isDeadNow = true;
        }
    }
    for (var f = 0; f < this._floorboards.length; ++f) {
        if(this._floorboards[f]._isDeadNow === false){
            this._floorboards[f]._isDeadNow = true;
        }
    }
    for (var f = 0; f < this._players.length; ++f) {
        if(this._players[f]._isDeadNow === false){
            this._players[f]._isDeadNow = true;
        }
    }
    for (var f = 0; f < keys.length; ++f) {
        keys[f] = false;
    }
    createInitialFloors();
    createInitialPlayer();
    playTryAgain();
},

update: function(du) {
    
    
    if(this._players[0]){
        if(!this._players[0].started){
        this._speed = 0; // start hraði fyrir hopp
        }
        else{
            this._speed = 2;  //hraði á scrolli
            if(entityManager._players[0].cy < g_canvas.height/2){
                this._speed += ((g_canvas.height/2-entityManager._players[0].cy)/50); 
            }
        }
    }

    g_score += ((entityManager._speed*du)/180)*10;

    var topheight = this._floors.length-1;
    var topfloor = this._floors[topheight];

    if(topfloor.cy+g_canvas.height/2 > 0){

        let cx =  g_canvas.width*(Math.random()*(0.78 - 0.22)+0.22);
        let cy =  topfloor.cy-180;
        let xScale;
        this.spawncounter++;
        let floorIdx = Math.floor((this.spawncounter) / 100) % 7;
        if (this.spawncounter % 50 === 0) {
            cx = g_canvas.width / 2;
            xScale = 1
        } else 
          xScale = util.randRange(0.3,0.4)  / (1 + 0.1*Math.floor((this.spawncounter) / 50));
        this.generateFloor({
          cx: cx,
          cy: cy
        }, floorIdx, xScale);
                
    
        if (this.spawncounter%10 == 0){
            this.generateFloorboard({
                cx: cx,
                cy: cy+10,
                level: this.spawncounter
            },)
        }
    }

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {

            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }
    }

},

render: function(ctx) {

    var debugX = 10, debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(ctx);
            //debug.text(".", debugX + i * 10, debugY);

        }
        debugY += 10;
    }
}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

