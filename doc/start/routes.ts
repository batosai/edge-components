/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home').as('home')
router.on('/changelog').render('pages/changelog').as('changelog')
router.on('/button').render('pages/button').as('button')
router.on('/drawer').render('pages/drawer').as('drawer')
router.on('/dropdown').render('pages/dropdown').as('dropdown')
router.on('/modal').render('pages/modal').as('modal')
