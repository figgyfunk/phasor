// The constructor.  A function constructor
let gameplayState = function(){
    this.pointerDown = false;
    this.pointerDownStartX = 0;
    this.fixedPointX = 0;
    this.wheatQty = 50;
    this.globalMorale = 50;
    this.localMorale = 50;
    this.WHEATMAX = 100;
    this.GLOBALMAX = 100;
    this.LOCALMAX = 100;
    this.inMapView = true;
    this.countryHashMap = new Map();
    this.eventArray = [];
    this.turnCounter = 0;
}

gameplayState.prototype.preload = function() {
    
}

gameplayState.prototype.create = function() {
    this.map = game.add.sprite(0, 0, "worldmap");
    this.map.scale.setTo(RESOLUTION_SCALE, RESOLUTION_SCALE); 
    // countries
    this.country1 = new Country(game, 100, 100, 'Russia', 'green', 200);
    this.countryHashMap.set("Russia", this.country1);

    // event 1
    this.eventArray.push(new EventRequest(game, this.countryHashMap.get("Russia").pic.position.x, this.countryHashMap.get("Russia").pic.position.y, "Russia needs 100 wheat", 100, 20, "Russia"));
}

gameplayState.prototype.displayCurrentEvent = function() {
    let event = (this.eventArray[this.turnCounter]);
    event.updatePosition(this.countryHashMap.get(event.country).pic.position.x);
}


gameplayState.prototype.update = function() {
    let currentEvent = (this.eventArray[this.turnCounter]);
    if (currentEvent.eventStarted) {
        this.inMapView = false;
    }

    if (this.inMapView) {
        if (this.pointerDown) {
            let newMapPosX = this.fixedPointX + (game.input.mousePointer.x - this.pointerDownStartX);
            if (newMapPosX > 0) {
                this.map.x = 0;
            } else if (newMapPosX > -(this.map.width - game.width)) {
                this.map.x = newMapPosX;
            } else {
                this.map.x = -(this.map.width - game.width);
            }

            if (game.input.mousePointer.isUp) {
                this.pointerDown = false;
                this.pointerDownStartX = false;
                this.fixedPointX = 0;
            }
        } else {
            if (game.input.mousePointer.isDown)
            {
                this.pointerDown = true;
                this.pointerDownStartX = game.input.mousePointer.screenX;
                this.fixedPointX = this.map.x;
            }
        }

        let mapIter = this.countryHashMap.values();
        
        while (true) {   
            let country = mapIter.next();
            if (country.done)
            {
                break;
            }
            country = country.value;        
            country.updatePosition(this.map.x + country.startX);
            country = mapIter.next().value;
        }
        this.displayCurrentEvent();
    } else {
        if (this.pointerDown) {

            let newImagePosX = this.fixedPointX + (game.input.mousePointer.x - this.pointerDownStartX);
            currentEvent.personPic.position.x = newImagePosX;

            if (game.input.mousePointer.isUp) {
                if (Math.abs(game.input.mousePointer.x - this.pointerDownStartX) < 200) {
                    currentEvent.resetPicPosition();
                } else {
                    if ((game.input.mousePointer.x - this.pointerDownStartX) < 0) {
                        console.log("Left");
                    } else {
                        console.log("Right");
                    }

                    currentEvent.endEvent();
                    this.inMapView = true;
                }
                this.pointerDown = false;
                this.pointerDownStartX = false;
                this.fixedPointX = 0;
            }
        } else {
            if (game.input.mousePointer.isDown)
            {
                this.pointerDown = true;
                this.pointerDownStartX = game.input.mousePointer.screenX;
                this.fixedPointX = currentEvent.personPic.position.x;
            }
        }
    }
}

