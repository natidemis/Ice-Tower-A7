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

_generateFloors : function() {
    this.generateFloor1();
},

_generateFloors : function() {
    this.generateFloor2();
},

_generateFloors : function() {
    this.generateFloor3();
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

generateFloor : function(descr) {
    this._floors.push(new Floor(descr));
},

generateFloor1 : function(descr) {
    this._floors.push(new Floor1(descr));
},

generateFloor2 : function(descr) {
    this._floors.push(new Floor2(descr));
},

generateFloor3 : function(descr) {
    this._floors.push(new Floor3(descr));
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

update: function(du) {
    if(this._players[0]){
        this._speed = 2;
        if(entityManager._players[0].cy < g_canvas.height/2){
            this._speed += ((g_canvas.height/2-entityManager._players[0].cy)/50);
        }
    }

    var topheight = this._floors.length-1;
    var topfloor = this._floors[topheight];

    if(topfloor.cy+g_canvas.height/2 > 0){

        let cx =  g_canvas.width*(Math.random()*(0.78 - 0.22)+0.22);
        let cy =  topfloor.cy-180;
        if(this.spawncounter+1 < 100){
            this.generateFloor({
                cx: cx,
                cy: cy
            });
        } else if(100 <= this.spawncounter+1 && this.spawncounter+1 < 200){
            this.generateFloor1({
                cx: cx,
                cy: cy
            });
        }
        
        else if(this.spawncounter+1 >= 200 && this.spawncounter+1 < 300){
            this.generateFloor2({
                cx: cx,
                cy: cy
            });
        }

        else if(this.spawncounter+1 >= 300){
            this.generateFloor3({
                cx: cx,
                cy: cy
            });
        }
        
        this.spawncounter++;
        if (this.spawncounter%10 == 0){
            this.generateFloorboard({
                cx: cx,
                cy: cy+10,
                level: this.spawncounter
            })
        }
        console.log("spawncnt " + this.spawncounter);
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

        if (!this._bShowRocks && 
            aCategory == this._rocks)
            continue;

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

