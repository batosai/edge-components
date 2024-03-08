
import edge from 'edge.js'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as tablerIcons } from '@iconify-json/tabler'
// import { migrate } from 'edge.js/plugins/migrate'
import jrmc from '../../build/index.js'

addCollection(tablerIcons)

edge.use(jrmc)
edge.use(edgeIconify)

// edge.use(migrate)
edge.use(jrmc)
