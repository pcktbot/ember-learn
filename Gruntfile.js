module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    assemble: {
      options: {
        data: [
          'app/data/*.json',
          'package.json' //make the package.json file available to handlebars.
        ]
      },
      files: {
        'dest': 'app/templates/components/*.hbs'
      }
    }
  });
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-newer');
  grunt.registerTask('default', ['newer:assemble']);
}
