// The constructor.  A function constructor
let gameplayState = function(){
    this.score = 0;    
}

gameplayState.prototype.preload = function() {

}

gameplayState.prototype.create = function() {
    game.add.sprite(0, 0, "sky");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // add empty group to hold our platforms.
    // Essentially adds a group to the game and returns it. the return of this function call is assigned to this.platforms.
    this.platforms = game.add.group();
    // enable physics on any object added to this group
    this.platforms.enableBody = true;

    let ground = this.platforms.create(0, game.world.height - 64, "platform");
    ground.scale.setTo(2,2);
    ground.body.immovable = true;

    let plat = this.platforms.create(400, 400, "platform");
    plat.body.immovable = true;
    plat = this.platforms.create(-150, 250, "platform");
    plat.body.immovable = true;

    // PLAYER
    this.player = game.add.sprite(32, game.world.height - 150, "duck");
    game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 300;
    this.player.body.bounce.y = 0.2;
    this.player.body.collideWorldBounds = true;

    this.player.animations.add("left", [0,1,2,3], 10, true);
    this.player.animations.add("right", [5,6,7,8], 10, true);

    // STARS
    this.stars = game.add.group();
    this.stars.enableBody = true;
    // create 12 stars
    for (let i = 0; i < 12; i++)
    {
        let star = this.stars.create(i * 70, 0, "star");
        star.body.gravity.y = 200;
        star.body.bounce.y = Math.random() * 0.3 + 0.3;
    }

    // SCORE
    this.scoreText = game.add.text(16, 16, "Score: 0", {fontSize: "32pt", fill: "#000000"});

    // CONTROLS
    this.cursors = game.input.keyboard.createCursorKeys(); 

}

gameplayState.prototype.update = function() {
    game.physics.arcade.collide(this.player, this.platforms);
    game.physics.arcade.collide(this.stars, this.platforms);

    game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this );

    // reset Horizontal Movement
    this.player.body.velocity.x = 0;
    
    if (this.cursors.left.isDown) {
        this.player.animations.play("left");
        this.player.body.velocity.x = -150;
    } else if (this.cursors.right.isDown) {
        this.player.animations.play("right");
        this.player.body.velocity.x = 150;
    } else {
        this.player.animations.stop();
        this.player.frame = 4;
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.body.velocity.y = -300;
    }

}

gameplayState.prototype.collectStar = function(player, star) {
    star.kill();
    this.score += 10;
    console.log(this.score);
    this.scoreText.text = "Score: " + this.score;
}