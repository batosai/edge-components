
import edge from 'edge.js'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as tablerIcons } from '@iconify-json/tabler'
// import { edgePluginComponent } from '../../build/index.js'

addCollection(tablerIcons)

// edge.use(edgePluginComponent)
edge.use(edgeIconify)
