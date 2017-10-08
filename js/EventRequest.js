/* EventRequest class*/
EventRequest = function(game, x, y, text, wheatNeeded, morale) {
    this.wheatNeeded = wheatNeeded;
    this.morale = morale;
    this.text = game.add.text(x, y, text);
    this.count = 0;
};
EventRequest.prototype.constructor = EventRequest;
EventRequest.prototype.update = function() {
	if (this.count > 200) {
		// disappear
		this.text.position.x -= 1000;
	}
	this.count++;
};