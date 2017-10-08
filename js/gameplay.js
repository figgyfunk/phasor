// The constructor.  A function constructor
let gameplayState = function(){
    this.pointerDown = false;
    this.pointerDownStartX = 0;
    this.pointerDownMapStartX = 0;
}

gameplayState.prototype.preload = function() {
    
}

gameplayState.prototype.create = function() {
    this.map = game.add.sprite(0, 0, "worldmap");
    this.map.scale.setTo(RESOLUTION_SCALE, RESOLUTION_SCALE); 
    // countries
    this.country1 = new Country(game, 100, 100, 'Russia', 'green', 200);

    // event 1
    this.event1 = new EventRequest(game, 100, 100, "Russia needs 100 wheat", 100, 20);
}

gameplayState.prototype.update = function() {
    //game.debug.pointer(game.input.mousePointer);
    if (this.pointerDown) {
        let newMapPosX = this.pointerDownMapStartX + (game.input.mousePointer.x - this.pointerDownStartX);
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
            this.pointerDownMapStartX = 0;
        }
    } else {
        if (game.input.mousePointer.isDown)
        {
            this.pointerDown = true;
            this.pointerDownStartX = game.input.mousePointer.screenX;
            this.pointerDownMapStartX = this.map.x;
        }
    }
    // player decides to give wheat or not
    this.country1.update(this.event1, true);
    /*                                ^^^^ */
    this.event1.update();
}

