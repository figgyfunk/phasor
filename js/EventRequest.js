/* EventRequest class*/
EventRequest = function(game, x, y, text, country, wheatNeeded, globalMoraleYes, localMoraleYes,  globalMoraleNo, localMoraleNo, startState, yesText, noText) {
    this.wheatNeeded = wheatNeeded;
	this.globalMoraleYes = globalMoraleYes;
	this.localMoraleYes = localMoraleYes;
	this.globalMoraleNo = globalMoraleNo;
	this.localMoraleNo = localMoraleNo;
	this.eventText = text;
	this.yesText = yesText;
	this.noText = noText;
	this.pic = game.add.sprite(x, y, "Alert");
	this.pic.scale.setTo(RESOLUTION_SCALE / 1.5, RESOLUTION_SCALE / 1.5);
	this.pic.visible = false;
	this.pic.inputEnabled = true;

	this.pic.events.onInputDown.add(this.startEvent, this);

	this.eventStarted = false;

	this.country = country;

	this.currentCountryState = startState;
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
}

EventRequest.prototype.startEvent = function() {
	this.eventStarted = true;
	
	this.pic.visible = false;
	this.pic.inputEnabled = false;
	this.bgpic = game.add.sprite(0, 0, "ovaloffice");
	this.president1 = game.add.sprite(-450, game.world.height - 450 - 210, "USA");
	if (this.country !== "Blue Countries") {
		this.president2Halo = game.add.sprite(game.world.width, game.world.height - 450 - 210, this.currentCountryState+"Halo");		
	}
	this.president2 = game.add.sprite(game.world.width, game.world.height - 450 - 210, this.country);
	// presidents slide in 
	var tween1 = game.add.tween(this.president1);
	var tween2 = game.add.tween(this.president2);
	// Halo Slide in - USA vp doesn't have one - that'd be weird?
	if (this.country !== "Blue Countries") {
		var tween3 = game.add.tween(this.president2Halo);
	}
	tween1.to({ x: 120 }, 300, 'Linear', true, 0);
	tween2.to({ x: game.world.width - 130 - 450  }, 300, 'Linear', true, 0);
	if (this.country !== "Blue Countries") {
		tween3.to({ x: game.world.width - 130 - 450  }, 300, 'Linear', true, 0);
	}
	this.deskpic = game.add.sprite(game.world.centerX - 1150/2, game.world.height - 280, "desk");

	textBox.updateText(this.eventText);
	textBox.showText();

	overworldMusic.pause();
	ovalOfficeMusic.play();
}

EventRequest.prototype.resetPicPosition = function() {
	this.personPic.position.x = 300;
}

EventRequest.prototype.updateEventForDecay = function(newCountryState) {
	game.world.bringToTop(this.bgpic);
	game.world.bringToTop(this.president1);

	if (this.country !== "Blue Countries") {
		let haloPosX = this.president2Halo.x;
		let haloPosY = this.president2Halo.y;
		this.president2Halo.destroy();
		this.president2Halo = game.add.sprite(haloPosX, haloPosY, newCountryState+"Halo");
	}

	game.world.bringToTop(this.president2);
	game.world.bringToTop(this.deskpic);
	textBox.showText();
}


EventRequest.prototype.endEvent = function() {
	this.eventStarted = false;
	this.president1.visible = false;
	this.president2.visible = false;
	this.deskpic.visible = false;
	this.bgpic.visible = false;
	if (this.country !== "Blue Countries") {
		this.president2Halo.visible = false;
	}
	
	this.president1.destroy();
	this.president2.destroy();
	this.deskpic.destroy();
	this.bgpic.destroy();
	if (this.country !== "Blue Countries") {
		this.president2Halo.destroy();
	}

	eventAlertSound.play();
}