// The constructor.  A function constructor
let LocalMoraleState = function(){

};

LocalMoraleState.prototype.create = function() {
    this.LocalMoraleStateSprite = game.add.sprite(0, 0, "LocalMoraleNewspaper");
    this.counter = 0;
};

LocalMoraleState.prototype.update = function() {
	this.counter += game.time.physicsElapsed;
	if (this.counter >= 4) {
		this.state.start("HighScore");
	}
}
