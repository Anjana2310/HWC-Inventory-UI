module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-war');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    war: {
      target: {
        options: {
          war_dist_folder: 'target', /* Folder where to generate the WAR. */
          war_name: 'inventory-ui', /* The name fo the WAR file (.war will be the extension) */
          webxml_display_name: 'inventory-ui',
        },
        files: [
          {
            expand: true,
            cwd: 'dist',
            src: ['**'],
            dest: ''
          }
        ]
      }
    }
  });

  grunt.registerTask('default', ['war']);
};
