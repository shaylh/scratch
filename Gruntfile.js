var _ = require('lodash');
var uglifyMapping = require('./tasks/uglify-mapping');
var utils = require('./tasks/utils');
var listPackages = require('./tasks/list-packages');
var fs = require('fs');

module.exports = function (grunt) {
    'use strict';

    var scriptsPath = 'public/scripts/';
    var packagesPath = scriptsPath + 'packages/';
    var packages = utils.getPackages(grunt, packagesPath);

    grunt.file.mkdir('target');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        reactTemplates: {
            modules: 'amd',
            format: 'stylish',
            src: [packagesPath + '**/*.rt']
        },
        copy: {
            build: {
                cwd: packagesPath,
                src: ['**/main/**/*.js'],
                dest: 'target',
                expand: true,
                options: {
                    process: function (content, srcPath) {
                        return content.replace('define(', 'define(\'' + utils.getDefineName(packagesPath, srcPath) + '\' ,');
                    }
                }
            }
        },
        uglify: {
            build: {
                files: uglifyMapping(grunt, scriptsPath, packagesPath)
            }
        },
        clean: {
            target: ['target'],
            styles: ['public/styles']
        },
        eslint: {
            all: {
                src: [
                    packagesPath + '**/*.js',
                    '!' + packagesPath + '**/*.rt.js'
                ]
            }
        },
        watch: {
            rt: {
                files: [
                    packagesPath + '**/*.rt'
                ],
                tasks: ['rt'],
                options: {
                    spawn: false
                }
            }
        },
        sass: {//requires "gem install sass" for source-maps
            dist: {
                files: _.reduce(packages, function (res, packageName) {
                    var filePath = packagesPath + packageName + '/main/' + packageName + '.scss';
                    if (fs.existsSync(filePath)) {
                        res['public/styles/' + packageName + '.css'] = filePath;
                    }
                    return res;
                }, {})
            }
        },
        karma: {//use for browser tests
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        jasmine: {//use for browser-less tests
            unit: {
                src: [
                    'test/units-main.js',
                    'public/scripts/packages/**/test/**/*.unit.js'
                ]
            }
        }
    });

    grunt.registerTask('list-packages', listPackages.bind(null, grunt, scriptsPath, packages));
    grunt.registerTask('rt', ['react-templates']);
    grunt.registerTask('css', ['clean:styles', 'sass']);
    grunt.registerTask('test', ['jasmine', 'karma']);
    grunt.registerTask('build', ['rt', 'css', 'copy', 'uglify', 'list-packages', 'clean:target']);
    grunt.registerTask('default', ['eslint', 'build']);

    grunt.loadNpmTasks('grunt-jasmine-npm');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-react-templates');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-karma');
};