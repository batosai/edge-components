# Edge components

Edge components is a components library for Edge template engine and AdonisJS.

## Require

This package require Tailwind with DaisyUi and Alpine

## Setup

The first step is to install the package from the npm registry.

```sh
npm i @jrmc/edge-components
```

The next step is to register the UI Kit as an Edge plugin.

Sample /start/views.ts
```ts
import View from '@ioc:Adonis/Core/View'
import jrmc from '@jrmc/edge-components'

View.use(jrmc)
```

If your first rendering is not functionnal, you can manually render with `View.getRenderer()`

In AdonisJS, you can do it inside a preload file. Add `"./start/views"` in .adonisrc.json on preloads section

### Tailwind setup

On your project directory, install the dependencies:

```sh
# install dependencies
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

# create postcss config file
touch postcss.config.js

# also install postcss-load
npm i -D postcss-loader

# create tailwind config file
npx tailwindcss init
```

Set the postcss.config.js.

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

Also, make tailwind configs minumum in tailwind.config.js

```js
const edgeComponent = require('@jrmc/edge-components/build/tailwind.config').default

module.exports = {
  mode: 'jit',
  content: ['./resources/views/**/*.edge', ...edgeComponent.content],
  plugins: [...edgeComponent.plugins],
}
```

add css base in resources/css/app.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

And enabled postcss in Encore (webpack.config.js)

```js
Encore.enablePostCssLoader()
```

### Alpine setup

```sh
npm i -D alpinejs
```

In AdonisJS, you can write the following code block inside the resources/js/app.js file.

```ts
import Alpine from 'alpinejs'

Alpine.start()
```
