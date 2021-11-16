
var menuManager = {
    menuList: {
        start: "START GAME",
        selectChar: "SELECT CHARACTER",
        HTP: "HOW TO PLAY",
        scoreboard: "SCOREBOARD",
    
    },


    //coordinates
    _menuItemCoords_x: g_canvas.width/4,
    _menuItemCoords_y: g_canvas.height/3,



    //parameters
    startGame: false,
    soundActive: true,
    _is_SelectCharMenu: false,
    _HTPMenu: false,
    _scoreBoardMenu: false,

    //menu HTP
    characterModel: 1, //1 if model1, 2 if model2
    _menuIdx: 0,
    _menuItemPos: [g_canvas.height/3 - 20, g_canvas.height/3 + 55, g_canvas.height/3 + 130, g_canvas.height/3 + 205],
    _selectMenuItemPos: [g_canvas.width/4, g_canvas.width/1.9],
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
     
        this.drawMenuItem(ctx,this.menuList.start, this._menuItemCoords_x, this._menuItemCoords_y,px);
        this.drawMenuItem(ctx,this.menuList.selectChar, this._menuItemCoords_x, this._menuItemCoords_y+75,px);
        this.drawMenuItem(ctx,this.menuList.HTP, this._menuItemCoords_x, this._menuItemCoords_y+150,px);
        this.drawMenuItem(ctx,this.menuList.scoreboard, this._menuItemCoords_x, this._menuItemCoords_y+225,px);

        //skipta model2 ut fyrir annad
        g_players.player1.playerpicker[0].drawAt(ctx,this._menuItemCoords_x - 50,this._menuItemPos[this._menuIdx],0);

    },
    _selectCharMenu: function(ctx){
        ctx.save();
        const bias = 250
        const ypos = this._menuItemCoords_y + 100
        const pixel = '30px';
        const xpos = this._selectMenuItemPos[0] + 75
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
        ctx.restore();

    },
    _drawHTPMenu: function(ctx) {
        ctx.save();
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

        if(eatKey(KEY_ENTER) || eatKey(KEY_SPACE))
            this._HTPMenu = false;
        ctx.restore();
    },
    _drawScoreBoardMenu: function(ctx) {
        ctx.save();
        const bias = 100
        const ypos = g_canvas.height/3
        const pixel = '50px';
        const xpos = g_canvas.width/3;
        objGradient = ctx.createLinearGradient(0,g_canvas.height*0.6, 0, 0);
        objGradient.addColorStop(0, 'blue');
      
        objGradient.addColorStop(1/2, 'yellow')
        objGradient.addColorStop(3/3, 'yellow');
    
        const order = ["First: ", "Second: ", "Third: "]
        this.drawMenuItem(ctx,"SCOREBOARD", xpos, ypos,pixel);
        for(var i = 0; i < scoreBoard.board.length; i++){
            score = scoreBoard.board[i];
            
            this.drawMenuItem(ctx,order[i] + scoreBoard.board[i], xpos, ypos + 75*(i+1),pixel);
        }
        if(eatKey(KEY_ENTER) || eatKey(KEY_SPACE))
            this._scoreBoardMenu = false;
        ctx.restore();
    },

    renderMenu: function(ctx){

        
        ctx.drawImage(g_images.menuBackground, 40,40,800,800);
        if(this._is_SelectCharMenu){
            return this._selectCharMenu(ctx);
        }else if (this._HTPMenu){
            return this._drawHTPMenu(ctx);
        }else if(this._scoreBoardMenu){
            return this._drawScoreBoardMenu(ctx);
        }
        else{
            return this._drawMainMenu(ctx);
        }

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
            if(eatKey(KEY_ENTER) || eatKey(KEY_SPACE))
                if(this._menuIdx === 0)
                    this.startGame = true;
                else if(this._menuIdx === 1){
                    this._is_SelectCharMenu = true;
                }else if(this._menuIdx == 2){
                    this._HTPMenu = true;
                }
                else
                    this._scoreBoardMenu = true;
    
    },
    _handleSelectMenuInputs: function(){
        if(eatKey(KEY_D) || eatKey(KEY_RIGHT_ARROW))
            this._selectMenuIdx = 1 - this._selectMenuIdx;
        if(eatKey(KEY_A) || eatKey(KEY_LEFT_ARROW))
            this._selectMenuIdx = 1 - this._selectMenuIdx;
        
        if(eatKey(KEY_ENTER) || eatKey(KEY_SPACE)){
            this.characterModel = this._selectMenuIdx + 1
            this._is_SelectCharMenu = false;
            entityManager._players[0].selectCharacter(this.characterModel);
        }
    }
}

