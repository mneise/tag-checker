var TagChecker = require("./src/tag-checker");
var TagIterator = require("./src/tag-iterator");

var text = process.argv[2];
if (text !== undefined) {
    var tagIterator = new TagIterator();
    var tagChecker = new TagChecker();
    tagChecker.setIterator(tagIterator);
    var result = tagChecker.checkTags(text);
    console.log(result.message);
} else {
    console.log("Please provide a text to be checked, e.g.: node main.js 'Hello, World!'");
}
