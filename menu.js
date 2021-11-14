function renderMenu(ctx){

    ctx.save();
    
    ctx.drawImage(g_images.menuBackground, 40,40,800,800);
    //why dis dont work??
    ctx.font = "bold 30px Cursive";
    ctx.fillStyle = "blue";
    ctx.fillText = ("START GAME", 200,200);
    ctx.strokeText("START GAME", 350, 200);
    
    
    
    
    ctx.restore();
}