import helpers from './helpers.js'
import type { Edge } from 'edge.js'
import type { PluginFn } from 'edge.js/build/src/types'

export const edgePluginComponent: PluginFn<undefined> = (edge: Edge) => {
    edge.mount('jrmc', new URL('../views', import.meta.url))

    edge.global('jrmc', helpers)
}
