// The constructor.  A function constructor
let gameplayState = function(){

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
    this.eventArray = [];
    this.turnCounter = 0;


    // Gameplay variables.
    this.wheatQty = 50;
    this.globalMorale = 50;
    this.localMorale = 50;
    this.WHEATMAX = 100;
    this.GLOBALMAX = 100;
    this.LOCALMAX = 100;

    this.wheatIncreaseFlatRate = 15;
}

gameplayState.prototype.preload = function() {
    
}

gameplayState.prototype.create = function() {
    // Assign gamePointer. Reassign for mobile support.
    this.gamePointer = game.input.mousePointer;

    this.gamePointerUp();

    this.mapSprite = game.add.sprite(0, 0, "worldmap");
    this.mapSprite.scale.setTo(RESOLUTION_SCALE, RESOLUTION_SCALE); 
    // Begin initializing Countries and adding to countryObjectMap
    this.countryObjectMap.set("West Europe", new Country(game, 1600, 0, 'West Europe', 'green', 200));


    this.textWheat = game.add.text(50, 20, this.wheatQty);
    this.textWheat.visible = true;
    this.textLocal = game.add.text(400, 20, this.localMorale);
    this.textLocal.visible = true;
    this.textGlobal = game.add.text(800, 20, this.globalMorale);
    this.textGlobal.visible = true;
    this.textTurn = game.add.text(1000, 20, this.turnCounter + 1);
    this.textTurn.visible = true;

    // add Russia event.
    this.addEvent("West Europe", "West Europe what's good", 10, 5, 5, 5, 5);
    this.addEvent("West Europe", "West Europe what's bad", 30, 10, 10, 10 ,10);
}

gameplayState.prototype.addEvent = function(name, eventText, wheatCost, globalMoraleYes, localMoraleYes, globalMoraleNo, localMoraleNo) {
    let eventX = this.countryObjectMap.get(name).pic.position.x;
    let eventY = this.countryObjectMap.get(name).pic.position.y;
    this.eventArray.push(new EventRequest(game, eventX, eventY, eventText, name, wheatCost, globalMoraleYes, localMoraleYes,  globalMoraleNo, localMoraleNo));
}

gameplayState.prototype.calculateWheatGain = function() {
    return Math.ceil((this.localMorale / this.LOCALMAX) * this.wheatIncreaseFlatRate);
}

gameplayState.prototype.displayCurrentEvent = function() {
    let event = (this.eventArray[this.turnCounter]);
    event.updatePosition(this.countryObjectMap.get(event.country).pic.position.x);
}

// Sets mouse-related variables for dragging images.
gameplayState.prototype.gamePointerDown = function(fixedPointX) {
    // Verify this function was called correctly.
    if (this.gamePointer.isDown) { 
        this.dragging = true;
        this.pointerDownStartX = this.gamePointer.x;
        this.fixedPointX = fixedPointX;   
    }
}

// Reets mouse-related variables to defaults for dragging images.
gameplayState.prototype.gamePointerUp = function() {
    // Verify this function was called correctly.
    if (this.gamePointer.isUp) { 
        this.dragging = false;
        this.pointerDownStartX = 0;
        this.fixedPointX = 0;
    }
}

// A choice was made for the current event! Lets set the necessary variables.
gameplayState.prototype.eventSwiped = function(isLeft) {
    let currentEvent = this.eventArray[this.turnCounter];
    if (isLeft) {
        this.globalMorale -= currentEvent.globalMoraleNo;
        this.localMorale -= currentEvent.localMoraleNo;
        console.log("Left");
    } else {
        this.wheatQty -= currentEvent.wheatNeeded;
        this.globalMorale += currentEvent.globalMoraleYes;
        this.localMorale += currentEvent.localMoraleYes;
        
    }

    currentEvent.endEvent();
    this.countryObjectMap.get(currentEvent.country).update(currentEvent, isLeft);
    this.inMapView = true;
    this.wheatQty += this.calculateWheatGain();

    if (this.turnCounter === this.eventArray.length - 1) {
        console.log("No More Events!");
    } else {
        this.turnCounter++;
    }

    this.textWheat.text = this.wheatQty;
    this.textLocal.text = this.localMorale;
    this.textGlobal.text = this.globalMorale;
    this.textTurn.text = this.turnCounter + 1;
    console.log(this.countryObjectMap.get(currentEvent.country).currentState);
    
}

gameplayState.prototype.updateCountryPositions = function() {
     // loop through countries and update their position as the screen is dragged across.
     let mapIter = this.countryObjectMap.values();
     while (true) {   
         let country = mapIter.next();
         if (country.done)
         {
             break;
         }
         country = country.value;        
         country.updatePosition(this.mapSprite.x + country.startX);
         country = mapIter.next().value;
     }
}

gameplayState.prototype.update = function() {
    let currentEvent = (this.eventArray[this.turnCounter]);
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
                    this.eventSwiped(pointerDragDistance < 0);
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
}