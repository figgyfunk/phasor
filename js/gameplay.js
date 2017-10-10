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
}

gameplayState.prototype.preload = function() {
    
}

gameplayState.prototype.create = function() {
    // Assign gamePointer. Reassign for mobile support.
    this.gamePointer = game.input.mousePointer;


    this.mapSprite = game.add.sprite(0, 0, "worldmap");
    this.mapSprite.scale.setTo(RESOLUTION_SCALE, RESOLUTION_SCALE); 
    // Begin initializing Countries and adding to countryObjectMap
    this.countryObjectMap.set("Russia", new Country(game, 100, 100, 'Russia', 'green', 200));

    // add Russia event.
    this.addEvent("Russia", "Russia needs 100 wheat", 100, 20);
}

gameplayState.prototype.addEvent = function(name, eventText, wheatCost, moraleEffect) {
    let eventX = this.countryObjectMap.get(name).pic.position.x;
    let eventY = this.countryObjectMap.get(name).pic.position.y;
    this.eventArray.push(new EventRequest(game, eventX, eventY, eventText, wheatCost, moraleEffect, name));
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
        this.pointerDownStartX = this.gamePointer.screenX;
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
    if (isLeft) {
        console.log("Left");
    } else {
        console.log("right");
    }

    this.eventArray[this.turnCounter].endEvent();
    this.inMapView = true;
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