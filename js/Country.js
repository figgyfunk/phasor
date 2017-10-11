/* Country class */
Country = function(game, x, y, name, currentState) {
    /* x and y world coordinates, 
    state of despair(red, yellow, green), 
    getter and setter for state*/
    this.name = name;
    if (name === "Western Europe") {
        this.pic = game.add.sprite(x, y, "Russia");
        this.pic.scale.setTo(RESOLUTION_SCALE/4, RESOLUTION_SCALE/4); 
        this.eventData = [
            new EventRequest(game, x, y, "First Ever West Event", "Western Europe", 1, 1, 1,  1, 1), 
            new EventRequest(game, x, y, "First West Yes Event", "Western Europe", 1, 1, 1,  1, 1), 
            new EventRequest(game, x, y, "First West No Event", "Western Europe", 1, 1, 1,  1, 1)
        ];
    } else if (name === "India") {
        this.pic = game.add.sprite(x, y, "Russia");
        this.pic.scale.setTo(RESOLUTION_SCALE/4, RESOLUTION_SCALE/4); 
        this.eventData = [
            new EventRequest(game, x, y, "First Ever India Event", "India", 1, 1, 1,  1, 1), 
            new EventRequest(game, x, y, "First India Yes Event", "India", 1, 1, 1,  1, 1), 
            new EventRequest(game, x, y, "First India No Event", "India", 1, 1, 1,  1, 1)
        ];

    }/* else ifs... */
    this.currentIndex = 0;
    this.currentState = currentState;
    this.startX = x;
};
Country.prototype = Object.create(Phaser.Sprite.prototype);
Country.prototype.constructor = Country;
/* automatically called by gameplayState.update() */
Country.prototype.update = function(decision) {
    if (this.name === "India") {
        this.updateStoryEvent(decision);
    } else {
        this.currentIndex++;
    }
    if (decision === false) {
        if (this.currentState = 'green') {
            this.currentState = 'blue';
        } else if (this.currentState = 'yellow') {
            this.currentState = 'green';
        } else if (this.currentState = 'red') {
            this.currentState = 'yellow';
        }
    } else {
        if (this.currentState = 'green') {
            this.currentState = 'yellow';
        } else if (this.currentState = 'yellow') {
            this.currentState = 'red';
        }
    }

};
Country.prototype.updateStoryEvent = function(decision) {
    if (this.currentIndex === 0) {
        if (decision === false) {
            this.currentIndex = 1;
        } else {
            this.currentIndex = 2;
        }
    } else if (this.currentIndex === 1) {
        if (decision === false) {
            this.currentIndex = 3;
        } else {
            this.currentIndex = 4;
        }
    } else if (this.currentIndex === 2) {
        if (decision === false) {
            this.currentIndex = 4;
        } else {
            this.currentIndex = 5;
        }
    } else if (this.currentIndex === 3) {
        if (decision === false) {
            this.currentIndex = 6;
        } else {
            this.currentIndex = 7;
        }
    } else if (this.currentIndex === 4) {
        if (decision === false) {
            this.currentIndex = 7;
        } else {
            this.currentIndex = 8;
        }
    } else if (this.currentIndex === 5) {
        if (decision === false) {
            this.currentIndex = 8;
        } else {
            this.currentIndex = 9;
        }
    }
}

Country.prototype.updatePosition = function(newX) {
    this.pic.position.x = newX;
}
