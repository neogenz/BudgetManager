/**
 * Created by maximedesogus on 07/02/2016.
 */
module.exports = function (grunt) {

    // Configuration de Grunt
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
        }
    });

    grunt.loadNpmTasks('grunt-shell');

    // Définition des tâches Grunt
    grunt.registerTask('default', ['shell:run']);

};