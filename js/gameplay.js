// The constructor.  A function constructor
let gameplayState = function(){

    // // Variables used for dragging with mouse pointer.
    // this.dragging = false;
    // this.pointerDownStartX = 0;
    // this.fixedPointX = 0;
    // this.gamePointer = null;


    // // For displaying map and each country, and displaying events for countries.
    // this.mapSprite = null
    // this.inMapView = true;
    // this.countryObjectMap = new Map(); // Keys will be country names, values will be countries.

    // // Used for determining current event.
    // //this.eventArray = [];
    // this.countryEvents = [];
    // this.turnCounter = 0;


    // // Gameplay variables.
    // this.wheatQty = 50;
    // this.globalMorale = 50;
    // this.localMorale = 50;
    // this.WHEATMAX = 100;
    // this.GLOBALMAX = 100;
    // this.LOCALMAX = 100;

    // this.wheatIncreaseFlatRate = 15;
};

gameplayState.prototype.preload = function() {

};

gameplayState.prototype.create = function() {
    // Variables used for dragging with mouse pointer.
    this.dragging = false;
    this.pointerDownStartX = 0;
    this.fixedPointX = 0;
    this.gamePointer = null;


    // For displaying map and each country, and displaying events for countries.
    this.mapSprite = null;
    this.oceanSprite = null;
    this.inMapView = true;
    this.countryObjectMap = new Map(); // Keys will be country names, values will be countries.

    // Used for determining current event.
    this.countryEvents = [];
    this.turnCounter = 0;


    // Gameplay variables.
    this.wheatQty = 50;
    this.globalMorale = 50;
    this.localMorale = 50;
    this.WHEATMAX = 100;
    this.GLOBALMAX = 100;
    this.LOCALMAX = 100;
    this.inEvent = false;

    this.wheatIncreaseFlatRate = 17;

    //global variables to control status locations respectively. Based on the top left corner of the text fields/graphics
    this.WHEAT_STATUS_X = 190-100;
    this.WHEAT_STATUS_Y = 20;
    this.LOCALMORALE_STATUS_X = 570-100;
    this.LOCALMORALE_STATUS_Y = 20;
    this.GLOBALMORALE_STATUS_X = 950-100;
    this.GLOBALMORALE_STATUS_Y = 20;
    //length of the status bar. Changes on w.r.t the value.
    this.STATUS_BAR_LENGTH = 150;

    this.wheatBar = new Phaser.Rectangle(this.WHEAT_STATUS_X + 40, this.WHEAT_STATUS_Y + 10, this.STATUS_BAR_LENGTH, 10);
    this.localMoraleBar = new Phaser.Rectangle(this.LOCALMORALE_STATUS_X + 40, this.LOCALMORALE_STATUS_Y + 10, this.STATUS_BAR_LENGTH, 10);
    this.globalMoraleBar = new Phaser.Rectangle(this.GLOBALMORALE_STATUS_X + 40, this.GLOBALMORALE_STATUS_Y + 10, this.STATUS_BAR_LENGTH, 10);

    // Assign gamePointer. Reassign for mobile support.
    this.gamePointer = game.input.mousePointer;

    this.gamePointerUp();

    this.mapSprite = game.add.sprite(0, 0, "worldmap");
    this.mapSprite.scale.setTo(RESOLUTION_SCALE, RESOLUTION_SCALE);
    this.oceanSprite = game.add.sprite(0, 0, "ocean");
    this.oceanSprite.scale.setTo(RESOLUTION_SCALE, RESOLUTION_SCALE); 
    this.eventPointerSprite = game.add.sprite(100, 100, "eventLocationArrow");
    this.eventPointerSprite.anchor.setTo(0.5, 0.5);
    this.eventPointerSprite.visible = false;

    // Begin initializing Countries and adding to countryObjectMap
    this.countryObjectMap.set("Blue Countries", new Country(game, 'Blue Countries'));
    this.countryObjectMap.set("Brazil", new Country(game, 'Brazil'));
    this.countryObjectMap.set("Central America", new Country(game, 'Central America'));
    this.countryObjectMap.set("China", new Country(game, "China"));
    this.countryObjectMap.set("India", new Country(game,'India'));
    this.countryObjectMap.set("East Africa", new Country(game, 'East Africa'));
    this.countryObjectMap.set("East Europe", new Country(game, 'East Europe'));
    this.countryObjectMap.set("Middle East", new Country(game, "Middle East"));
    this.countryObjectMap.set("North Africa", new Country(game, 'North Africa'));
    this.countryObjectMap.set("Pacific Islands", new Country(game, "Pacific Islands"));
    this.countryObjectMap.set("South Africa", new Country(game, 'South Africa'));
    this.countryObjectMap.set("Soviet Union", new Country(game, 'Soviet Union'));
    this.countryObjectMap.set("West Africa", new Country(game, 'West Africa'));
    this.countryObjectMap.set("West Europe", new Country(game, 'West Europe'));


    this.textWheat = game.add.text(this.WHEAT_STATUS_X+200, this.WHEAT_STATUS_Y, this.wheatQty);
    this.textWheat.visible = true;
    this.textLocal = game.add.text(this.LOCALMORALE_STATUS_X+200, this.LOCALMORALE_STATUS_Y, this.localMorale);
    this.textLocal.visible = true;
    this.textGlobal = game.add.text(this.GLOBALMORALE_STATUS_X+200, this.GLOBALMORALE_STATUS_Y, this.globalMorale);
    this.textGlobal.visible = true;
    // this.textTurn = game.add.text(1200, 20, this.turnCounter + 1);
    // this.textTurn.visible = true;

    this.textWheat.fill = '#FFFFFF';
    this.textLocal.fill = '#FFFFFF';
    this.textGlobal.fill = '#FFFFFF';
    // this.textTurn.fill = '#FFFFFF';

    this.wheatQIcon = game.add.image(this.WHEAT_STATUS_X-30, this.WHEAT_STATUS_Y-10, "wheatQ");
    this.localMoraleIcon = game.add.image(this.LOCALMORALE_STATUS_X-30, this.LOCALMORALE_STATUS_Y, "localmorale");
    this.globalMoraleIcon = game.add.image(this.GLOBALMORALE_STATUS_X-20, this.GLOBALMORALE_STATUS_Y-5, "globalmorale");

    game.world.bringToTop(this.textWheat);
    game.world.bringToTop(this.textLocal);
    game.world.bringToTop(this.textGlobal);
    // game.world.bringToTop(this.textTurn);
    game.world.bringToTop(this.wheatQIcon);
    game.world.bringToTop(this.localMoraleIcon);
    game.world.bringToTop(this.globalMoraleIcon);
    // add events.
    // this.countryEvents.push("Pacific Islands");
    // this.countryEvents.push("Middle East");
    // this.countryEvents.push("China");
    // this.countryEvents.push("West Africa");
    // this.countryEvents.push("Soviet Union");
    // this.countryEvents.push("South Africa");
    // this.countryEvents.push("North Africa");
    // this.countryEvents.push("Blue Countries");
    this.countryEvents.push("West Europe");
    this.countryEvents.push("Blue Countries");
    this.countryEvents.push("East Africa");
    this.countryEvents.push("Soviet Union");
    this.countryEvents.push("Central America");
    this.countryEvents.push("China");
    this.countryEvents.push("East Europe");
    this.countryEvents.push("Brazil");
    this.countryEvents.push("Blue Countries");
    this.countryEvents.push("India");
    this.countryEvents.push("Soviet Union");
    this.countryEvents.push("India");
    this.countryEvents.push("North Africa");
    this.countryEvents.push("East Europe");
    this.countryEvents.push("Pacific Islands");
    this.countryEvents.push("Blue Countries");
    this.countryEvents.push("West Africa");
    this.countryEvents.push("South Africa");
    this.countryEvents.push("India");
    this.countryEvents.push("East Europe");
    this.countryEvents.push("Blue Countries");
    this.countryEvents.push("Soviet Union");


    // Text Box that is used to display event Text
    textBox = new TextBox("", 200, 550);

    // Music
    ovalOfficeMusic.pause();

    eventAlertSound.play();
    overworldMusic.play();

    

    this.eventDecayTimer = 0;
    this.eventDecayLength = 3;
    this.eventDecaying = false;

    this.endOfGame = false;


};


