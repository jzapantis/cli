module.exports = function (grunt) {

  const env = grunt.option('env') || "local";

  grunt.initConfig({
    sync: {
      local: {
        files: [{
          cwd: 'src',
          src: [
            "**",
            "!**/*.ts"
          ],
          dest: "build"
        }]
      },
      azure: {
        files: [{
          cwd: 'src',
          src: [
            "**",
            "!**/*.ts"
          ],
          dest: "build"
        }]
      }
    }, 
    copy: {
      local: {
        files: [{
          src: `src/config/env-vars/config-${env}.ts`,
          dest: 'src/config/env-vars/config.ts'
        }]
      }
    },  
    ts: {
      options: {
        rootDir: "src"
      },
      local: {
        src: ["**/*.ts", "!node_modules/**/*.ts", "!tests/**/*"],
        outDir: "build",
        watch: ["src/**/*.ts", "Gruntfile.js", "src/**/*.json"],
        options: {
          module: "commonjs",
          target: "es6",
        }
      },
      azure: {
        src: ["**/*.ts", "!node_modules/**/*.ts", "!tests/**/*", "!src/config/env-vars/**"],
        outDir: "build",
        options: {
          module: "commonjs",
          target: "es6",
        }
      }
    },
    clean: {
      azure: {
        clean: {
          folder_v2: ['build/config/env-vars/**'],
        }
      }
    },
  });
  grunt.loadNpmTasks("grunt-sync");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask("default", ["sync:local", `copy:local`, "ts:local"]);
  grunt.registerTask("build", ["sync:azure", "ts:azure", "clean:azure"]);

};