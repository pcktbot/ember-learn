'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      sourceMap: false,
      onlyIncluded: true,
      includePaths: [
        'vendor/cli-sass'
        // add more if needed by other components.
      ]
      outputPaths: {
        app: {
          css: {
            'app': 'app/styles/app.css'
          }
        }
      }
    }; // end sassOptions
  });

  return app.toTree();
};
