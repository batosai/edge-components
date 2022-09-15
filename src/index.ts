import path from 'path'
import helpers from './helpers'

export default (edge) => {
    edge.mount('jrmc', path.join(__dirname, '../views'))
    edge.global('jrmc', helpers)
}
