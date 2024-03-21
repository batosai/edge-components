
import edge from 'edge.js'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as tablerIcons } from '@iconify-json/tabler'
import { icons as fluentIcons } from '@iconify-json/fluent'

addCollection(tablerIcons)
addCollection(fluentIcons)

edge.use(edgeIconify)
