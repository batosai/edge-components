import { string } from '@poppinss/utils/build/helpers'

export default {
  getCssClass: (props, baseClass='', defaultClass='') => {
    const klass = props.has('class') ? props.get('class') : defaultClass
    const klassString = Array.isArray(klass) ? klass.join(' ') : klass
    const baseClassString = Array.isArray(baseClass) ? baseClass.join(' ') : baseClass

    return [baseClassString, klassString].join(' ').trim()
  },
  getTagName: (props, defaultTagName='div') => props.has('as') ? props.get('as') : defaultTagName,
  getName: (props, context={name: false}) => props.has('name') || context.name ? props.get('name') || context.name : '',
  getId: (props, context={id: false}) => props.has('id') || context.id || props.has('name') ? props.get('id') || context.id || props.get('name') : '',
  getRequired: (props, context={required: false}) => props.has('required') || context.required ? props.get('required') || context.required : false,
  getLabel: props => {
    const name = props.has('name') ? props.get('name') : ''
    return string.capitalCase(string.noCase(name))
  }
}
