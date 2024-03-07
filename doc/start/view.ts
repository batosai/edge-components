
import edge from 'edge.js'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as akarIcons } from '@iconify-json/akar-icons'
import { icons as faIcons } from '@iconify-json/fa-solid'
import { icons as tablerIcons } from '@iconify-json/tabler'
// import { migrate } from 'edge.js/plugins/migrate'
import jrmc from '../../build/index.js'

addCollection(akarIcons)
addCollection(faIcons)
addCollection(tablerIcons)

edge.use(jrmc)
edge.use(edgeIconify)

// edge.use(migrate)
edge.use(jrmc)
