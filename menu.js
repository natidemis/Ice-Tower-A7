
var menuManager = {
    menuList: {
        start: "START GAME",
        selectChar: "SELECT CHARACTER",
        options: "OPTIONS",
    
    },

    //coordinates
    menuItemCoords_x: 250,
    menuItemCoords_y: 350,

    y_diff: 45,
    x_coord: 262,
    start_coord_x: 613,
    selectChar_coord_x: 800,
    options_coord_x: 505,
    start_coord_y: 322,
    selectChar_coord_y: 400,
    options_coord_y: 480,

    //parameters
    startGame: false,
    isSelectCharMenu: false,
    optionsMenu: false,
    drawMenuItem: function(ctx, text, x, y){
        ctx.fillStyle = objGradient;
        ctx.font = 'bold 50px Cursive';
        ctx.fillText(text, x, y);
        ctx.strokeText(text, x, y);
    },

    drawMainMenu: function(ctx){
        objGradient = ctx.createLinearGradient(0,g_canvas.height*0.6, 0, 0);
        objGradient.addColorStop(0, 'blue');
      
        objGradient.addColorStop(1/2, 'yellow')
        objGradient.addColorStop(3/3, 'yellow');
    
     
        this.drawMenuItem(ctx,this.menuList.start, this.menuItemCoords_x, this.menuItemCoords_y);
        this.drawMenuItem(ctx,this.menuList.selectChar, this.menuItemCoords_x, this.menuItemCoords_y+75);
        this.drawMenuItem(ctx,this.menuList.options, this.menuItemCoords_x, this.menuItemCoords_y+150);

    },
    selectCharMenu: function(ctx){
        //ctx.drawImage(g_images.spritesheet, 5, 7, 30, 58);
    },

    renderMenu: function(ctx){

        ctx.save();
        
        ctx.drawImage(g_images.menuBackground, 40,40,800,800);
        if(this.isSelectCharMenu){
            this.selectCharMenu(ctx);
        }else if (this.optionsMenu){
            console.log("options menu")
        }else{
            this.drawMainMenu(ctx);
        }

        ctx.restore();
        this.handleClicks();
    },

    handleClicks: function(){
        if(g_mouseX >= this.x_coord){
            if(!this.isSelectCharMenu && !this.startGame && g_mouseY >= this.start_coord_y && g_mouseY <= this.start_coord_y + this.y_diff){
                this.startGame = g_mouseClick === 1;
            }
            if(!this.isSelectCharMenu && !this.startGame && g_mouseY >= this.selectChar_coord_y && g_mouseY <= this.selectChar_coord_y + this.y_diff){
                if(g_mouseClick === 1) this.isSelectCharMenu = true
            }
            if(!this.isSelectCharMenu && !this.startGame && g_mouseY >= this.options_coord_y && g_mouseY <= this.options_coord_y + this.y_diff){
                this.optionsMenu = g_mouseClick === 1
            }
        }
    },
}

