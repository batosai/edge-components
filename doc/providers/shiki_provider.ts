import type { ApplicationService } from '@adonisjs/core/types'
import app from '@adonisjs/core/services/app'
import { CodeToHastOptions, getHighlighter } from 'shiki/bundle/web'
import fs from 'node:fs'

export default class ShikiProvider {
  constructor(protected app: ApplicationService) {}

  protected async registerEdgePlugin() {
    if (this.app.usingEdgeJS) {
      const edge = await import('edge.js')

      const myLanguage = JSON.parse(fs.readFileSync(app.makePath('edge.tmLanguage.json'), 'utf8'))

      const highlighter = await getHighlighter({
        themes: ['one-dark-pro'],
        langs: ['html']
      })
      await highlighter.loadLanguage(myLanguage)

      edge.default.global('codeToHtml', (code: string, opt: CodeToHastOptions) => highlighter.codeToHtml(code, { theme: 'one-dark-pro', ...opt }))

    }
  }

  /**
   * The container bindings have booted
   */
  async boot() {
    await this.registerEdgePlugin()
  }
}
