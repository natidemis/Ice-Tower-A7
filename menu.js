function renderMenu(ctx){
    ctx.save();
    ctx.drawImage(g_images.menuBackground, 40,40,800,800);


    //why dis dont work??
    ctx.font = "bold 30px Cursive";
    ctx.fillStyle = "blue";
    ctx.fillText = ("START GAME", 0,0);
    ctx.restore();
}