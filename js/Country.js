/* Country class */
Country = function(game, x, y, name, currentState, wheat) {
    /* x and y world coordinates, 
    state of despair(red, yellow, green), 
    getter and setter for state*/
    if (name === "West Europe") {
        this.pic = game.add.sprite(x, y, "Russia");
        this.pic.scale.setTo(RESOLUTION_SCALE/4, RESOLUTION_SCALE/4); 
    } /* else ifs... */
    this.currentState = currentState;
    this.wheat = wheat;
    this.startX = x;
};
Country.prototype = Object.create(Phaser.Sprite.prototype);
Country.prototype.constructor = Country;
/* automatically called by gameplayState.update() */
Country.prototype.update = function(event, decision) {
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


Country.prototype.updatePosition = function(newX) {
    this.pic.position.x = newX;
}
