// The constructor.  A function constructor
let WheatState = function(){

};

WheatState.prototype.create = function() {
    this.WheatStateSprite = game.add.sprite(0, 0, "WheatNewspaper");
    this.counter = 0;
};

WheatState.prototype.update = function() {
	this.counter += game.time.physicsElapsed;
	if (this.counter >= 4) {
		this.state.start("HighScore");
	}
}
