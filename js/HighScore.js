// The constructor.  A function constructor
let HighScore = function(){
	this.highest = 0;

};

HighScore.prototype.preload = function() {
    
};

HighScore.prototype.create = function() {
    this.bg = game.add.image(0, 0, "ovaloffice");
    this.titleText = game.add.text(game.world.centerX-250, game.world.centerY-100, "High Score:",  { font: "bold 100px forte", fill: "#000000", align: "center" });
	this.highScoreText = game.add.text(game.world.centerX-25, game.world.centerY, this.highest, { font: "bold 60px forte", fill: "#000000", align: "center" });
	let restartbutton = this.add.button(game.world.centerX-275/2, game.world.centerY+100, 'MenuButton', this.restartGame, this);
};

HighScore.prototype.restartGame = function() {
    this.state.start('MenuState');
};

HighScore.prototype.update = function() {
	if (window.localStorage.getItem('Score') > this.highest) {
    	this.highest = window.localStorage.getItem('Score');
    }
    this.highScoreText.text = this.highest;
    console.log(this.highest);
};