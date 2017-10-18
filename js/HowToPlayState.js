// The constructor.  A function constructor
let HowToPlayState = function(){

};

HowToPlayState.prototype.create = function() {
    this.HowToPlaySprite = game.add.sprite(0, 0, "HowToPlayPic");
    this.counter = 0;
    let returnbutton = this.add.button(60, 700, "eventLocationArrow", this.toMenu, this);
    returnbutton.anchor.setTo(0.5, 0.5);
    returnbutton.angle = 180;
};

HowToPlayState.prototype.update = function() {
	this.counter += game.time.physicsElapsed;
}

HowToPlayState.prototype.toMenu = function() {
    this.state.start("MenuState", true, false, "start");

}