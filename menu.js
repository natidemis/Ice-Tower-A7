
var menuManager = {
    menuList: {
        start: "START GAME",
        selectChar: "SELECT CHARACTER",
        options: "OPTIONS",
    
    },

    //CharacterModel
    characterModel: 1, //1 if model1, 2 if model2

    //coordinates
    menuItemCoords_x: 250,
    menuItemCoords_y: 350,

    y_diff: 40,
    x_coord: 240,
    start_coord_x: 555,
    selectChar_coord_x: 720,
    options_coord_x: 465,
    start_coord_y: 290,
    selectChar_coord_y: 366,
    options_coord_y: 435,

    //parameters
    startGame: false,
    isSelectCharMenu: false,
    optionsMenu: false,
    drawMenuItem: function(ctx, text, x, y, px){
        ctx.fillStyle = objGradient;
        ctx.font = 'bold '+px+' Cursive';
        ctx.textAlign = "start";
        ctx.fillText(text, x, y);
        ctx.strokeText(text, x, y);
    },

    drawMainMenu: function(ctx){
        this.handleClicks();
        objGradient = ctx.createLinearGradient(0,g_canvas.height*0.6, 0, 0);
        objGradient.addColorStop(0, 'blue');
      
        objGradient.addColorStop(1/2, 'yellow')
        objGradient.addColorStop(3/3, 'yellow');
        px = '50px'
     
        this.drawMenuItem(ctx,this.menuList.start, this.menuItemCoords_x, this.menuItemCoords_y,px);
        this.drawMenuItem(ctx,this.menuList.selectChar, this.menuItemCoords_x, this.menuItemCoords_y+75,px);
        this.drawMenuItem(ctx,this.menuList.options, this.menuItemCoords_x, this.menuItemCoords_y+150,px);

    },
    selectCharMenu: function(ctx){
        objGradient = ctx.createLinearGradient(0,g_canvas.height*0.6, 0, 0);
        objGradient.addColorStop(0, 'blue');
      
        objGradient.addColorStop(1/2, 'yellow')
        objGradient.addColorStop(3/3, 'yellow');
    
     
        this.drawMenuItem(ctx,"GANGSTA", this.menuItemCoords_x, this.menuItemCoords_y,'30px');
        this.drawMenuItem(ctx,"DISCO", this.menuItemCoords_x + 250, this.menuItemCoords_y,'30px');


        model1.scale = 3;
        model1.drawAt(ctx,this.menuItemCoords_x,this.menuItemCoords_y,0);

        model2.scale = 3;
        model2.drawAt(ctx,this.menuItemCoords_x + 250,this.menuItemCoords_y,0);

        y_top = 345
        y_bot = 491
        x_left =  241
        x_right = 322
        x_diff = 237
        if(this.isSelectCharMenu && g_mouseX >= x_left && g_mouseX <= x_right){
            if(g_mouseY >= y_top && g_mouseY <= y_bot){
                if(g_mouseClick === 1) {
                    g_mouseClick = 0;
                    this.characterModel = 1
                    this.isSelectCharMenu = false
                    return
                }
            }
        }
        if(this.isSelectCharMenu && g_mouseX >= x_left + x_diff && g_mouseX <= x_right + x_diff){
            if(g_mouseY >= y_top && g_mouseY <= y_bot){
                if(g_mouseClick === 1) {
                    g_mouseClick = 0;
                    this.characterModel = 2;
                    this.isSelectCharMenu = false;
                    return;
                }
            }
        }

    },

    renderMenu: function(ctx){

        ctx.save();
        
        ctx.drawImage(g_images.menuBackground, 40,40,800,800);
        if(this.isSelectCharMenu){
            return this.selectCharMenu(ctx);
        }else if (this.optionsMenu){
            console.log("options menu")
        }else{
            return this.drawMainMenu(ctx);
        }

        ctx.restore();
    },
    

    handleClicks: function(){
        if(g_mouseX >= this.x_coord){
            if(!this.isSelectCharMenu && !this.startGame && !this.optionsMenu && g_mouseY >= this.start_coord_y && g_mouseY <= this.start_coord_y + this.y_diff){
                if(g_mouseClick === 1){
                    g_mouseClick = 0;
                    this.startGame = true
                }
            }
            //console.log(!this.optionsMenu, !this.isSelectCharMenu, !this.startGame , g_mouseY >= this.selectChar_coord_y, g_mouseY <= this.selectChar_coord_y + this.y_diff)
            if(!this.isSelectCharMenu && !this.startGame && !this.optionsMenu && g_mouseY >= this.selectChar_coord_y && g_mouseY <= this.selectChar_coord_y + this.y_diff){
                if(g_mouseClick === 1){
                    g_mouseClick = 0;
                    this.isSelectCharMenu = true
                }
            }
            // if(!this.isSelectCharMenu && !this.startGame && !this.optionsMenu && g_mouseY >= this.options_coord_y && g_mouseY <= this.options_coord_y + this.y_diff){
            //     if(g_mouseClick === 1){
            //         g_mouseClick = 0;
            //         this.optionsMenu = true
            //     }
            // }
        }
    },
}

