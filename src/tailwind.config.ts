import path from 'path'

export default {
  content: [path.join(__dirname, '../../views/**/*.edge')],
  plugins: [require("daisyui")],
}
