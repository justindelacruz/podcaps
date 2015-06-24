"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            dist: {
                options: {
                    specify: 'src/static/sass/app.scss'
                }
            }
        },

        html2js: {
            options: {
                base: 'src',
                module: 'app.templates',
                singleModule: true,
                useStrict: true,
                htmlmin: {
                    caseSensitive: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    preserveLineBreaks: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            dist: {
                src: [ 'src/static/ng-app/**/*.tpl.html' ],
                dest: 'tmp/templates.js'
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            // Compile modules before everything else
            jsCore: {
                src: [
                    'src/static/ng-app/**/*.js',
                    'tmp/*.js',
                    '!src/static/ng-app/**/*.module.js',
                    '!src/static/ng-app/**/*.spec.js'
                ],
                dest: 'tmp/jsCore.js'
            },
            jsApp: {
                src: [
                    'src/static/ng-app/**/*.module.js',
                    'tmp/jsCore.js'
                ],
                dest: 'src/static/js/app.dist.js'
            }
        },

        clean: {
            temp: {
                src: [ 'tmp' ]
            }
        },

        uglify: {
            dist: {
                files: {
                    'src/static/js/app.dist.js': [ 'src/static/js/app.dist.js' ]
                },
                options: {
                    mangle: false
                }
            }
        },

        watch: {
            dev: {
                files: [ 'Gruntfile.js', 'src/static/ng-app/**/*.js', 'src/static/ng-app/**/*.tpl.html' ],
                tasks: [ 'html2js:dist', 'concat:jsCore', 'concat:jsApp', 'clean:temp' ],
                options: {
                    atBegin: true
                }
            },
            minified: {
                files: [ 'Gruntfile.js', 'src/static/ng-app/**/*.js', 'src/static/ng-app/**/*.tpl.html' ],
                tasks: [ 'html2js:dist', 'concat:jsCore', 'concat:jsApp', 'clean:temp', 'uglify:dist' ],
                options: {
                    atBegin: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('dev', [ 'watch:dev' ]);
    grunt.registerTask('test', [ 'karma:continuous' ]);
    grunt.registerTask('minified', [ 'watch:minified' ]);
    grunt.registerTask('heroku:production', ['compass']);
};
