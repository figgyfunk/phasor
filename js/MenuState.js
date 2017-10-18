// The constructor.  A function constructor
let MenuState = function(){

  
};

MenuState.prototype.preload = function() {
    
};

MenuState.prototype.create = function() {
    ovalOfficeMusic.play();
    this.menuSprite = game.add.sprite(0, 0, "title");
    let startbutton = this.add.button(game.world.centerX-275/2, game.world.height-175, 'startbutton', this.startGame, this);
};


MenuState.prototype.startGame = function() {
    //this.state.start('NewspaperSpinState', true, false, "start");
    this.state.start("HowToPlay", true, false, "start");
}