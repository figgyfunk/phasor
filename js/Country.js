// Helper function for loading data from JSON file. 
let loadCountryData = function(country, game) {
    let data = game.cache.getJSON("countryData")[country.name];

    if (data == null) {
        return;
    }
    country.currentState = data["initialState"];
    country.eventX = data["eventX"];
    country.eventY = data["eventY"];

    country.pic = game.add.sprite(0, 0, country.currentState + country.name);

    country.eventData = [];
    let jsonEventData = data["eventData"];
    for (let i = 0; i < jsonEventData.length; i++) {
        let eventText = jsonEventData[i]["eventText"];
        let wheatNeeded = jsonEventData[i]["wheatNeeded"];
        let globalMoraleYes =jsonEventData[i]["globalMoraleYes"];
        let localMoraleYes = jsonEventData[i]["localMoraleYes"];
        let globalMoraleNo = jsonEventData[i]["globalMoraleNo"];
        let localMoraleNo = jsonEventData[i]["localMoraleNo"];
        country.eventData.push(new EventRequest(game, country.eventX, country.eventY, eventText, country.name, wheatNeeded, globalMoraleYes, localMoraleYes, globalMoraleNo, localMoraleNo));
    }

    
};

/* Country class */
let Country = function(game, name) {
    this.name = name;
    this.startX = 0;
    this.currentIndex = 0;

    loadCountryData(this, game);
    
};

Country.prototype = Object.create(Phaser.Sprite.prototype);
Country.prototype.constructor = Country;
/* automatically called by gameplayState.update() */
Country.prototype.processDecision = function(choseYes) {
    if (this.name === "India") {
        this.updateStoryEvent(choseYes);
    } else {
        this.currentIndex++;
    }
    if (choseYes === true) {
        if (this.currentState === 'green') {
            this.currentState = 'blue';
        } else if (this.currentState === 'yellow') {
            this.currentState = 'green';
        } else if (this.currentState === 'red') {
            this.currentState = 'yellow';
        }
    } else {
        if (this.currentState === 'green') {
            this.currentState = 'yellow';
        } else if (this.currentState === 'yellow') {
            this.currentState = 'red';
        }
    }
    let picX = this.pic.position.x;
    this.pic.visible = false;
    this.pic.destroy();
    this.pic = game.add.sprite(picX, 0, this.currentState + this.name);
};
Country.prototype.updateStoryEvent = function(choseYes) {
    if (this.currentIndex === 0) {
        if (choseYes === true) {
            this.currentIndex = 1;
        } else {
            this.currentIndex = 2;
        }
    } else if (this.currentIndex === 1) {
        if (choseYes === true) {
            this.currentIndex = 3;
        } else {
            this.currentIndex = 4;
        }
    } else if (this.currentIndex === 2) {
        if (choseYes === true) {
            this.currentIndex = 4;
        } else {
            this.currentIndex = 5;
        }
    } else if (this.currentIndex === 3) {
        if (choseYes === true) {
            this.currentIndex = 6;
        } else {
            this.currentIndex = 7;
        }
    } else if (this.currentIndex === 4) {
        if (choseYes === true) {
            this.currentIndex = 7;
        } else {
            this.currentIndex = 8;
        }
    } else if (this.currentIndex === 5) {
        if (choseYes === true) {
            this.currentIndex = 8;
        } else {
            this.currentIndex = 9;
        }
    }
};

Country.prototype.updatePosition = function(newX) {
    this.pic.position.x = newX;
};
