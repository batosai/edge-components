import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'

export default class DefaultMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {

    if ('view' in ctx) {
      ctx.view.share({
        up: ctx.up,
        renderRaw: async (template: string) => await ctx.view.renderRaw(template),
        fakeUsers: ({ currentPage, total }) => {
          let urls: any = []
          for (let index = 0; index < total; index++) {
            urls.push({ url: `#${index+1}`, page: index+1 })
          }

          return {
            currentPage,
            lastPage: urls.length,
            getUrl: (index: any) => urls[index].url,
            getUrlsForRange: (first: string, last: string) => (urls.filter((url: any) => (url.page >= first && url.page <= last))),
            getPreviousPageUrl: () => urls[currentPage-1].url,
            getNextPageUrl: () => urls[currentPage+1].url,
          }
        },
        readFile: (path: string) => fs.readFileSync(app.viewsPath(`${path}`)).toString(),
        appVersion: () => JSON.parse(fs.readFileSync(app.makePath('../package.json')).toString()).version,
      })
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
