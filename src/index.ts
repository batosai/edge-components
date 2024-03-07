import helpers from './helpers.js'

export default (edge: any) => {
    edge.mount('jrmc', new URL('../views', import.meta.url))

    edge.global('jrmc', helpers)
}