gameplayState.prototype.calculateWheatGain = function() {
    return Math.ceil((this.localMorale / this.LOCALMAX) * this.wheatIncreaseFlatRate);
};

gameplayState.prototype.displayCurrentEvent = function() {
    let currentCountry = this.countryObjectMap.get(this.countryEvents[this.turnCounter]);
    let event = currentCountry.eventData[currentCountry.currentIndex];
    event.pic.visible = true;

    game.world.bringToTop(event.pic);
    event.updateXPosition(currentCountry.pic.position.x + currentCountry.eventX);
};

// Sets mouse-related variables for dragging images.
gameplayState.prototype.gamePointerDown = function(fixedPointX) {
    // Verify this function was called correctly.
    if (this.gamePointer.isDown) {
        this.dragging = true;
        this.pointerDownStartX = this.gamePointer.x;
        this.fixedPointX = fixedPointX;
    }
};

// Reets mouse-related variables to defaults for dragging images.
gameplayState.prototype.gamePointerUp = function() {
    // Verify this function was called correctly.
    if (this.gamePointer.isUp) {
        this.dragging = false;
        this.pointerDownStartX = 0;
        this.fixedPointX = 0;
    }
};

// A choice was made for the current event! Lets set the necessary variables.
gameplayState.prototype.eventSwiped = function(isRight) {
    let currentCountry = this.countryObjectMap.get(this.countryEvents[this.turnCounter]);
    let currentEvent = currentCountry.eventData[currentCountry.currentIndex];


    textBox.updateText((isRight === true) ? currentEvent.yesText : currentEvent.noText);

    textBox.showText();
    if (isRight) {
        this.wheatQty -= currentEvent.wheatNeeded;
        this.globalMorale += currentEvent.globalMoraleYes;
        this.localMorale += currentEvent.localMoraleYes;
        console.log("Right");
    } else {
        this.globalMorale += currentEvent.globalMoraleNo;
        this.localMorale += currentEvent.localMoraleNo;
        console.log("Left");
    }

    if (this.localMorale > this.LOCALMAX) {
        this.localMorale = this.LOCALMAX;
    }
    if (this.globalMorale > this.GLOBALMAX) {
        this.globalMorale = this.GLOBALMAX;
    }

    if (currentCountry.name !== 'Blue Countries') {
        this.wheatQty += this.calculateWheatGain();
    }
    if (this.wheatQty > this.WHEATMAX) {
        this.wheatQty = this.WHEATMAX;
    }
    if (this.wheatQty <= 0) {
        this.state.start('NewspaperSpinState', true, false, "Wheat");
    }
    if (this.localMorale <= 0) {
        this.state.start('NewspaperSpinState', true, false, "LocalMorale");
    }
    if (this.globalMorale <= 0) {
        this.state.start('NewspaperSpinState', true, false, "GlobalMorale");
    }
    

    // pass in true for choosing yes, and false for choosing no.
    // a swipe to the right means the player chose yes.
    this.countryObjectMap.get(currentEvent.country).processDecision(isRight);
    

    // Begin decay timer.
    this.eventDecaying = true;
    this.eventDecayTimer = this.eventDecayLength;
    currentEvent.updateEventForDecay(this.countryObjectMap.get(currentEvent.country).currentState);


    game.world.bringToTop(this.textWheat);
    game.world.bringToTop(this.textLocal);
    game.world.bringToTop(this.textGlobal);
    game.world.bringToTop(this.wheatQIcon);
    game.world.bringToTop(this.localMoraleIcon);
    game.world.bringToTop(this.globalMoraleIcon);

    console.log(this.turnCounter);
    console.log(this.countryEvents.length);
    if (this.turnCounter === this.countryEvents.length - 1) {
        console.log("No More Events!");
        this.endOfGame = true;
        currentCountry.currentIndex = 0;
    } else {
        this.turnCounter++;

    }

    this.textWheat.text = this.wheatQty;
    this.textLocal.text = this.localMorale;
    this.textGlobal.text = this.globalMorale;


    

    console.log(this.countryObjectMap.get(currentEvent.country).currentState);

};

