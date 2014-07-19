var fs = require('fs');

module.exports = function(config) {

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

        autoWatch: false,

        browsers: ['Chrome', 'Firefox'],

        singleRun: true
    });
};
