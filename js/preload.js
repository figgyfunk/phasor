// The constructor.  A function constructor
let preloadState = function(){

}

preloadState.prototype.preload = function() {
    game.load.image("worldmap", "assets/map/map.png");

    game.load.json("countryData", "assets/countryData.json");

    // Temporary event icon
    game.load.image("smiley", "assets/smiley.png");
    // Temporary event image
    game.load.image("man", "assets/man.png");
    // Temporary start button
    game.load.image("startbutton", "assets/start.png");
    // Temporary restart button
    game.load.image("restartbutton", "assets/restart.png");

    /* BEGIN LOADING COUNTRY IMAGES */
    // India
    game.load.image("redIndia", "assets/map/India/red_I_map.png");
    game.load.image("yellowIndia", "assets/map/India/yellow_I_map.png");
    game.load.image("greenIndia", "assets/map/India/green_I_map.png");
    game.load.image("blueIndia", "assets/map/India/blue_I_map.png");

    // West Europe
    game.load.image("redWest Europe", "assets/map/West_Europe/red_WE_map.png");
    game.load.image("yellowWest Europe", "assets/map/West_Europe/yellow_WE_map.png");
    game.load.image("greenWest Europe", "assets/map/West_Europe/green_WE_map.png");
    game.load.image("blueWest Europe", "assets/map/West_Europe/blue_WE_map.png");

}

preloadState.prototype.create = function() {
    game.state.start("MenuState");
}

preloadState.prototype.update = function() {
    
}