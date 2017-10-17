// The constructor.  A function constructor
let LoseState = function(){

};

LoseState.prototype.create = function() {
    this.loseStateSprite = game.add.sprite(0, 0, "loseNewspaper");
    this.counter = 0;
};

LoseState.prototype.update = function() {
	this.counter += game.time.physicsElapsed;
	if (this.counter >= 4) {
		this.state.start("HighScore");
	}
}
