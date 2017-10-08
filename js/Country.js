/* Country class */
Country = function(game, x, y, name, currentState, wheat) {
    /* x and y world coordinates, 
    state of despair(red, yellow, green), 
    getter and setter for state*/
    if (name === "Russia") {
        //this.pic = game.add.sprite(x, y, "Russia");
        //this.pic.scale.setTo(RESOLUTION_SCALE/4, RESOLUTION_SCALE/4); 
    } /* else ifs... */
    this.currentState = currentState;
    this.wheat = wheat;
};
Country.prototype = Object.create(Phaser.Sprite.prototype);
Country.prototype.constructor = Country;
/* automatically called by gameplayState.update() */
Country.prototype.update = function(event, decision) {
    if (decision === true) {
        this.wheat += event.wheatNeeded;
    } 
    /* just some random condition for switching state */
    if (this.wheat >= 100) {
        this.currentState = 'green';
    } else if (this.wheat >= 50) {
        this.currentState = 'yellow';
    } else {
        this.currentState = 'red';
    }
};
