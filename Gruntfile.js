module.exports = function(grunt) {
    grunt.initConfig({
        jasmine_node: {
            options: {
                forceExit: true,
                match: '.',
                matchall: false,
                extensions: 'js',
                specNameMatcher: 'spec',
                jUnit: {
                    report: true,
                    savePath : "./build/reports/jasmine/",
                    useDotNotation: true,
                    consolidate: true
                }
            },
            all: ['test/unit/backend']
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['jasmine_node', 'karma']);
};
