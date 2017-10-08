// The constructor.  A function constructor
let preloadState = function(){

}

preloadState.prototype.preload = function() {
    game.load.image("platform", "assets/platform.png");
    //game.load.image("sky", "assets/sky.png");
    game.load.image("star", "assets/star.png");
    game.load.image("worldmap", "assets/BIGWORLDMAP.png");
    game.load.spritesheet("duck", "assets/dude.png", 32, 48);
    
    // Temporary event icon
    game.load.image("smiley", "assets/smiley.png");

    // Temporary event image
    game.load.image("man", "assets/man.png");

    // russia
    game.load.image("Russia", "assets/russia.png");

}

preloadState.prototype.create = function() {
    game.state.start("Gameplay");
}

preloadState.prototype.update = function() {
    
}