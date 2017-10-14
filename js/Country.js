
let loadCountryData = function(country, game) {
    let data = game.cache.getJSON("countryData")[country.name];

    if (data == null) {
        console.log ("ERROR: " + country.name + " not in JSON file");
        return;
    }
    country.currentState = data["initialState"];
    country.eventX = data["eventX"];
    country.eventY = data["eventY"];

    country.eventData = [];
    let jsonEventData = data["eventData"];
    for (let i = 0; i < jsonEventData.length; i++) {
        let eventText = jsonEventData["eventText"];
        let wheatNeeded = jsonEventData["wheatNeeded"];
        let globalMoraleYes = jsonEventData["globalMoraleYes"];
        let localMoraleYes = jsonEventData["localMoraleYes"];
        let globalMoraleNo = jsonEventData["globalMoraleNo"];
        let localMoraleNo = jsonEventData["localMoraleNo"];
        country.eventData.push(new EventRequest(game, country.eventX, country.eventY, eventText, country.name, wheatNeeded, globalMoraleYes, localMoraleYes, globalMoraleNo, localMoraleNo));
    }

    country.pic = game.add.sprite(0, 0, country.currentState + country.name);
};

/* Country class */
let Country = function(game, name) {
    this.name = name;
    this.startX = 0;
    this.currentIndex = 0;

    loadCountryData(this, game);

    // if (name === "Western Europe") {
    //     this.pic = game.add.sprite(x, y, "Russia");
    //     this.pic.scale.setTo(RESOLUTION_SCALE/4, RESOLUTION_SCALE/4); 
    //     this.eventData = [
    //         new EventRequest(game, x, y, "First Ever West Event", "Western Europe", 1, 1, 1,  1, 1), 
    //         new EventRequest(game, x, y, "First West Yes Event", "Western Europe", 1, 1, 1,  1, 1), 
    //         new EventRequest(game, x, y, "First West No Event", "Western Europe", 1, 1, 1,  1, 1)
    //     ];
    // } else if (name === "India") {
    //     this.pic = game.add.sprite(x, y, "Russia");
    //     this.pic.scale.setTo(RESOLUTION_SCALE/4, RESOLUTION_SCALE/4); 
    //     this.eventData = [
    //         new EventRequest(game, x, y, "First Ever India Event", "India", 1, 1, 1,  1, 1), 
    //         new EventRequest(game, x, y, "First India Yes Event", "India", 1, 1, 1,  1, 1), 
    //         new EventRequest(game, x, y, "First India No Event", "India", 1, 1, 1,  1, 1)
    //     ];

    // }/* else ifs... */
    
};





Country.prototype = Object.create(Phaser.Sprite.prototype);
Country.prototype.constructor = Country;
/* automatically called by gameplayState.update() */
Country.prototype.update = function(decision) {
    if (this.name === "India") {
        this.updateStoryEvent(decision);
    } else {
        this.currentIndex++;
    }
    if (decision === false) {
        if (this.currentState = 'green') {
            this.currentState = 'blue';
        } else if (this.currentState = 'yellow') {
            this.currentState = 'green';
        } else if (this.currentState = 'red') {
            this.currentState = 'yellow';
        }
    } else {
        if (this.currentState = 'green') {
            this.currentState = 'yellow';
        } else if (this.currentState = 'yellow') {
            this.currentState = 'red';
        }
    }
    let picX = this.pic.X;
    this.pic.destroy();
    this.pic = game.add.sprite(picX, 0, country.currentState + country.name);
};
Country.prototype.updateStoryEvent = function(decision) {
    if (this.currentIndex === 0) {
        if (decision === false) {
            this.currentIndex = 1;
        } else {
            this.currentIndex = 2;
        }
    } else if (this.currentIndex === 1) {
        if (decision === false) {
            this.currentIndex = 3;
        } else {
            this.currentIndex = 4;
        }
    } else if (this.currentIndex === 2) {
        if (decision === false) {
            this.currentIndex = 4;
        } else {
            this.currentIndex = 5;
        }
    } else if (this.currentIndex === 3) {
        if (decision === false) {
            this.currentIndex = 6;
        } else {
            this.currentIndex = 7;
        }
    } else if (this.currentIndex === 4) {
        if (decision === false) {
            this.currentIndex = 7;
        } else {
            this.currentIndex = 8;
        }
    } else if (this.currentIndex === 5) {
        if (decision === false) {
            this.currentIndex = 8;
        } else {
            this.currentIndex = 9;
        }
    }
};

Country.prototype.updatePosition = function(newX) {
    this.pic.position.x = newX;
};
