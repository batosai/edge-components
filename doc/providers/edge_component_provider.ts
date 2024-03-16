import type { ApplicationService } from '@adonisjs/core/types'

export default class EdgeComponentProvider {
  constructor(protected app: ApplicationService) {}

  protected async registerEdgePlugin() {
    if (this.app.usingEdgeJS) {
      const edge = await import('edge.js')
      const { edgePluginComponent } = await import('../../build/index.js')
      edge.default.use(edgePluginComponent)
    }
  }

  /**
   * Adding edge tags (if edge is installed)
   */
  async boot() {
    // await this.registerEdgePlugin()
  }
}
