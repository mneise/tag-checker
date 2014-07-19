var fs = require('fs');

module.exports = function(config) {

    // Use ENV vars on Travis and sauce.json locally to get credentials
    if (!process.env.SAUCE_USERNAME) {
        if (!fs.existsSync('sauce.json')) {
            console.log('Create a sauce.json with your credentials based on the sauce-sample.json file.');
            process.exit(1);
        } else {
            process.env.SAUCE_USERNAME = require('./sauce').username;
            process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
        }
    }

    // Browsers to run on Sauce Labs
    var customLaunchers = {
        'SL_Chrome': {
            base: 'SauceLabs',
            browserName: 'chrome'
        },
        'SL_Firefox': {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: '26'
        },
        'SL_Safari': {
            base: 'SauceLabs',
            browserName: 'safari',
            platform: 'OS X 10.9',
            version: '7'
        },
        'SL_IE_9': {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 2008',
            version: '9'
        },
        'SL_IE_10': {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 2012',
            version: '10'
        },
        'SL_IE_11': {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 8.1',
            version: '11'
        }
    };

    config.set({

        basePath : '../',

        frameworks: ['jasmine'],

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/js/*.js',
            'test/unit/frontend/*spec.js'
        ],

        exclude: [
            ''
        ],

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        sauceLabs: {
            testName: 'Tag Checker App Unit tests'
        },
        captureTimeout: 120000,
        customLaunchers: customLaunchers,

        autoWatch: false,

        browsers: Object.keys(customLaunchers),

        singleRun: true
    });
};
