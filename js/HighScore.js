// The constructor.  A function constructor
let HighScore = function(){
	this.highest = 0;
    this.scoreArr = [];
};

HighScore.prototype.preload = function() {
    
};

HighScore.prototype.create = function() {
    this.bg = game.add.image(0, 0, "ovaloffice");
    this.titleText = game.add.text(game.world.centerX-250, game.world.centerY-300, "High Score:",  { font: "100px forte", fill: "#000000", align: "center" });
	// this.highScoreText = game.add.text(game.world.centerX-25, game.world.centerY, this.highest, { font: "bold 60px forte", fill: "#000000", align: "center" });
	let restartbutton = this.add.button(game.world.centerX-275/2, game.world.centerY+100, 'MenuButton', this.restartGame, this);
    this.scoreArr.push(window.localStorage.getItem('Score'));
};

HighScore.prototype.restartGame = function() {
    this.state.start('MenuState');
};

HighScore.prototype.update = function() {
    this.scoreArr.sort();
    this.scoreArr.reverse();
    let n = this.scoreArr.length;
    if (this.scoreArr.length > 5) {
        n = 5;
    }
    for (var i = 0; i < n; i++) {
        let text = game.add.text(game.world.centerX-50, game.world.centerY-200+i*60, (i+1)+': '+this.scoreArr[i], { font: "60px forte", fill: "#000000", align: "center" });
        if (this.scoreArr[i] == window.localStorage.getItem('Score')) {
            text.fill = '#ff0000';
        }
    }
	
};