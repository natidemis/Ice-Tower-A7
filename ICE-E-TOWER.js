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
var g_score = 0;

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
        cy : 600
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
    if(menuManager.startGame)
        entityManager.update(du);

    g_score += ((entityManager._speed*du)/180)*10;

}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;
var g_runGame = false;


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

//hvar eru þessi keys defined?
var KEY_W = keyCode('W');
var KEY_A = keyCode('A');
var KEY_S = keyCode('S');
var KEY_D = keyCode('D');
var KEY_F = keyCode('Z');

var KEY_ENTER = 13;
var KEY_LEFT_ARROW = 37;
var KEY_RIGHT_ARROW = 39;
var KEY_UP_ARROW = 38;
var KEY_DOWN_ARROW = 40;

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
    //TODO: setja menuManager.startGame = false þegar leikur klárast.
    //entityManager.render(ctx);
    
    if(menuManager.startGame){
        entityManager.render(ctx);
    }else{
        menuManager.renderMenu(ctx);
    }
    if (g_renderSpatialDebug) spatialManager.render(ctx);
    ctx.font = "40px Brush Bold";
    ctx.fillStyle = "purple";
    ctx.textAlign = "center";
    ctx.fillText(Math.round(g_score-(g_score % 10)),g_canvas.width*0.1, g_canvas.height*0.95)
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        floor  : "images/floor.png",
        floor1 : "images/floor1.png",
        floor2 : "images/floor2.png",
        floor3 : "images/floor3.png",
        player : "images/player.png",
        wall   : "images/wall.png",
        background : "images/background.png",
        spritesheet : "images/icespreadsheet.png",
        menuBackground : "images/menuImage.png",
        floorboard : "images/floorlvl.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};
// beila a thennan?
var g_spritessheetsprite = [];

var model1;
var model2;

var g_players = {
  player1: {
    stationaryArray: [],
    runningArray: [],
    jumpingStationary: [],
    jumping: [],
    boostJump: [],
    edgeFall: [],
    playerGasp: [],
    playerpicker: []
  },
  player2: {
    stationaryArray: [],
    runningArray: [],
    jumpingStationary: [],
    jumping: [],
    boostJump: [],
    edgeFall: [],
    playerGasp: [],
    playerpicker: []
  }
}


function preloadDone() {

    g_sprites.floor = new Sprite(g_images.floor);
    g_sprites.floor1 = new Sprite(g_images.floor1);
    g_sprites.floor2 = new Sprite(g_images.floor2);
    g_sprites.floor3 = new Sprite(g_images.floor3);
    g_sprites.player = new Sprite(g_images.player);
    g_sprites.wall = new Sprite(g_images.wall);
    g_sprites.background = new Sprite(g_images.background);
    g_sprites.floorboard = new Sprite(g_images.floorboard);
    //g_spritesheet.spritesheet = new Sprite(g_images.spritesheet);

    var celWidth  = 30;
    var celHeight  = 58;
  
    // for menu
    model1 = new SpriteAnimation(5, 7, celWidth, celHeight);
    model2 = new SpriteAnimation(5, 75, celWidth, celHeight);
;
    var p1y = 7;
    var p2y = 75;

    g_players.player1 = cutOutPlayers(g_players.player1, p1y);
    g_players.player2 = cutOutPlayers(g_players.player2, p2y);

    // hot fix because of hole in sprite sheet for player 2:
    g_players.player2.runningArray[0] = g_players.player2.runningArray[2]; 

    entityManager.init();
    createInitialBackgrounds();
    createInitialWalls();
    createInitialFloors();
    
    createInitialPlayer();
    
    main.init();
}

function cutOutPlayers(player, y) {
  var celWidth  = 31;
  var celHeight  = 58;
  // stationary
  player.stationaryArray.push(new SpriteAnimation(5, y, celWidth, celHeight));
  player.stationaryArray.push(new SpriteAnimation(42, y, celWidth, celHeight));
  player.stationaryArray.push(new SpriteAnimation(80, y, celWidth, celHeight));

  // running
  player.runningArray.push(new SpriteAnimation(117, y, celWidth, celHeight));
  player.runningArray.push(new SpriteAnimation(154, y, celWidth, celHeight));
  player.runningArray.push(new SpriteAnimation(191, y, celWidth, celHeight));
  player.runningArray.push(new SpriteAnimation(229, y, celWidth, celHeight));

  // jumping straight
  player.jumpingStationary.push(new SpriteAnimation(268, y, celWidth, celHeight));

  // jumping side
  player.jumping.push(new SpriteAnimation(307, y, celWidth, celHeight));
  player.jumping.push(new SpriteAnimation(346, y, celWidth, celHeight));
  player.jumping.push(new SpriteAnimation(387, y, celWidth, celHeight));

  // jumping spin
  celWidth = 44;
  celHeight = 58;
  player.boostJump.push(new SpriteAnimation(431, y, celWidth, celHeight));

  // edge fall
  celWidth = 39;
  celHeight = 58;
  player.edgeFall.push(new SpriteAnimation(486, y, celWidth, celHeight));
  player.edgeFall.push(new SpriteAnimation(533, y, celWidth, celHeight));

  // player gasp
  celWidth = 30;
  celHeight = 58;
  player.playerGasp.push(new SpriteAnimation(583, y, celWidth, celHeight));

  // player point
  celWidth = 36;
  celHeight = 56;
  player.playerpicker.push(new SpriteAnimation(620,156,celWidth,celHeight));
  
  return player;
}

// Kick it off
requestPreloads();