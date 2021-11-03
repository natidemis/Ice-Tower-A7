/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {

    // TODO: YOUR STUFF HERE!

    return this._nextSpatialID++;

},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();
    
    // TODO: YOUR STUFF HERE!

    var entityDetails = {
        posX : pos.posX,
        posY : pos.posY,
        height : entity.height,
        width : entity.width,
        entity : entity
    }

    this._entities[spatialID] = entityDetails;
},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();

    // TODO: YOUR STUFF HERE!
    
    delete this._entities[spatialID];

},


findEntityInRange: function(aX, aY, aW, aH) {

    aX -= aW/2;
    aY -= aH/2;

    for (var ID in this._entities) {
        var b = this._entities[ID];
        var bW = b.width;
        var bH = b.height;
        var bX = b.posX-(bW/2);
        var bY = b.posY-(bH/2);
        //check if entities collide or not
        if (aX < (bX + bW) &&
            (aX + aW) > bX &&
            aY < (bY + bH) &&
            (aH + aY) > bY) {
            // collision detected!
            if (aY < bY-(bH/2)){
                return bY-bH;
            }  
        }
    }

    return false;
},
 

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    
    for (var ID in this._entities) {
        var e = this._entities[ID];
        util.strokeCircle(ctx, e.posX, e.posY, e.radius);
    }


    ctx.strokeStyle = oldStyle;
}

}
