/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import vine from '@vinejs/vine'

router.on('/').render('pages/home').as('home')
router.on('/changelog').render('pages/changelog').as('changelog')

router.on('/button').render('pages/actions/button').as('button')
router.on('/about/button').render('pages/about', { group: 'actions', name: 'button' }).as('about-button')
router.on('/drawer').render('pages/actions/drawer').as('drawer')
router.on('/about/drawer').render('pages/about', { group: 'actions', name: 'drawer' }).as('about-drawer')
router.on('/dropdown').render('pages/actions/dropdown').as('dropdown')
router.on('/about/dropdown').render('pages/about', { group: 'actions', name: 'dropdown' }).as('about-dropdown')
router.on('/modal').render('pages/actions/modal').as('modal')
router.on('/about/modal').render('pages/about', { group: 'actions', name: 'modal' }).as('about-modal')

router.on('/alert').render('pages/display/alert').as('alert')
router.on('/about/alert').render('pages/about', { group: 'display', name: 'alert' }).as('about-alert')
router.on('/avatar').render('pages/display/avatar').as('avatar')
router.on('/about/avatar').render('pages/about', { group: 'display', name: 'avatar' }).as('about-avatar')
router.on('/badge').render('pages/display/badge').as('badge')
router.on('/about/badge').render('pages/about', { group: 'display', name: 'badge' }).as('about-badge')
router.on('/card').render('pages/display/card').as('card')
router.on('/about/card').render('pages/about', { group: 'display', name: 'card' }).as('about-card')
router.on('/carousel').render('pages/display/carousel').as('carousel')
router.on('/about/carousel').render('pages/about', { group: 'display', name: 'carousel' }).as('about-carousel')
router.on('/chat').render('pages/display/chat').as('chat')
router.on('/about/chat').render('pages/about', { group: 'display', name: 'chat' }).as('about-chat')
router.on('/loading').render('pages/display/loading').as('loading')
router.on('/about/loading').render('pages/about', { group: 'display', name: 'loading' }).as('about-loading')
router.on('/progress').render('pages/display/progress').as('progress')
router.on('/about/progress').render('pages/about', { group: 'display', name: 'progress' }).as('about-progress')
router.on('/table').render('pages/display/table').as('table')
router.on('/about/table').render('pages/about', { group: 'display', name: 'table' }).as('about-table')
router.on('/toast').render('pages/display/toast').as('toast')
router.on('/about/toast').render('pages/about', { group: 'display', name: 'toast' }).as('about-toast')
router.on('/tooltip').render('pages/display/tooltip').as('tooltip')
router.on('/about/tooltip').render('pages/about', { group: 'display', name: 'tooltip' }).as('about-tooltip')

router.on('/checkbox').render('pages/form/checkbox').as('checkbox')
router.on('/about/checkbox').render('pages/about', { group: 'form', name: 'checkbox' }).as('about-checkbox')
router.on('/container').render('pages/form/container').as('container')
router.on('/about/container').render('pages/about', { group: 'form', name: 'container' }).as('about-container')
router.on('/control').render('pages/form/control').as('control')
router.on('/about/control').render('pages/about', { group: 'form', name: 'control' }).as('about-control')
router.on('/default-value').render('pages/form/default-value').as('default-value')
router.on('/file').render('pages/form/file').as('file')
router.on('/about/file').render('pages/about', { group: 'form', name: 'file' }).as('about-file')
router.on('/input').render('pages/form/input').as('input')
router.on('/about/input').render('pages/about', { group: 'form', name: 'input' }).as('about-input')
router.on('/label').render('pages/form/label').as('label')
router.on('/about/label').render('pages/about', { group: 'form', name: 'label' }).as('about-label')
router.on('/radio').render('pages/form/radio').as('radio')
router.on('/about/radio').render('pages/about', { group: 'form', name: 'radio' }).as('about-radio')
router.on('/range').render('pages/form/range').as('range')
router.on('/about/range').render('pages/about', { group: 'form', name: 'range' }).as('about-range')
router.on('/select').render('pages/form/select').as('select')
router.on('/about/select').render('pages/about', { group: 'form', name: 'select' }).as('about-select')
router.on('/textarea').render('pages/form/textarea').as('textarea')
router.on('/about/textarea').render('pages/about', { group: 'form', name: 'textarea' }).as('about-textarea')
router.on('/toggle').render('pages/form/toggle').as('toggle')
router.on('/about/toggle').render('pages/about', { group: 'form', name: 'toggle' }).as('about-toggle')
router.on('/error').render('pages/form/error').as('error')
router.post('/error', async ({ response, session }) => {
  session.flash({
    errors: {
      sampleError: 'this field is required',
      sample2Error: 'this field is required',
    }
  })

  return response.redirect().back()
})

router.on('/pagination').render('pages/navigation/pagination').as('pagination')
router.on('/about/pagination').render('pages/about', { group: 'navigation', name: 'pagination' }).as('about-pagination')
router.on('/tab').render('pages/navigation/tab').as('tab')
router.on('/about/tab').render('pages/about', { group: 'navigation', name: 'tab' }).as('about-tab')

router.on('/login').render('pages/samples/login').as('login')
router.post('/login', async ({ response, request }) => {
  const schema = vine.object({
    email: vine.string().email(),
    password: vine
    .string()
    .minLength(8)
    .maxLength(32)
  })

  const data = request.all()
  await vine.validate({ schema, data })

  return response.redirect().toPath('/login')
})

router.on('/admin').render('pages/samples/admin').as('admin')


router.get('/gdpr', async ({ request, view }) => {
  const cookies = request.cookie('_gdpr', { umami: true })

  return view.render('pages/gdpr', { cookies })
}).as('gdpr')
router.post('/gdpr', async ({ request, response }) => {
  response.cookie('_gdpr', { umami: request.input('umami', false) })

  response.noContent()
})

router.get('/robots.txt', async ({ response, view }) => {
  response.header('Content-type', 'text/plain')

  return view.render('pages/robots')
}).as('robots')
router.get('/sitemap.xml', async ({ response, view }) => {
  response.header('Content-type', 'application/xml')

  return view.render('pages/sitemap', { routes: router.toJSON().root })
}).as('sitemap')
