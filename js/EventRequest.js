/* EventRequest class*/
EventRequest = function(game, x, y, text, country, wheatNeeded, globalMoraleYes, localMoraleYes,  globalMoraleNo, localMoraleNo) {
    this.wheatNeeded = wheatNeeded;
	this.globalMoraleYes = globalMoraleYes;
	this.localMoraleYes = localMoraleYes;
	this.globalMoraleNo = globalMoraleNo;
	this.localMoraleNo = localMoraleNo;
	this.text = game.add.text(x, y, text);
	this.text.visible = false;
	this.pic = game.add.sprite(x, y, "smiley");
	this.pic.scale.setTo(RESOLUTION_SCALE / 4, RESOLUTION_SCALE / 4);
	this.pic.visible = false;

	this.pic.inputEnabled = true;

	this.pic.events.onInputDown.add(this.startEvent, this);

	this.eventStarted = false;

	this.country = country;
};
EventRequest.prototype.constructor = EventRequest;
EventRequest.prototype.update = function() {
	// if (this.count > 200) {
	// 	// disappear
	// 	this.text.position.x -= 1000;
	// }
	// this.count++;
};

EventRequest.prototype.updateXPosition = function(newX) {
	this.pic.position.x = newX;
	this.text.position.x = newX;
}

EventRequest.prototype.startEvent = function() {
	this.eventStarted = true;
	
	this.text.visible = true;
	this.pic.visible = false;
	this.pic.inputEnabled = false;
	this.text.position.y = 600;
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