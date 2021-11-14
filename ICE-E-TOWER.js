// =========
// ASTEROIDS
// =========
/*


"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// ====================
// CREATE INITIAL SHIPS
// ====================
var g_sprites;

function createInitialFloors() {
    entityManager.generateFloor({
        cx:200,
        cy:800
    });

    entityManager.generateFloor({
        cx:500,
        cy:800
    });

    entityManager.generateFloor({
        cx:800,
        cy:800
    });
}

function createInitialPlayer() {

    entityManager.generatePlayer({
        cx : 300,
        cy : 700
    })
}

function createInitialWalls(){
    entityManager.generateWall({
        align: "right",
        cx:880,
        cy:135
    });
    entityManager.generateWall({
        align: "right",
        cx:880,
        cy:405
    });
    entityManager.generateWall({
        align: "right",
        cx:880,
        cy:675
    });
    entityManager.generateWall({
        align: "right",
        cx:880,
        cy:945
    });

    entityManager.generateWall({

        align: "left",
        cx:20,
        cy:135
    });
    entityManager.generateWall({

        align: "left",
        cx:20,
        cy:405
    });
    entityManager.generateWall({

        align: "left",
        cx:20,
        cy:675
    });
    entityManager.generateWall({

        align: "left",
        cx:20,
        cy:945
    });

}
function createInitialBackgrounds(){
    entityManager.generateBackground({
        cx:450,
        cy:450
    });
    

};

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    processDiagnostics();
    
    entityManager.update(du);

}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_MIXED   = keyCode('M');;
var KEY_GRAVITY = keyCode('G');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_K = keyCode('K');

function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_HALT)) entityManager.haltShips();

    if (eatKey(KEY_RESET)) entityManager.resetShips();
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    entityManager.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        floor  : "images/floor.png",
        player : "images/player.png",
        wall   : "images/wall.png",
        background : "images/background.png",
        spritesheet : "images/icespreadsheet.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};
// beila a thennan?
var g_spritessheetsprite = [];

// 1-3
var g_stationaryArray = [];
// 4-7
var g_runningArray = [];
// 8
var g_jumpingStationary = [];
// 9-10
var g_jumping = [];
// 11
var g_fallingArray = [];
// 12
var g_boostJumpArray = [];
// 13-15
var g_landingArray = [];


function preloadDone() {

    g_sprites.floor = new Sprite(g_images.floor);
    g_sprites.player = new Sprite(g_images.player);
    g_sprites.wall = new Sprite(g_images.wall);
    g_sprites.background = new Sprite(g_images.background);
    //g_spritesheet.spritesheet = new Sprite(g_images.spritesheet);

    //var celWidth  = 34;
    //var celHeight  = 57;
    var celWidth  = 34;
    var celHeight  = 70;
    var numCols = 15;
    var numRows = 1;
    var numCels = 15;

    var sprite;


    for ( var row = 0; row < numRows; ++row){
        for( var col = 0; col < numCols; ++col){
            sprite = new SpriteAnimation(col *celWidth, row* celHeight, celWidth, celHeight)
            g_spritessheetsprite.push(sprite)
        }
    }
    g_spritessheetsprite.splice(numCels);
    console.log(g_spritessheetsprite);
    console.dir(g_sprites);
    console.dir(g_spritessheetsprite);

    


    entityManager.init();
    createInitialBackgrounds();
    createInitialWalls();
    createInitialFloors();
    
    createInitialPlayer();

    main.init();
}

// Kick it off
requestPreloads();