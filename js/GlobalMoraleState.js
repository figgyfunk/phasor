// The constructor.  A function constructor
let GlobalMoraleState = function(){

};

GlobalMoraleState.prototype.create = function() {
    this.GlobalMoraleStateSprite = game.add.sprite(0, 0, "GlobalMoraleNewspaper");
    this.counter = 0;
};

GlobalMoraleState.prototype.update = function() {
	this.counter += game.time.physicsElapsed;
	if (this.counter >= 4) {
		this.state.start("HighScore");
	}
}
