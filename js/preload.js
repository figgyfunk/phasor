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

    // Blue Countries
    game.load.image("blueBlue Countries", "assets/map/b_countries_map.png");

    // Brazil
    game.load.image("redBrazil", "assets/map/Brazil/red_B_map.png");
    game.load.image("yellowBrazil", "assets/map/Brazil/yellow_B_map.png");
    game.load.image("greenBrazil", "assets/map/Brazil/green_B_map.png");
    game.load.image("blueBrazil", "assets/map/Brazil/blue_B_map.png");

    // Central America
    game.load.image("redCentral America", "assets/map/central_America/red_ca_map.png");
    game.load.image("yellowCentral America", "assets/map/central_America/yellow_ca_map.png");
    game.load.image("greenCentral America", "assets/map/central_America/green_ca_map.png");
    game.load.image("blueCentral America", "assets/map/central_America/blue_ca_map.png");

    // East Africa
    game.load.image("redEast Africa", "assets/map/East_Africa/red_EA_map.png");
    game.load.image("yellowEast Africa", "assets/map/East_Africa/yellow_EA_map.png");
    game.load.image("greenEast Africa", "assets/map/East_Africa/green_EA_map.png");
    game.load.image("blueEast Africa", "assets/map/East_Africa/blue_EA_map.png");

    // East Europe
    game.load.image("redEast Europe", "assets/map/East_Europe/red_EE_map.png");
    game.load.image("yellowEast Europe", "assets/map/East_Europe/yellow_EE_map.png");
    game.load.image("greenEast Europe", "assets/map/East_Europe/green_EE_map.png");
    game.load.image("blueEast Europe", "assets/map/East_Europe/blue_EE_map.png"); 

    // North Africa
    game.load.image("redNorth Africa", "assets/map/North_Africa/red_NA_map.png");
    game.load.image("yellowNorth Africa", "assets/map/North_Africa/yellow_NA_map.png");
    game.load.image("greenNorth Africa", "assets/map/North_Africa/green_NA_map.png");
    game.load.image("blueNorth Africa", "assets/map/North_Africa/blue_NA_map.png"); 

    // South Africa
    game.load.image("redSouth Africa", "assets/map/South_Africa/red_SA_map.png");
    game.load.image("yellowSouth Africa", "assets/map/South_Africa/yellow_SA_map.png");
    game.load.image("greenSouth Africa", "assets/map/South_Africa/green_SA_map.png");
    game.load.image("blueSouth Africa", "assets/map/South_Africa/blue_SA_map.png"); 
   
    // Soviet Union
    game.load.image("redSoviet Union", "assets/map/Soviet_union/red_SU_map.png");
    game.load.image("yellowSoviet Union", "assets/map/Soviet_union/yellow_SU_map.png");
    game.load.image("greenSoviet Union", "assets/map/Soviet_union/green_SU_map.png");
    game.load.image("blueSoviet Union", "assets/map/Soviet_union/blue_SU_map.png"); 

    // West Africa
    game.load.image("redWest Africa", "assets/map/west_Africa/red_WA_map.png");
    game.load.image("yellowWest Africa", "assets/map/west_Africa/yellow_WA_map.png");
    game.load.image("greenWest Africa", "assets/map/west_Africa/green_WA_map.png");
    game.load.image("blueWest Africa", "assets/map/west_Africa/blue_WA_map.png"); 
}


preloadState.prototype.create = function() {
    game.state.start("MenuState");
}

preloadState.prototype.update = function() {
    
}