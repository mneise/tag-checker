/*
The tag checker uses an iterator to get the tags from the text. It sequentially
looks at every tag and puts an opening tag onto a stack. If a closing tag
matches the tag on top of the stack the opening tag is removed from the stack.
The text is considered to be tagged correctly if every closing tag matches the
opening tag in order and no tags remain on the stack.
*/

var TagChecker  = function () {
    this.iterator = null;
    this.tagStack = [];
};

TagChecker.prototype.checkTags = function (text) {

    this.iterator.setText(text);
    this.tagStack = [];
    
    while (this.iterator.hasNextTag()) {
        var tag = this.iterator.getNextTag();

        if (this.isOpeningTag(tag)) {
            this.tagStack.push(tag);
        } else {
            if (this.isMatchingClosingTag(tag)) {
                this.tagStack.pop();
            } else {
                var resultMessage = this.getErrorMessage(tag);
                return {
                    isTaggedCorrectly: false,
                    message: resultMessage
                };
            }
        }
    }

    return this.validateFinalTagStack();
};

TagChecker.prototype.setIterator = function (iterator) {
    this.iterator = iterator;
};

TagChecker.prototype.isOpeningTag = function (tag) {
    var pattern = /<[A-Z]>/;
    return pattern.test(tag);
};

TagChecker.prototype.isMatchingClosingTag = function (tag) {
    if (this.tagStack.length < 1) {
        return false;
    } else {
        var openingTag = this.getLastOpeningTag();
        return this.getTagLetter(openingTag) === this.getTagLetter(tag);
    }
};

TagChecker.prototype.getErrorMessage = function (tag) {
    if (this.tagStack.length < 1) {
        return "Expected # found " + tag;
    } else {
        var openingTag = this.getLastOpeningTag();
        return "Expected </" + this.getTagLetter(openingTag) + "> found " + tag;
    }
};

TagChecker.prototype.validateFinalTagStack = function () {
    var resultMessage = '';
    if (this.tagStack.length > 0) {
        var openingTag = this.getLastOpeningTag();
        resultMessage = "Expected </" + this.getTagLetter(openingTag) + "> found #";
        return {
            isTaggedCorrectly: false,
            message: resultMessage
        };
    } else {
        resultMessage = "Correctly tagged paragraph";
        return {
            isTaggedCorrectly: true,
            message: resultMessage
        };
    }
};

TagChecker.prototype.getTagLetter = function (tag) {
    return tag.charAt(tag.length - 2);
};

TagChecker.prototype.getLastOpeningTag = function () {
    return this.tagStack[this.tagStack.length - 1];
};

module.exports = TagChecker;
