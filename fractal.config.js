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

const capitalize = text => (text[0].toUpperCase() + text.substring(1))

fractal.components.set('edge.helpers', {
  jrmc: {
    getCssClass: (props, baseClass='', defaultClass='') => {
      const klass = props.has('class') ? props.get('class') : defaultClass
      const klassString = Array.isArray(klass) ? klass.join(' ') : klass
      const baseClassString = Array.isArray(baseClass) ? baseClass.join(' ') : baseClass

      return [baseClassString, klassString].join(' ').trim()
    },
    getTagName: (props, defaultTagName='div') => props.has('as') ? props.get('as') : defaultTagName,
    getName: (props, context={name: false}) => props.has('name') || context.name ? props.get('name') || context.name : '',
    getId: (props, context={id: false}) => props.has('id') || context.id || props.has('name') ? props.get('id') || context.id || props.get('name') : '',
    getRequired: (props, context={required: false}) => props.has('required') || context.required ? props.get('required') || context.required : false,
    getLabel: props => {
      const name = props.has('name') ? props.get('name') : ''
      return capitalize(noCase(name))
    }
  },
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
  flashMessages: {
    get: (name, defaultMessage) => {
      if (name == 'errors.sampleError') return 'This field is required'
      else return defaultMessage
    }
  }
});
fractal.components.engine('@jrmc/fractal-edge-adapter'); // use the configured Nunjucks instance for components
