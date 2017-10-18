let TextBox = function(startingText, x, y) {
    this.text = game.add.text(x, y, startingText);
    this.text.wordWrap = true;
    this.text.wordWrapWidth = 850;
    this.text.fill = "white";
    this.text.fontSize = '16pt';
}

TextBox.prototype.updateText = function(newText) {
    this.text.text = (newText);
}

TextBox.prototype.showText = function() {
    this.text.visible = true;
    game.world.bringToTop(this.text);
}

TextBox.prototype.hideText = function() {
    this.text.visible = false;
}