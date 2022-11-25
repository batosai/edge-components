import { string } from '@poppinss/utils/build/helpers'

const obj = {
  getCssClass: (props, baseClass='', defaultClass='') => {
    const klass = props.has('class') ? props.get('class') : defaultClass
    const klassString = Array.isArray(klass) ? klass.join(' ') : klass
    const baseClassString = Array.isArray(baseClass) ? baseClass.join(' ') : baseClass

    return [baseClassString, klassString].join(' ').trim()
  },
  getMethodForm: (props, defaultMethod) => props.get('method', defaultMethod),
  getTagName: (props, defaultTagName = 'div') => props.get('as', defaultTagName),
  getName: (props, context={name: false}) => props.has('name') || context.name ? props.get('name') || context.name : '',
  getId: (props, context={id: false}) => props.has('id') || context.id || props.has('name') ? props.get('id') || context.id || props.get('name') : '',
  getRequired: (props, context={required: false}) => props.has('required') || context.required ? props.get('required') || context.required : false,
  getDisabled: obj => obj.disabled ?? '',
  getSelected: (props, context = { value: null }, flashMessages=null, option) => {
    const name = obj.getName(props, context)
    const value = obj.getValue(props, context)
    let values = null

    if (value) {
      values = Array.isArray(value) ? value : [value]
    }

    if (flashMessages && flashMessages.values) {
      values = flashMessages.get(name)
    }

    if (values) {
      return values.includes(option.value)
    }

    return option.selected ?? false
  },
  getLabel: props => {
    const name = props.has('name') ? props.get('name') : ''
    return `${string.capitalCase(string.noCase(name))}:`
  },
  getChecked: (props, context = { value: null }, flashMessages) => {
    if (flashMessages.values) {
      const name = obj.getName(props, context)
      const value = flashMessages.get(name)
      return props.value === value
    }

    return props.get('checked') || context.value || false
  },
  getValue: (props, context={name: false, value:null}, flashMessages=null) => {
    const name = obj.getName(props, context)
    const type = props.get('type', 'text')

    if(['radio', 'checkbox', 'range'].includes(type)) {
      return props.get('value') || context.value || ''
    }

    if (flashMessages && flashMessages.has(name)) {
      return flashMessages.get(name)
    }

    return props.get('value') || context.value || ''
  },
}

export default obj
