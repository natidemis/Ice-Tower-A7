var audios = {
    landingSound: new Audio(
        "sounds/domm(landing).ogg"
    ),
    yo: new Audio(
        "sounds/yo.ogg"
    ),
    weee: new Audio( // nota þegar hann byrjar að fara hratt~~
        "sounds/weee.ogg"
    ),
    weeeoh: new Audio(// nota þegar hann fer hratt
        "sounds/weeeoh.ogg"
    ),
    whoopdedo: new Audio( //nota þegar hann er á hámarkshraða
        "sounds/whoopdedo1.ogg"
    ),
    hop: new Audio(
        "sounds/hop.ogg"
    ),
    tryAgain: new Audio(
        "sounds/try-again.ogg"
    ),
    gamerOver: new Audio(
        "sounds/gameover.ogg"
    ),
    menu: new Audio(
        "sounds/menu.mp3"
    ),
    theme: new Audio(
        "sounds/theme.mp3"
    )

}

var musicOn = true;
var sfxOn = true;

function playJumpNormal(){
    if(sfxOn){audios.hop.play()}
}

function playJumpHigh(){
    if(sfxOn){audios.hop.play()}
}

function playLand(){
    if(sfxOn){audios.hop.play()}
}

function playWallBang(){
    if(sfxOn){audios.play()}
}

function playThemes(){
    if(musicOn){
        if(menuManager.startGame){
            audios.theme.play();
            audios.menu.pause();
        } else{
            audios.menu.play();
        }
    } else {
        audios.menu.pause();
        audios.theme.pause();
    }
}

function updateaudio(){
    var KEY_M = keyCode('M');
    var KEY_N = keyCode('N');
    audios.theme.volume = 0.2;
    if(eatKey(KEY_M)){musicOn = !musicOn}
    if(eatKey(KEY_N)){sfxOn = !sfxOn}
    playThemes();
}