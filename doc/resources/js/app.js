import 'unpoly/unpoly.css'
import '../css/app.css'

import 'unpoly'
import Alpine from 'alpinejs'

import { themeChange } from 'theme-change'
import ClipboardJS from 'clipboard'

themeChange()
new ClipboardJS('.btn-clipboard')


// Unpoly
up.link.config.followSelectors.push('a[href]')
up.form.config.submitSelectors.push(['form'])
up.feedback.config.currentClasses.push(['active'])
up.feedback.config.navSelectors.push(['nav'])

up.layer.config.drawer.size = 'large'
up.layer.config.drawer.position = 'right'


// Alpine
Alpine.start()
