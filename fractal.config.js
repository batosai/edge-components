'use strict';

/*
* Require the path module
*/
const path = require('path');
const mandelbrot = require('@frctl/mandelbrot');
const { noCase } = require('text-no-case');

// create a new instance with custom config options
const myCustomisedTheme = mandelbrot({
  skin: 'white',
  panels: ['html', 'view', 'resources', 'info', 'notes'],
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
fractal.set('project.title', 'edge-components');
fractal.web.set('builder.dest', __dirname + '/build');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'components'));

/*
 * Tell Fractal where to look for documentation pages.
 */
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
fractal.components.set('edge.helpers', {
  fakeUsers: ({ currentPage, total }) => {
    let urls = []
    for (let index = 0; index < total; index++) {
      urls.push({ url: `#${index+1}`, page: index+1 })
    }

    return {
      currentPage,
      lastPage: urls.length,
      getUrlsForRange: (first, last) => (urls.filter(url => (url.page >= first && url.page <= last)))
    }
  },
  capitalize: text => (text[0].toUpperCase() + text.substring(1)),
  noCase
});
fractal.components.engine('@jrmc/fractal-edge-adapter'); // use the configured Nunjucks instance for components
