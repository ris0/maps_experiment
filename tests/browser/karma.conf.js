var path = require('path');

module.exports = function (config) {

    var filesCollection = [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'node_modules/sinon/pkg/sinon.js',
        'node_modules/sinon-chai/lib/sinon.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-sanitize/angular-sanitize.js',
        'node_modules/angular-ui-bootstrap/ui-bootstrap.js',
        'node_modules/angular-mass-autocomplete/massautocomplete.js',
        'node_modules/toastr/build/toastr.min.js',
        'browser/app/app.module.js',
        'browser/app/**/*.module.js',
        'tests/browser/lib/specHelper.js',
        'tests/browser/**/*.spec.js'
    ];

    var excludeFiles = [
        'tests/browser/karma.conf.js'
    ];

    var configObj = {
        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'chai'],
        basePath: path.join(__dirname, '../../'),
        files: filesCollection,
        exclude: excludeFiles,
        preprocessors: {
            'browser/directives/message.html': ['ng-html2js']
        }
    };

    config.set(configObj);

};