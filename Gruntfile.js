module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dist: {
                options: {
                    specify: 'src/static/sass/app.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');

    // Default tasks
    grunt.registerTask('heroku:production', ['compass']);
};
