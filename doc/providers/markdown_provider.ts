import type { ApplicationService } from '@adonisjs/core/types'
import { MarkdownFile } from '@dimerapp/markdown'
import { toHtml } from '@dimerapp/markdown/utils'

export default class MarkdownProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * The container bindings have booted
   */
  async boot() {
    if (this.app.usingEdgeJS) {
      const edge = await import('edge.js')

      edge.default.global('markdownToHtml', async (markdownContents: string) => {
        const md = new MarkdownFile(markdownContents)
        await md.process()

        const { contents } = toHtml(md)
        return contents
      })
    }
  }
}