gameplayState.prototype.updateCountryPositions = function() {
     // loop through countries and update their position as the screen is dragged across.
     let mapIter = this.countryObjectMap.values();
     let count = 0;
     while (true) {
        //console.log(mapIter);
         let countryItr = mapIter.next();
         if (countryItr.done)
         {
             break;
         }
         let country = countryItr.value;
         country.updatePosition(this.mapSprite.x + country.startX);
         count++;
     }
};

gameplayState.prototype.eventInScreen = function() {
    let currentCountry = this.countryObjectMap.get(this.countryEvents[this.turnCounter]);
    let event = currentCountry.eventData[currentCountry.currentIndex];
    if (event.pic.inCamera){
        return 0;
    }
    if (event.pic.x < 0){
        return -1
    }
    
    return 1;
}

gameplayState.prototype.checkBarColor = function() {
    if ((this.wheatQty/this.WHEATMAX)*100 < 33 || this.wheatBar.width/1.5 < 33){
        game.debug.geom(this.wheatBar,'#ff0000');
    } 
    else if ((this.wheatQty/this.WHEATMAX)*100 < 66 || this.wheatBar.width/1.5 < 66){
        game.debug.geom(this.wheatBar,'#ffff00');
    }  
    else if ((this.wheatQty/this.WHEATMAX)*100 > 100 || this.wheatBar.width/1.5 > 100){ //overflow case for debugging
        game.debug.geom(this.wheatBar,'#000000');
    }
    else{
        game.debug.geom(this.wheatBar,'#00ff00');
    }

    if ((this.globalMorale/this.GLOBALMAX)*100 < 33 || this.globalMoraleBar.width/1.5 < 33){
        game.debug.geom(this.globalMoraleBar,'#ff0000');
    } 
    else if ((this.globalMorale/this.GLOBALMAX)*100 < 66 || this.globalMoraleBar.width/1.5 < 66){
        game.debug.geom(this.globalMoraleBar,'#ffff00');
    } 
    else if ((this.globalMorale/this.GLOBALMAX)*100 > 100 || this.globalMoraleBar.width/1.5 > 100){ //overflow case for debugging
        game.debug.geom(this.globalMoraleBar,'#000000');
    }
    else{
        game.debug.geom(this.globalMoraleBar,'#00ff00');
    }

    if ((this.localMorale/this.LOCALMAX)*100 < 33 || this.localMoraleBar.width/1.5 < 33){
        game.debug.geom(this.localMoraleBar,'#ff0000');
    } 
    else if ((this.localMorale/this.LOCALMAX)*100 < 66 || this.localMoraleBar.width/1.5 < 66){
        game.debug.geom(this.localMoraleBar,'#ffff00');
    } 
    else if ((this.localMorale/this.LOCALMAX)*100 > 100 || this.localMoraleBar.width/1.5 > 100){ //overflow case for debugging
        game.debug.geom(this.localMoraleBar,'#000000');
    }
    else{
        game.debug.geom(this.localMoraleBar,'#00ff00');
    }
}

