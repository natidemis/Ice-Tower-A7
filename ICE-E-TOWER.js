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


var g_sprites;
var g_score = 0;

function createInitialFloors() {
    entityManager.generateFloor({
        cx:g_canvas.width/2,
        cy:g_canvas.height*0.95
    }, 0, 1);
}

function createInitialPlayer() {
    entityManager.generatePlayer({
        cx : g_canvas.width/2,
        cy : g_canvas.height*0.9
    }, )
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
        cx: g_canvas.width/2,
        cy: g_canvas.height/2
    });
    

};


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
    if(requestedQuit()){
        main.init();
    }
    updateaudio();
    processDiagnostics();
    if(menuManager.startGame){
        entityManager.update(du);
    }

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
var KEY_SPACE = ' '.charCodeAt(0);

var KEY_NUMPAD_9 = 105;
var KEY_ESCAPE = 27;

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

function renderScore(){
    if(menuManager.startGame){
        ctx.save();
        ctx.font = "40px Brush Bold";
        ctx.strokeStyle ="purple";
        ctx.strokeText(Math.round(g_score-(g_score % 10)),g_canvas.width*0.1, g_canvas.height*0.95);
        ctx.lineWidth="10";
        ctx.fillStyle = "yellow";
        ctx.fillText(Math.round(g_score-(g_score % 10)),g_canvas.width*0.1, g_canvas.height*0.95);
        ctx.textAlign = "center";
        ctx.restore();
    }
}



function renderSimulation(ctx) {
    
    if(menuManager.startGame){
        entityManager.render(ctx);
    }else{
        menuManager.renderMenu(ctx);
    }
    if (g_renderSpatialDebug) spatialManager.render(ctx);
    renderScore();
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        player : "images/player.png",
        wall   : "images/wall.png",
        background : "images/background.png",
        spritesheet : "images/icespreadsheet.png",
        floorspritesheet : "images/floorspritesheet.png",
        menuBackground : "images/menuImage.png",
        floorboard : "images/floorlvl.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};



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
    playerStars: [],
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
    playerStars: [],
    playerpicker: []
  }
}

var g_floors = [];


function preloadDone() {

    g_sprites.player = new Sprite(g_images.player);
    g_sprites.wall = new Sprite(g_images.wall);
    g_sprites.background = new Sprite(g_images.background);
    g_sprites.floorboard = new Sprite(g_images.floorboard);

    var celWidth  = 30;
    var celHeight  = 58;
  
    // for menu
    model1 = new SpriteAnimation(5, 7, celWidth, celHeight);
    model2 = new SpriteAnimation(5, 75, celWidth, celHeight);

    var p1y = 7;
    var p2y = 75;

    g_players.player1 = cutOutPlayers(g_players.player1, p1y);
    g_players.player2 = cutOutPlayers(g_players.player2, p2y);
    g_floors = cutOutFloors(g_floors);

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
  celWidth = 32;
  player.jumpingStationary.push(new SpriteAnimation(268, y, celWidth, celHeight));

  // jumping side
  celWidth = 31;
  player.jumping.push(new SpriteAnimation(306, y, celWidth, celHeight));
  celWidth = 32;
  player.jumping.push(new SpriteAnimation(346, y, celWidth, celHeight));
  celWidth = 33;
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

  // Star trail
  celWidth = 11;
  celHeight = 10;
  player.playerStars.push(new SpriteAnimation(682,245,celWidth,celHeight));//Yellow star
  player.playerStars.push(new SpriteAnimation(667,214,celWidth,celHeight));//Green star
  player.playerStars.push(new SpriteAnimation(691,204,celWidth,celHeight));//Blue star
  player.playerStars.push(new SpriteAnimation(704,234,celWidth,celHeight));//Red star
  player.playerStars.push(new SpriteAnimation(709,214,celWidth,celHeight));//Pink star
  player.playerStars.push(new SpriteAnimation(773,202,celWidth,celHeight));//Purple star

  
  return player;
}

function cutOutFloors(floors){
    var celWidth = 1046;
    var celHeight = 126;

    floors.push(new SpriteFloor(0,2,celWidth,celHeight));   // stone
    floors.push(new SpriteFloor(0,152,celWidth,celHeight)); // ice
    floors.push(new SpriteFloor(1,305,celWidth,celHeight)); // wood
    celHeight = 124
    celWidth = 1029;
    celHeight = 121;
    floors.push(new SpriteFloor(6,967,celWidth,celHeight)); //mario
    floors.push(new SpriteFloor(0,460,celWidth,celHeight)); // metal
    celWidth = 1036;
    celHeight = 126;
    floors.push(new SpriteFloor(5,585,celWidth,celHeight)); //goo
    celWidth = 1019;
    celHeight = 124;
    floors.push(new SpriteFloor(9,700,celWidth,celHeight)); //bone
    celWidth = 1012;
    floors.push(new SpriteFloor(14,844,celWidth,celHeight)); //vine
    
    

    return floors
}

// Kick it off
requestPreloads();