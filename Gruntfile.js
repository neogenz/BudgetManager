/**
 * Created by maximedesogus on 07/02/2016.
 */
module.exports = function (grunt) {

  grunt.initConfig({
    shell: {
      mongo: {
        stdout: false,
        stderr: true,
        failOnError: true,
        execOptions: {
          cwd: '.'
        },
        command: [
          'cd /Volumes/DATA/mongodb/bin/',
          './mongod --dbpath=../../developper/web/BudgetManager/db/ --nojournal'
        ].join(' && '),
      },
      server: {
        command: 'node server.js'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      back: ['src/foo.js', 'src/bar.js'],
      front: ['public/assets/**/*.js', '!public/assets/libs/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('runMongo', ['shell:mongo']);
  grunt.registerTask('runServer', ['shell:server']);
  grunt.registerTask('checkCode', ['jshint:front']);

};