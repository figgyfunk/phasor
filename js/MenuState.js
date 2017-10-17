// The constructor.  A function constructor
let MenuState = function(){

  
};

MenuState.prototype.preload = function() {
    
};

MenuState.prototype.create = function() {
    ovalOfficeMusic.play();
    
    let startbutton = this.add.button(game.world.centerX, game.world.centerY, 'startbutton', this.startGame, this);
    startbutton.scale.setTo(.1, .1);
};


MenuState.prototype.startGame = function() {
    this.state.start('NewspaperSpinState', true, false, "start");
}