var TagChecker = require("../../../src/tag-checker");
var TagIterator = require("../../../src/tag-iterator");


describe("Tag Checker and Iterator Integration", function() {

    var tagIterator;
    var tagChecker;

    beforeEach(function () {
        tagIterator = new TagIterator();
        tagChecker = new TagChecker();
        tagChecker.setIterator(tagIterator);
    });

    it("Should be correctly tagged", function () {
        var text = "The following text has no tags and should be correctly tagged";
        var result = tagChecker.checkTags(text);
        var expected = "Correctly tagged paragraph";
        expect(result.message).toBe(expected);
    });

    it("Should be correctly tagged", function () {
        var text = "The following text<C><B>is centred and in boldface</B></C>";
        var result = tagChecker.checkTags(text);
        var expected = "Correctly tagged paragraph";
        expect(result.message).toBe(expected);
    });

    it("Should be correctly tagged", function () {
        var text = "<B>This <\g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence";
        var result = tagChecker.checkTags(text);
        var expected = "Correctly tagged paragraph";
        expect(result.message).toBe(expected);
    });

    it("Should be correctly tagged", function () {
        var text = "The following text<C>is centred and in boldface<</C>";
        var result = tagChecker.checkTags(text);
        var expected = "Correctly tagged paragraph";
        expect(result.message).toBe(expected);
    });

    it("Should be correctly tagged", function () {
        var text = "<<C>The following text is centred and in boldface<</C>";
        var result = tagChecker.checkTags(text);
        var expected = "Correctly tagged paragraph";
        expect(result.message).toBe(expected);
    });

    it("Should find incorrect closing tag", function () {
        var text = "<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>";
        var result = tagChecker.checkTags(text);
        var expected = "Expected </C> found </B>";
        expect(result.message).toBe(expected);
    });

    it("Should find unmatched closing tag", function () {
        var text = "<B>This should be in boldface, but there is an extra closing tag</B></C>";
        var result = tagChecker.checkTags(text);
        var expected = "Expected # found </C>";
        expect(result.message).toBe(expected);
    });

    it("Should find unmatched opening tag", function () {
        var text = "<B><C>This should be centred and in boldface, but there is a missing closing tag</C>";
        var result = tagChecker.checkTags(text);
        var expected = "Expected </B> found #";
        expect(result.message).toBe(expected);
    });
});
