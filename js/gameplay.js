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
    this.mapSprite = null
    this.inMapView = true;
    this.countryObjectMap = new Map(); // Keys will be country names, values will be countries.

    // Used for determining current event.
    //this.eventArray = [];
    this.countryEvents = [];
    this.turnCounter = 0;


    // Gameplay variables.
    this.wheatQty = 50;
    this.globalMorale = 50;
    this.localMorale = 50;
    this.WHEATMAX = 100;
    this.GLOBALMAX = 100;
    this.LOCALMAX = 100;

    this.wheatIncreaseFlatRate = 15;


    // Assign gamePointer. Reassign for mobile support.
    this.gamePointer = game.input.mousePointer;

    this.gamePointerUp();

    this.mapSprite = game.add.sprite(0, 0, "worldmap");
    this.mapSprite.scale.setTo(RESOLUTION_SCALE, RESOLUTION_SCALE); 
    // Begin initializing Countries and adding to countryObjectMap
    this.countryObjectMap.set("West Europe", new Country(game, 'West Europe'));
    this.countryObjectMap.set("India", new Country(game,'India'));


    this.textWheat = game.add.text(50, 20, this.wheatQty);
    this.textWheat.visible = true;
    this.textLocal = game.add.text(400, 20, this.localMorale);
    this.textLocal.visible = true;
    this.textGlobal = game.add.text(800, 20, this.globalMorale);
    this.textGlobal.visible = true;
    this.textTurn = game.add.text(1000, 20, this.turnCounter + 1);
    this.textTurn.visible = true;

    // add events.
    this.countryEvents.push("India");
    this.countryEvents.push("West Europe");
    this.countryEvents.push("India");
    this.countryEvents.push("West Europe");


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

    currentEvent.endEvent();

    // pass in true for choosing yes, and false for choosing no.
    // a swipe to the right means the player chose yes.
    this.countryObjectMap.get(currentEvent.country).processDecision(isRight);
    this.inMapView = true;
    this.wheatQty += this.calculateWheatGain();

    
    console.log(this.turnCounter);
    console.log(this.countryEvents.length);
    if (this.turnCounter === this.countryEvents.length - 1) {
        console.log("No More Events!");
        this.state.start("HighScore");
    } else {
        this.turnCounter++;

    }

    this.textWheat.text = this.wheatQty;
    this.textLocal.text = this.localMorale;
    this.textGlobal.text = this.globalMorale;
    this.textTurn.text = this.turnCounter+ 1;


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

gameplayState.prototype.update = function() {
    let currentCountry = this.countryObjectMap.get(this.countryEvents[this.turnCounter]);
    //console.log(this.countryEvents[this.turnCounter]);
    let currentEvent = currentCountry.eventData[currentCountry.currentIndex];
    if (currentEvent.eventStarted) {
        // Necessary to check as the event can be started whenever the user taps on it. This happens within EventRequest and not gameplayState.
        this.inMapView = false;
    }

    if (this.inMapView) {
        if (this.dragging) {
            // Currently Dragging.
            let pointerDragDistance = this.gamePointer.x - this.pointerDownStartX;
            let newMapPosX = this.fixedPointX + pointerDragDistance;
            if (newMapPosX > 0) {
                this.mapSprite.x = 0;
            } else if (newMapPosX > -(this.mapSprite.width - game.width)) {
                this.mapSprite.x = newMapPosX;
            } else {
                this.mapSprite.x = -(this.mapSprite.width - game.width);
            }

            if (this.gamePointer.isUp) {
                this.gamePointerUp();
            }
            
            this.updateCountryPositions();

        } else if (this.gamePointer.isDown) { 
            // Not dragging, pointer was just pressed down.
            this.gamePointerDown(this.mapSprite.x);
        }

        this.displayCurrentEvent();
    } else {
        // Event screen is up, 
        if (this.dragging) {
            let pointerDragDistance = this.gamePointer.x - this.pointerDownStartX;
            let newImagePosX = this.fixedPointX + pointerDragDistance;
            currentEvent.personPic.position.x = newImagePosX;

            if (this.gamePointer.isUp) {
                if (Math.abs(pointerDragDistance) < 200) {
                    currentEvent.resetPicPosition();
                } else {
                    // a pointerDragDistance value below zero indicates a swipe to the left.
                    this.eventSwiped(pointerDragDistance > 0);
                }
                this.gamePointerUp();
            }
        } else {
            if (this.gamePointer.isDown)
            {
                this.gamePointerDown(currentEvent.personPic.position.x);
            }
        }
    }
    window.localStorage.setItem('Score', this.wheatQty);
    // console.log(window.localStorage.getItem('Score'));
};