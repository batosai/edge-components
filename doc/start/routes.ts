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
router.on('/drawer').render('pages/actions/drawer').as('drawer')
router.on('/dropdown').render('pages/actions/dropdown').as('dropdown')
router.on('/modal').render('pages/actions/modal').as('modal')

router.on('/alert').render('pages/display/alert').as('alert')
router.on('/avatar').render('pages/display/avatar').as('avatar')
router.on('/badge').render('pages/display/badge').as('badge')
router.on('/card').render('pages/display/card').as('card')
router.on('/carousel').render('pages/display/carousel').as('carousel')
router.on('/chat').render('pages/display/chat').as('chat')
router.on('/loading').render('pages/display/loading').as('loading')
router.on('/progress').render('pages/display/progress').as('progress')
router.on('/table').render('pages/display/table').as('table')
router.on('/toast').render('pages/display/toast').as('toast')
router.on('/tooltip').render('pages/display/tooltip').as('tooltip')

router.on('/checkbox').render('pages/form/checkbox').as('checkbox')
router.on('/container').render('pages/form/container').as('container')
router.on('/control').render('pages/form/control').as('control')
router.on('/default-value').render('pages/form/default-value').as('default-value')
router.on('/file').render('pages/form/file').as('file')
router.on('/input').render('pages/form/input').as('input')
router.on('/label').render('pages/form/label').as('label')
router.on('/radio').render('pages/form/radio').as('radio')
router.on('/range').render('pages/form/range').as('range')
router.on('/select').render('pages/form/select').as('select')
router.on('/textarea').render('pages/form/textarea').as('textarea')
router.on('/toggle').render('pages/form/toggle').as('toggle')
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
router.on('/tab').render('pages/navigation/tab').as('tab')

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
