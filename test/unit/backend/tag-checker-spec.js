var TagChecker = require("../../../src/tag-checker");


describe("Tag Checker", function() {

    var tagChecker;

    beforeEach(function () {
        tagChecker = new TagChecker();
    });

    it("Should return correct tag letter", function () {
        var openingTag = "<B>";
        expect(tagChecker.getTagLetter(openingTag)).toBe('B');

        var closingTag = "</B>";
        expect(tagChecker.getTagLetter(closingTag)).toBe('B');
    });

    it("Should return if tag is opening tag", function () {
        var openingTag = "<B>";
        expect(tagChecker.isOpeningTag(openingTag)).toBe(true);

        var closingTag = "</B>";
        expect(tagChecker.isOpeningTag(closingTag)).toBe(false);
    });

    it("Should not be matching closing tag - empty stack", function () {
        var closingTag = "</B>";
        expect(tagChecker.isMatchingClosingTag(closingTag)).toBe(false);
    });

    it("Should not be matching closing tag - wrong closing tag", function () {
        tagChecker.tagStack = ["<C>"];
        var closingTag = "</B>";
        expect(tagChecker.isMatchingClosingTag(closingTag)).toBe(false);
    });

    it("Should be matching closing tag - stack one element", function () {
        tagChecker.tagStack = ["<B>"];
        var closingTag = "</B>";
        expect(tagChecker.isMatchingClosingTag(closingTag)).toBe(true);
    });

    it("Should be matching closing tag - stack two elements", function () {
        tagChecker.tagStack = ["<C>", "<B>"];
        var closingTag = "</B>";
        expect(tagChecker.isMatchingClosingTag(closingTag)).toBe(true);
    });

    it("Should return correct error message - unmatched closing tag", function () {
        var closingTag = "</B>";
        var expected = "Expected # found " + closingTag;
        expect(tagChecker.getErrorMessage(closingTag)).toBe(expected);
    });

    it("Should return correct error message - wrong closing tag", function () {
        tagChecker.tagStack = ["<C>"];
        var closingTag = "</B>";
        var expected = "Expected </C> found " + closingTag;
        expect(tagChecker.getErrorMessage(closingTag)).toBe(expected);
    });

    it("Should return correct final tag stack message - correctly tagged", function () {
        tagChecker.tagStack = [];
        var expected = "Correctly tagged paragraph";
        var result = tagChecker.validateFinalTagStack();
        expect(result.message).toBe(expected);
    });

    it("Should return correct final tag stack message - unmatched opening tag", function () {
        tagChecker.tagStack = ["<B>"];
        var expected = "Expected </B> found #";
        var result = tagChecker.validateFinalTagStack();
        expect(result.message).toBe(expected);
    });
});
