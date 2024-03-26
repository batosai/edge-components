import type { ApplicationService } from '@adonisjs/core/types'
import edge from 'edge.js'

export default class EdgeComponentsProvider {
  constructor(protected app: ApplicationService) {}

  protected async registerEdgePlugin() {
    if (this.app.usingEdgeJS) {
      // const edge = await import('edge.js')
      const { edgePluginComponent } = await import('../src/index.js')
      edge.use(edgePluginComponent)
    }
  }

  /**
   * Adding edge tags (if edge is installed)
   */
  async boot() {
    await this.registerEdgePlugin()
  }
}
