/**
 * Created by maximedesogus on 07/02/2016.
 */
module.exports = function (grunt) {

    grunt.initConfig({
        shell: {
            run: {
                stdout: false,
                stderr: true,
                failOnError: true,
                execOptions: {
                    cwd: '.'
                },
                command: [
                    'cd /Volumes/DATA/mongodb/bin/',
                    './mongod --dbpath=../../developper/web/BudgetManager/db/ --nojournal'
                ].join('&&')

            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            back: ['src/foo.js', 'src/bar.js'],
            front: ['public/**/*.js', '!public/assets/libs/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('runMongo', ['shell:run']);
    grunt.registerTask('checkCode', ['jshint:front']);

};