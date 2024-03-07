import fs from 'node:fs'
import app from '@adonisjs/core/services/app'
// import { HttpContext } from '@adonisjs/core/http'
import edge from 'edge.js'
import { CodeToHastOptions, getHighlighter } from 'shiki/bundle/web'

const myLanguage = JSON.parse(fs.readFileSync(app.makePath('edge.tmLanguage.json'), 'utf8'))

const highlighter = await getHighlighter({
  themes: ['one-dark-pro'],
  langs: ['html']
})
await highlighter.loadLanguage(myLanguage)

// edge.global('highlighter', highlighter)
edge.global('codeToHtml', (code: string, opt: CodeToHastOptions) => highlighter.codeToHtml(code, { theme: 'one-dark-pro', ...opt }))
edge.global('renderRaw', async (template: string) => await edge.renderRaw(template))

// HttpContext.getter(
//   'view',
//   function (this: HttpContext) {

//     return this.view.share({
//       highlighter
//     })
//     // return edge.createRenderer().share({
//     //   highlighter,
//     // })
//   },
//   true
// )
