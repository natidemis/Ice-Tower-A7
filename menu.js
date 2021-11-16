
var menuManager = {
    menuList: {
        start: "START GAME",
        selectChar: "SELECT CHARACTER",
        HTP: "HOW TO PLAY",
    
    },


    //coordinates
    _menuItemCoords_x: 250,
    _menuItemCoords_y: 350,
    _y_diff: 40,
    _x_coord: 240,
    _start_coord_x: 555,
    _selectChar_coord_x: 720,
    _HTP_coord_x: 465,
    _start_coord_y: 290,
    _selectChar_coord_y: 366,
    _HTP_coord_y: 435,

    //parameters
    startGame: false,
    soundActive: true,
    _is_SelectCharMenu: false,
    _HTPMenu: false,

    //menu HTP
    characterModel: 1, //1 if model1, 2 if model2
    _menuIdx: 0,
    _menuItemPos: [350 - 20, 350 + 55, 350 + 130],
    _selectMenuItemPos: [200, 450],
    _selectMenuIdx: 0,
    drawMenuItem: function(ctx, text, x, y, px){
        ctx.fillStyle = objGradient;
        ctx.font = 'bold '+px+' Cursive';
        ctx.textAlign = "start";
        ctx.fillText(text, x, y);
        ctx.strokeText(text, x, y);
    },

    _drawMainMenu: function(ctx){
        this._handleMainMenuInput();
        objGradient = ctx.createLinearGradient(0,g_canvas.height*0.6, 0, 0);
        objGradient.addColorStop(0, 'blue');
      
        objGradient.addColorStop(1/2, 'yellow')
        objGradient.addColorStop(3/3, 'yellow');
        px = '50px'
     
        this.drawMenuItem(ctx,this.menuList.start, this._menuItemCoords_x, 350,px);
        this.drawMenuItem(ctx,this.menuList.selectChar, this._menuItemCoords_x, 350+75,px);
        this.drawMenuItem(ctx,this.menuList.HTP, this._menuItemCoords_x, 350+150,px);

        //skipta model2 ut fyrir annad
        g_players.player1.playerpicker[0].drawAt(ctx,this._menuItemCoords_x - 50,this._menuItemPos[this._menuIdx],0);

    },
    _selectCharMenu: function(ctx){
        
        const bias = 250
        const ypos = this._menuItemCoords_y + 100

        const xpos = this._menuItemCoords_x + 30
        objGradient = ctx.createLinearGradient(0,g_canvas.height*0.6, 0, 0);
        objGradient.addColorStop(0, 'blue');
      
        objGradient.addColorStop(1/2, 'yellow')
        objGradient.addColorStop(3/3, 'yellow');
    
     
        this.drawMenuItem(ctx,"GANGSTA", xpos- 50, ypos - 120,pixel);
        this.drawMenuItem(ctx,"DISCO", xpos + bias - 50, ypos - 120,pixel);


        model1.scale = 3;
        model1.drawAt(ctx,xpos,ypos,0);

        model2.scale = 3;
        model2.drawAt(ctx,xpos + bias,ypos,0);
        
        model2.scale = 1;
        g_players.player1.playerpicker[0].drawAt(ctx,this._selectMenuItemPos[this._selectMenuIdx] ,ypos,0);

        this._handleSelectMenuInputs();

    },
    _drawHTPMenu: function() {
        const bias = 100
        const ypos = this._menuItemCoords_y + 100
        const pixel = '30px';
        const xpos = this._menuItemCoords_x - 100;
        objGradient = ctx.createLinearGradient(0,g_canvas.height*0.6, 0, 0);
        objGradient.addColorStop(0, 'blue');
      
        objGradient.addColorStop(1/2, 'yellow')
        objGradient.addColorStop(3/3, 'yellow');
    
     
        this.drawMenuItem(ctx,"A and D to move left and right respectively", xpos- 50, ypos - 120,pixel);
        this.drawMenuItem(ctx,"Space bar to jump", xpos- 50, ypos + bias - 120,pixel);

        if(eatKey(KEY_ENTER))
            this._HTPMenu = false;

    },

    renderMenu: function(ctx){

        ctx.save();
        
        ctx.drawImage(g_images.menuBackground, 40,40,800,800);
        if(this._is_SelectCharMenu){
            return this._selectCharMenu(ctx);
        }else if (this._HTPMenu){
            return this._drawHTPMenu();
        }else{
            return this._drawMainMenu(ctx);
        }

        ctx.restore();
    },
    _scrollUp: function(){
        if(this._menuIdx === 0)
            this._menuIdx = this._menuItemPos.length -1;
        else
            this._menuIdx -= 1;
    },

    _scrollDown: function(){
        if(this._menuIdx === this._menuItemPos.length -1)
            this._menuIdx = 0;
        else
            this._menuIdx += 1;
    },
    

    _handleMainMenuInput: function(){

            if(eatKey(KEY_W) || eatKey(KEY_UP_ARROW))
                this._scrollUp();
            if(eatKey(KEY_S) || eatKey(KEY_DOWN_ARROW))
                this._scrollDown();
            if(eatKey(KEY_ENTER))
                if(this._menuIdx === 0)
                    this.startGame = true;
                else if(this._menuIdx === 1){
                    this._is_SelectCharMenu = true;
                }
                else
                    this._HTPMenu = true;
    
    },
    _handleSelectMenuInputs: function(){
        if(eatKey(KEY_D) || eatKey(KEY_RIGHT_ARROW))
            this._selectMenuIdx = 1 - this._selectMenuIdx;
        if(eatKey(KEY_A) || eatKey(KEY_LEFT_ARROW))
            this._selectMenuIdx = 1 - this._selectMenuIdx;
        
        if(eatKey(KEY_ENTER)){
            this.characterModel = this._selectMenuIdx + 1
            this._is_SelectCharMenu = false;
            entityManager._players[0].selectCharacter(this.characterModel);
        }
    }
}

