/* EventRequest class*/
EventRequest = function(game, x, y, text, wheatNeeded, morale, country) {
    this.wheatNeeded = wheatNeeded;
    this.morale = morale;
	this.text = game.add.text(x, y, text);
	this.text.visible = false;
	this.pic = game.add.sprite(x, y, "smiley");
	this.pic.scale.setTo(RESOLUTION_SCALE / 4, RESOLUTION_SCALE / 4);

	this.pic.inputEnabled = true;

	this.pic.events.onInputDown.add(this.startEvent, this);

	this.eventStarted = false;

	this.count = 0;
	this.country = country;
};
EventRequest.prototype.constructor = EventRequest;
EventRequest.prototype.update = function() {
	if (this.count > 200) {
		// disappear
		this.text.position.x -= 1000;
	}
	this.count++;
};

EventRequest.prototype.updatePosition = function(newX) {
	this.pic.position.x = newX;
	this.text.position.x = newX;
}

EventRequest.prototype.startEvent = function() {
	this.eventStarted = true;
	
	this.text.visible = true;
	this.text.position.y = 800;
	this.text.position.x = 50;

	this.personPic = game.add.sprite(300, 300, "man");
}

EventRequest.prototype.resetPicPosition = function() {
	this.personPic.position.x = 300;
}

EventRequest.prototype.endEvent = function() {
	this.text.visible = false;
	this.eventStarted = false;
	this.personPic.visible = false;
}