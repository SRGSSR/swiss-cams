'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>*/\n',

    clean: {
      all: {
        src: ['dist', 'tmp']
      },
      tmp: {
        src: ['tmp']
      }
    },

    connect: {
      main: {
        options: {
          port: 9000,
          protocol: 'http',
          hostname: '*'
        }
      }
    },

    dom_munger: {
      read: {
        options: {
          read: [
            {selector: 'script[data-concat!="false"]', attribute: 'src', writeto: 'dependencies'}
          ]
        },
        src: 'index.html'
      },
      update: {
        options: {
          remove: ['script[data-concat!="false"]'],
          append: [
            {selector: 'head', html: '<script src="<%= pkg.name %>.min.js"></script>'}
          ]
        },
        src: 'index.html',
        dest: 'dist/index.html'
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['<%= dom_munger.data.dependencies %>', '<%= html2js.main.dest %>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    ngAnnotate: {
      main: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    copy: {
      main: {
        files: [{src: 'node_modules/cesium/Build/Cesium/**', dest: 'dist/', filter: 'isFile', expand: true}]
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    htmlmin: {
      main: {
        options: {
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    },

    html2js: {
      options: {
        htmlmin: '<%= htmlmin.main.options %>',
        existingModule: true,
        singleModule: true,
        module: 'swisscams',
        base: ''
      },
      main: {
        src: ['src/**/*.html'],
        dest: 'tmp/templates.js'
      }
    },

    jshint: {
      gruntfile: {
        options: {
          node: true
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['src/**/*.js']
      },
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src']
      }
    }
  });

  grunt.registerTask('build', [
    'clean:all',
    'jshint',
    'html2js',
    'dom_munger:read',
    'concat',
    'ngAnnotate',
    'uglify',
    'copy',
    'dom_munger:update',
    'htmlmin',
    'clean:tmp']);
  grunt.registerTask('serve', ['jshint', 'connect', 'watch']);
  grunt.registerTask('default', ['clean', 'build']);
};
