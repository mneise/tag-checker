/*
This iterator uses a regular expression to detected all tags in a text.
*/

var TagIterator = function () {
    this.tags = [];
};

TagIterator.prototype.setText = function (text) {
    this.tags = text.match(/(<[A-Z]>|<\/[A-Z]>)/g);
};

TagIterator.prototype.hasNextTag = function () {
    return this.tags !== null && this.tags.length > 0;
};

TagIterator.prototype.getNextTag = function () {
    return this.tags.shift();
};

module.exports = TagIterator;
