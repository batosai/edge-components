'use strict';

/*
* Require the path module
*/
const path = require('path');
const mandelbrot = require('@frctl/mandelbrot');

// create a new instance with custom config options
const myCustomisedTheme = mandelbrot({
  skin: 'white',
  information: [
    {
        label: 'Version',
        value: require('./package.json').version,
    },
    {
        label: 'Built on',
        value: new Date(),
        type: 'time',
        format: (value) => {
            return value.toLocaleDateString('en');
        },
    },
  ],
});

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Give your project a title.
 */
fractal.set('project.title', 'edge-daisyUI');
fractal.web.set('builder.dest', __dirname + '/build');

/*
 * Tell Fractal where to look for components and docs.
 */
fractal.components.set('path', path.join(__dirname, 'components'));
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'));

// tell Fractal to use the configured theme by default
fractal.web.theme(myCustomisedTheme);

fractal.components.set('default.status', 'wip');
fractal.docs.set('default.status', 'draft');

fractal.components.set('ext', '.edge'); // look for files with a .nunj file extension
fractal.components.set('edge.components.path', path.join(__dirname, 'views'));
fractal.components.engine('@jrmc/fractal-edge-adapter'); // use the configured Nunjucks instance for components