gameplayState.prototype.resizeBar = function(isRight, currentEvent) {
    let wheatQtyChange = 0;
    let localMoraleChange = 0;
    let globalMoraleChange = 0;
    if (isRight) {
        wheatQtyChange = -currentEvent.wheatNeeded;
        localMoraleChange = currentEvent.localMoraleYes;
        globalMoraleChange = currentEvent.globalMoraleYes;
    } else {
        wheatQtyChange = 0;
        localMoraleChange = currentEvent.localMoraleNo;
        globalMoraleChange = currentEvent.globalMoraleNo;
    }
    this.wheatBar.resize(this.STATUS_BAR_LENGTH*((this.wheatQty+wheatQtyChange)/this.GLOBALMAX), 10); 
    this.localMoraleBar.resize(this.STATUS_BAR_LENGTH*((this.localMorale+localMoraleChange)/this.GLOBALMAX), 10); 
    this.globalMoraleBar.resize(this.STATUS_BAR_LENGTH*((this.globalMorale+globalMoraleChange)/this.GLOBALMAX), 10);
    this.checkBarColor();
}

gameplayState.prototype.update = function() {
    // status bar colour logic
    if (!this.inEvent){
        this.wheatBar.resize(this.STATUS_BAR_LENGTH*(this.wheatQty/this.GLOBALMAX), 10); 
        this.localMoraleBar.resize(this.STATUS_BAR_LENGTH*(this.localMorale/this.GLOBALMAX), 10); 
        this.globalMoraleBar.resize(this.STATUS_BAR_LENGTH*(this.globalMorale/this.GLOBALMAX), 10);

        this.checkBarColor();
    }

    let currentCountry = this.countryObjectMap.get(this.countryEvents[this.turnCounter]);
    //console.log(this.countryEvents[this.turnCounter]);
    let currentEvent = currentCountry.eventData[currentCountry.currentIndex];
    if (currentEvent.eventStarted) {
        // Necessary to check as the event can be started whenever the user taps on it. This happens within EventRequest and not gameplayState.
        this.inMapView = false;
        game.world.bringToTop(this.textWheat);
        game.world.bringToTop(this.textLocal);
        game.world.bringToTop(this.textGlobal);
        // game.world.bringToTop(this.textTurn);
        game.world.bringToTop(this.wheatQIcon);
        game.world.bringToTop(this.localMoraleIcon);
        game.world.bringToTop(this.globalMoraleIcon);
    }

    if (this.inMapView) {
        if (this.dragging) {
            // Currently Dragging.
            let pointerDragDistance = this.gamePointer.x - this.pointerDownStartX;
            let newMapPosX = this.fixedPointX + pointerDragDistance;
            if (newMapPosX > 0) {
                this.mapSprite.x = 0;
                this.oceanSprite.x = 0;
            } else if (newMapPosX > -(this.mapSprite.width - game.width)) {
                this.mapSprite.x = newMapPosX;
                this.oceanSprite.x = newMapPosX;
            } else {
                this.mapSprite.x = -(this.mapSprite.width - game.width);
                this.oceanSprite.x = -(this.mapSprite.width - game.width);
            }

            if (this.gamePointer.isUp) {
                this.gamePointerUp();
            }

            this.updateCountryPositions();

        } else if (this.gamePointer.isDown) {
            // Not dragging, pointer was just pressed down.
            this.gamePointerDown(this.mapSprite.x);
        }

        let currentCountry = this.countryObjectMap.get(this.countryEvents[this.turnCounter]);
        let event = currentCountry.eventData[currentCountry.currentIndex];
        if (this.eventInScreen() < 0){
            this.eventPointerSprite.visible = true;
            game.world.bringToTop(this.eventPointerSprite);
            this.eventPointerSprite.x = 45;
            this.eventPointerSprite.y = event.pic.y;
            this.eventPointerSprite.angle = 180;
        } else if (this.eventInScreen() > 0){
            this.eventPointerSprite.visible = true;
            game.world.bringToTop(this.eventPointerSprite);
            this.eventPointerSprite.x = 1234;
            this.eventPointerSprite.y = event.pic.y;
            this.eventPointerSprite.angle = 0;
        } else {
            this.eventPointerSprite.visible = false;
        }
        game.world.bringToTop(this.textWheat);
        game.world.bringToTop(this.textLocal);
        game.world.bringToTop(this.textGlobal);
        // game.world.bringToTop(this.textTurn);
        game.world.bringToTop(this.wheatQIcon);
        game.world.bringToTop(this.localMoraleIcon);
        game.world.bringToTop(this.globalMoraleIcon);
        this.textWheat.fill = '#FFFFFF';
        this.textLocal.fill = '#FFFFFF';
        this.textGlobal.fill = '#FFFFFF';
        // this.textTurn.fill = '#FFFFFF';
        this.displayCurrentEvent();
    } else {
        this.inEvent = true;
        // Event screen is up,
        this.eventPointerSprite.visible = false;

        if (this.eventDecaying) {
            // this means the previous event screen is still up
            this.eventDecayTimer -= game.time.physicsElapsed;
            if (this.eventDecayTimer <= 0) {
                if (this.endOfGame) {
                    this.state.start('NewspaperSpinState', true, false, "win");                    
                }
                // Times up! need to get rid of the screen.
                this.eventDecaying = false;
                this.eventDecayTimer = 0;
                textBox.hideText();

                let previousCountry = this.countryObjectMap.get(this.countryEvents[this.turnCounter - 1]);
                let previousEvent = previousCountry.eventData[previousCountry.previousIndex];
                previousEvent.endEvent();

                ovalOfficeMusic.pause();
                overworldMusic.play();

                this.inMapView = true;
            }
        } else if (this.dragging) {

            let pointerDragDistance = this.gamePointer.x - this.pointerDownStartX;

            if (this.gamePointer.isUp) {
                if (Math.abs(pointerDragDistance) >= 200) {
                    // a pointerDragDistance value below zero indicates a swipe to the left.
                    this.eventSwiped(pointerDragDistance > 0);
                    this.inEvent = false;
                } else {
                    this.wheatBar.resize(this.STATUS_BAR_LENGTH*(this.wheatQty/this.GLOBALMAX), 10); 
                    this.localMoraleBar.resize(this.STATUS_BAR_LENGTH*(this.localMorale/this.GLOBALMAX), 10); 
                    this.globalMoraleBar.resize(this.STATUS_BAR_LENGTH*(this.globalMorale/this.GLOBALMAX), 10);

                    this.checkBarColor();
                }
                this.gamePointerUp();
            } else {
                // show how bar will change
                // this.something = game.add.sprite(0, 0, "man");
                console.log(this.wheatBar.width);
                this.resizeBar(pointerDragDistance > 0, currentEvent);
            }
        } else {
            if (this.gamePointer.isDown)
            {
                this.gamePointerDown(0);
            }
        }
        game.world.bringToTop(this.textWheat);
        game.world.bringToTop(this.textLocal);
        game.world.bringToTop(this.textGlobal);
        // game.world.bringToTop(this.textTurn);
        game.world.bringToTop(this.wheatQIcon);
        game.world.bringToTop(this.localMoraleIcon);
        game.world.bringToTop(this.globalMoraleIcon);
        this.textWheat.fill = '#000000';
        this.textLocal.fill = '#000000';
        this.textGlobal.fill = '#000000';
        // this.textTurn.fill = '#000000';
    }
    window.localStorage.setItem('Score', Math.ceil(this.wheatQty * 0.2 + this.localMorale * 0.2 + this.globalMorale * 0.2 + (this.turnCounter + 4) * 2 * 0.4));
    // console.log(window.localStorage.getItem('Score'));
};
