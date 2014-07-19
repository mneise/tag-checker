var TagIterator = require("../../../src/tag-iterator");


describe("Tag Iterator", function() {

    var tagIterator;

    beforeEach(function () {
        tagIterator = new TagIterator();
    });

    it("Should have no next tag", function () {
        var text = "The following text has no tags.";
        tagIterator.setText(text);
        expect(tagIterator.hasNextTag()).toBe(false);
    });

    it("Should have next tag", function () {
        var text = "<B>The following text has one tag.";
        tagIterator.setText(text);
        expect(tagIterator.hasNextTag()).toBe(true);
    });

    it("Should return correct tag", function () {
        var text = "<B>The following text has one tag.";
        tagIterator.setText(text);
        expect(tagIterator.getNextTag()).toBe("<B>");
    });

    it("Should have only one tag", function () {
        var text = "<B>The following text has one tag.";
        tagIterator.setText(text);
        tagIterator.getNextTag();
        expect(tagIterator.hasNextTag()).toBe(false);
    });

    it("Should return tags in correct order", function () {
        var text = "<B>The following text has one tag.</B>";
        tagIterator.setText(text);
        expect(tagIterator.getNextTag()).toBe("<B>");
        expect(tagIterator.getNextTag()).toBe("</B>");
    });

});
