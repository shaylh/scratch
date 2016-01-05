var uglifyMapping = require('./tasks/uglify-mapping');
var utils = require('./tasks/utils');
var listPackages = require('./tasks/list-packages');

module.exports = function (grunt) {
    'use strict';

    var scriptsPath = 'public/scripts/';
    var packagesPath = scriptsPath + 'packages/';

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
            target: ['target']
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
        }
        //watch: {sass: {files: ['sass/**/*.{scss,sass}','sass/_partials/**/*.{scss,sass}'],tasks: ['sass:dist']},livereload: {files: ['*.html', '*.php', 'js/**/*.{js,json}', 'css/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],options: {livereload: true}}},
        //sass: {options: {sourceMap: true,outputStyle: 'compressed'},dist: {files: {'css/styles.css': 'sass/styles.scss','css/pages.css': 'sass/pages.scss'}}}
    });
    //grunt.registerTask('requirejs', ['requirejs']);
    grunt.registerTask('list-packages', listPackages.bind(null, grunt, scriptsPath, packagesPath));
    grunt.registerTask('rt', ['react-templates']);
    grunt.registerTask('build', ['rt', 'copy', 'uglify', 'list-packages', 'clean:target']);
    grunt.registerTask('default', ['eslint', 'build']);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-react-templates');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-requirejs');
};