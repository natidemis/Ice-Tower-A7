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


function createInitialFloors() {

    entityManager.generateFloor({
        cx:300,
        cy:670
    });

    entityManager.generateFloor({
        cx:210,
        cy:875
    });

    entityManager.generateFloor({
        cx:500,
        cy:875
    });

    entityManager.generateFloor({
        cx:800,
        cy:875
    });

    entityManager.generateFloor({
        cx:600,
        cy:465
    });

    entityManager.generateFloor({
        cx:340,
        cy:300
    });



}

function createInitialPlayer() {

    entityManager.generatePlayer({

        cx : 300,
        cy : 500
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
        spritesheet : "images/icespreadsheet.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.floor = new Sprite(g_images.floor);
    g_sprites.player = new Sprite(g_images.player);
    g_sprites.wall = new Sprite(g_images.wall);
    g_sprites.spritesheet = new Sprite(g_images.spritesheet);

    entityManager.init();
    createInitialWalls();
    createInitialFloors();
    
    createInitialPlayer();

    main.init();
}

// Kick it off
requestPreloads();