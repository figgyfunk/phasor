let TextBox = function(startingText, x, y) {
    this.text = game.add.text(x, y, startingText);
    this.text.wordWrap = true;
    this.text.wordWrapWidth = 900;
    this.text.fill = "white";
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