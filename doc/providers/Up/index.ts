import { HttpContext } from '@adonisjs/core/http'
// import edge from 'edge.js'
import Up from './up.js'

// import fs from 'node:fs'
// import app from '@adonisjs/core/services/app'
// import { getHighlighter } from 'shiki'

// const myLanguage = JSON.parse(fs.readFileSync(app.makePath('edge.tmLanguage.json'), 'utf8'))

// const highlighter = await getHighlighter({
//   themes: ['nord'],
//   langs: [],
// })
// await highlighter.loadLanguage(myLanguage)


declare module '@adonisjs/core/http' {
  export interface HttpContext {
    up: Up
  }
}

HttpContext.getter('up', function (this: HttpContext) {
  return new Up(this)
}, true)

// HttpContext.getter(
//   'view',
//   function (this: HttpContext) {
//     // return this.view.share({
//     //   up: this.up,
//     // })
//     return edge.createRenderer().share({
//       up: this.up,
//       request: this.request,
//       // highlighter
//     })
//   },
//   true
// )

// HttpContext.getter(
//   'up',
//   function () {
//     return new Up(this)
//   },
//   true
// )

// Server.hooks.before(async (ctx) => {
//   ctx.view.share({ up: ctx.up })
// })

// Server.hooks.after(async (ctx) => {
//   ctx.up.commit()
// })
