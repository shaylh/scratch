module.exports = function(config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine', 'requirejs'],
        files: [
            {pattern: 'public/scripts/packages/**/test/**/*.spec.js', included: false},
            {pattern: 'public/scripts/packages/**/main/**/*.js', included: false},
            {pattern: 'public/scripts/libs/**/*.js', included: false},
            'public/scripts/packages.js',
            'public/scripts/rjs-config.js',
            'test/test-main.js'
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        captureTimeout: 60000,
        singleRun: true
    });
};