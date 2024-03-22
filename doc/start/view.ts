
import edge from 'edge.js'
import env from '#start/env'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as tablerIcons } from '@iconify-json/tabler'
import { icons as fluentIcons } from '@iconify-json/fluent'

edge.global('env', env)

addCollection(tablerIcons)
addCollection(fluentIcons)

edge.use(edgeIconify)
