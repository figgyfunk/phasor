let NewspaperSpinState = function(){

    
};


NewspaperSpinState.prototype.init = function(whichNewspaper) {
    this.whichNewspaper = whichNewspaper;
}


NewspaperSpinState.prototype.create = function() {
    this.newspaperSprite = game.add.sprite(game.world.width / 2, game.world.height / 2, this.whichNewspaper+"Newspaper");
    this.newspaperSprite.anchor.setTo(0.5, 0.5);
    this.newspaperSprite.scale.setTo(0.3, 0.3);
    this.newspaperSprite.angle = 0;
    this.spinning = true;
    this.counter = 0;
    this.maxAngles = 4320;

    ovalOfficeMusic.pause();
    newspaperMusic.play();
};

NewspaperSpinState.prototype.update = function() {
    let increment = 20;
    if (this.spinning) {
        this.newspaperSprite.angle += increment;
        this.counter += increment;

        // Logarithmic scaling - because it looks cooler (probably)!
        let b = 10.0;
        let s = 100.0 / (b - 1);
        let t = -100.0 / (b - 1);
        let logScale = (s * Math.pow(b, this.counter / this.maxAngles) + t) / 100;

        // boring old normal scale
        //let logScale = this.counter / this.maxAngles;

        this.newspaperSprite.scale.setTo(logScale, logScale);
    } else {
        this.counter  += game.time.physicsElapsed;
        if (this.counter >= 2) {
            this.startGame();
        }
    }
    
    if (this.counter === this.maxAngles) {
        this.spinning = false;
        this.counter = 0;
    }
    

}

NewspaperSpinState.prototype.startGame = function() {
    newspaperMusic.pause();
    this.state.start('Gameplay');
}