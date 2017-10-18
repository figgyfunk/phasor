// The constructor.  A function constructor
let preloadState = function(){

}

preloadState.prototype.preload = function() {
    // Music and sound
    game.load.audio("Overworld Music", "assets/Music/map_theme.ogg");
    game.load.audio("Oval Office Music", "assets/Music/oval_office_theme.ogg");

    game.load.image("worldmap", "assets/map/map.png");
    game.load.image("ocean", "assets/map/ocean.png");

    game.load.json("countryData", "assets/countryData.json");

    // Temporary event icon
    game.load.image("Alert", "assets/map/Alert.png");
    // Temporary event image
    game.load.image("man", "assets/man.png");
    // Temporary start button
    game.load.image("startbutton", "assets/start.png");
    // Temporary restart button
    game.load.image("restartbutton", "assets/restart.png");

    // Newspapers
    game.load.image("startNewspaper", "assets/first_newspaper.png");
    game.load.image("WheatNewspaper", "assets/wheat_end.png");
    game.load.image("LocalMoraleNewspaper", "assets/US_moral_end.png");
    game.load.image("GlobalMoraleNewspaper", "assets/Global_end.png");
    game.load.image("winNewspaper", "assets/ge_newspaper.png");

    // icons
    game.load.image("localmorale", "assets/main_screen/moral_flag.png");
    game.load.image("globalmorale", "assets/main_screen/moral_world.png");
    game.load.image("wheatQ", "assets/main_screen/wheat_for_now.png");
    game.load.image("eventLocationArrow", "assets/map/map_arrow.png");

    // oval office
    game.load.image("ovaloffice", "assets/main_screen/oval_office.png");
    game.load.image("desk", "assets/main_screen/deskbase.png");

    // presidents
    //game.load.image("Argentina", "assets/finished presidents/Argentina.png");
    game.load.image("Australia", "assets/finished presidents/Australia.png");
    // Blue Countries is America's VP, don't worry about it.
    game.load.image("Blue Countries", "assets/finished presidents/USA_vp.png")
    game.load.image("Brazil", "assets/finished presidents/Brazil.png");
    game.load.image("Canada", "assets/finished presidents/Canada.png");
    game.load.image("Central America", "assets/finished presidents/Central_America.png");
    game.load.image("China", "assets/finished presidents/China.png");
    game.load.image("East Africa", "assets/finished presidents/Eastern_Africa.png");
    game.load.image("East Europe", "assets/finished presidents/Eastern_Eurpoe.png");
    game.load.image("India", "assets/finished presidents/India.png");
    game.load.image("Middle East", "assets/finished presidents/middle_east.png");
    game.load.image("North Africa", "assets/finished presidents/Northern_Africa.png");
    game.load.image("Pacific Islands", "assets/finished presidents/Pacific Islands.png");
    game.load.image("South Africa", "assets/finished presidents/Southern_Africa.png");
    game.load.image("Soviet Union", "assets/finished presidents/Soviet_Union.png");
    game.load.image("USA", "assets/finished presidents/USA.png");
    game.load.image("West Africa", "assets/finished presidents/Western_Africa.png");
    game.load.image("West Europe", "assets/finished presidents/western_Europe.png");

    game.load.image("redHalo", "assets/finished presidents/red_halo.png");
    game.load.image("yellowHalo", "assets/finished presidents/yellow_halo.png");
    game.load.image("greenHalo", "assets/finished presidents/green_halo.png");
    game.load.image("blueHalo", "assets/finished presidents/blue_halo.png");


    /* BEGIN LOADING COUNTRY IMAGES */
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

    // China
    game.load.image("redChina", "assets/map/china/red_c_map.png");
    game.load.image("yellowChina", "assets/map/china/yellow_c_map.png");
    game.load.image("greenChina", "assets/map/china/green_c_map.png");
    game.load.image("blueChina", "assets/map/china/blue_c_map.png"); 

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

    // India
    game.load.image("redIndia", "assets/map/India/red_I_map.png");
    game.load.image("yellowIndia", "assets/map/India/yellow_I_map.png");
    game.load.image("greenIndia", "assets/map/India/green_I_map.png");
    game.load.image("blueIndia", "assets/map/India/blue_I_map.png");

    // Middle East
    game.load.image("redMiddle East", "assets/map/Middle_east/red_ME_map.png");
    game.load.image("yellowMiddle East", "assets/map/Middle_east/yellow_ME_map.png");
    game.load.image("greenMiddle East", "assets/map/Middle_east/green_ME_map.png");
    game.load.image("blueMiddle East", "assets/map/Middle_east/blue_ME_map.png"); 

    // North Africa
    game.load.image("redNorth Africa", "assets/map/North_Africa/red_NA_map.png");
    game.load.image("yellowNorth Africa", "assets/map/North_Africa/yellow_NA_map.png");
    game.load.image("greenNorth Africa", "assets/map/North_Africa/green_NA_map.png");
    game.load.image("blueNorth Africa", "assets/map/North_Africa/blue_NA_map.png"); 

    // Pacific Islands
    game.load.image("redPacific Islands", "assets/map/pacific_Islands/red_PI_map.png");
    game.load.image("yellowPacific Islands", "assets/map/pacific_Islands/yellow_PI_map.png");
    game.load.image("greenPacific Islands", "assets/map/pacific_Islands/green_PI_map.png");
    game.load.image("bluePacific Islands", "assets/map/pacific_Islands/blue_PI_map.png"); 

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

    // West Europe
    game.load.image("redWest Europe", "assets/map/West_Europe/red_WE_map.png");
    game.load.image("yellowWest Europe", "assets/map/West_Europe/yellow_WE_map.png");
    game.load.image("greenWest Europe", "assets/map/West_Europe/green_WE_map.png");
    game.load.image("blueWest Europe", "assets/map/West_Europe/blue_WE_map.png");
    
}


preloadState.prototype.create = function() {
    // Dirty global music variables - please understand.
    ovalOfficeMusic = game.add.audio('Oval Office Music');
    overworldMusic = game.add.audio('Overworld Music');
    ovalOfficeMusic.loop = true;
    overworldMusic.loop = true;

    game.state.start("MenuState");
}

preloadState.prototype.update = function() {
    
}