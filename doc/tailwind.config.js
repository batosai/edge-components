/** @type {import('tailwindcss').Config} */

import edgeComponent from '../build/tailwind.config'

export default {
  content: [
    './resources/views/**/*.edge',
    ...edgeComponent.content
  ],
  theme: {
    extend: {},
  },
  plugins: [
    ...edgeComponent.plugins,
    require('@tailwindcss/typography')
  ],
}

