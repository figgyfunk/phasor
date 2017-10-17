// The constructor.  A function constructor
let WinState = function(){

};

WinState.prototype.create = function() {
    this.winStateSprite = game.add.sprite(0, 0, "winNewspaper");
    this.counter = 0;
};

WinState.prototype.update = function() {
	this.counter += game.time.physicsElapsed;
	if (this.counter >= 4) {
		this.state.start("HighScore");
	}
}