describe('homepage', function() {
    var ptor;

    beforeEach(function() {
        browser.get('http://127.0.0.1:8080/');
        ptor = protractor.getInstance();
    });

    it('should load the page', function() {
        var textElement = by.model('formData.text');
        expect(ptor.isElementPresent(textElement)).toBe(true);
    });

    it('input text', function() {
        var input = element(by.id('input-text'));
        input.sendKeys('<C>Hello, World!</C>');
        expect(input.getAttribute('value')).toEqual('<C>Hello, World!</C>');
    });

    it('send correctly tagged text', function() {
        var input = element(by.id('input-text'));
        input.sendKeys('<C>Hello, World!</C>');

        element(by.id('validate-button')).click();
        expect(element(by.binding('message')).getAttribute('class')).toContain('alert-success');
    });

    it('send badly tagged text', function() {
        var input = element(by.id('input-text'));
        input.sendKeys('<C>Hello, World!</C><B>');

        element(by.id('validate-button')).click();
        expect(element(by.binding('message')).getAttribute('class')).toContain('alert-danger');
    });
});
