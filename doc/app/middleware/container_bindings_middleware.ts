import { Logger } from '@adonisjs/core/logger'
import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

/**
 * The container bindings middleware binds classes to their request
 * specific value using the container resolver.
 *
 * - We bind "HttpContext" class to the "ctx" object
 * - And bind "Logger" class to the "ctx.logger" object
 */
export default class ContainerBindingsMiddleware {
  handle(ctx: HttpContext, next: NextFn) {
    ctx.containerResolver.bindValue(HttpContext, ctx)
    ctx.containerResolver.bindValue(Logger, ctx.logger)

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
        }
      })
    }

    return next()
  }
}
