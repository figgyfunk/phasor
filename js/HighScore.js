// The constructor.  A function constructor
let HighScore = function(){
	this.highest = 0;

};

HighScore.prototype.preload = function() {
    
};

HighScore.prototype.create = function() {
	this.highScoreText = game.add.text(100, 100, this.highest, { font: "bold 30px Lato", fill: "#46c0f9", align: "center" });
	let restartbutton = this.add.button(game.world.centerX, game.world.centerY, 'restartbutton', this.restartGame, this);
    restartbutton.scale.setTo(.2, .2);
};

HighScore.prototype.restartGame = function() {
    this.state.start('Gameplay');
};

HighScore.prototype.update = function() {
	if (window.localStorage.getItem('Score') > this.highest) {
    	this.highest = window.localStorage.getItem('Score');
    }
    this.highScoreText.text = 'High Score: ' + this.highest;
    console.log(this.highest);
};