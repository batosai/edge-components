import '../css/app.css'
import 'unpoly/unpoly.css'

import 'unpoly'
import Alpine from 'alpinejs'


// Unpoly
up.link.config.followSelectors.push('a[href]')
up.form.config.submitSelectors.push(['form'])
up.feedback.config.currentClasses.push(['active'])
up.feedback.config.navSelectors.push(['nav'])

up.layer.config.drawer.size = 'large'
up.layer.config.drawer.position = 'right'


// Alpine
Alpine.start()
