// // global variables for highscores
// var score, highscore, scoreDisplay, highscoreText;

//         //Score and Highscore variables.
//     var score = 0;

//     game.add.text(30, 20, "SCORE:", { font: "bold 12px sans-serif",
//     fill: "#46c0f9",
//     align: "center" });

//     scoreDisplay = game.add.text(80, 19, score,{ font: "bold 14px sans-serif",
//     fill: "#46c0f9",
//     align: "center" });

//     highScoreText = this.game.add.text(game.width-100, 20,
//     'High Score: ' + highscore,
//     { font: "bold 10px Lato", fill: "#46c0f9", align: "center" });

//         //Highscore CODE
//         highScoreText.text = 'High Score: ' + localStorage.getItem("flappyhighscore"); {
//         if (score > localStorage.getItem("flappyhighscore")) { 
//             localStorage.setItem("flappyhighscore", score);
//         }
//     }

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