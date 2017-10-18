// The constructor.  A function constructor
let MenuState = function(){

  
};

MenuState.prototype.preload = function() {
    
};

MenuState.prototype.create = function() {
    if (!ovalOfficeMusic.isPlaying) {
        ovalOfficeMusic.play();
    }
    
    this.menuSprite = game.add.sprite(0, 0, "title");
    let startbutton = this.add.button(game.world.centerX-280, game.world.height-140, 'startbutton', this.startGame, this);
    let howbutton = this.add.button(game.world.centerX+60, game.world.height-140, 'howbutton', this.howTo, this);
};


MenuState.prototype.startGame = function() {
    this.state.start('NewspaperSpinState', true, false, "start");
}

MenuState.prototype.howTo = function() {
    this.state.start("HowToPlay", true, false, "start");
}