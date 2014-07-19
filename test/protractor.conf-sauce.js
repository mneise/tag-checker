// An example configuration file.
exports.config = {
    sauceUser: 'mneise',
    sauceKey: '6a646cf6-0acf-4bcb-8099-6cbd91745bd5',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        browserName: 'firefox'
    },

    multiCapabilities: [{
        browserName: 'firefox',
        version: '26'
    }, {
        browserName: 'chrome'
    }, {
        browserName: 'internet explorer',
        platform: 'Windows 2008',
        version: '9'
    }],

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['e2e/*.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
