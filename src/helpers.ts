import { string } from '@poppinss/utils/build/helpers'

const defaultFlash = {
  values:null,
  has: name => name ? false : false,
  get: name => name
}

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
  getSelected: (props, context = { value: null, name: false }, flashMessages=defaultFlash, option) => {
    const name = obj.getName(props, context)
    const value = obj.getValue(props, context)
    let values: null|any = null

    if (value) {
      values = Array.isArray(value) ? value : [value]
    }

    if (flashMessages.values) {
      values = flashMessages.get(name)
    }

    if (values) {
      return values.includes(option.value)
    }

    return option.selected ?? false
  },
  getLabel: (props, context = { translator: { prefix: '' } }, t=(k)=>k) => {
    let name = props.has('name') ? props.get('name') : ''

    if (props.has('translator.prefix')) {
      name = t(`${props.translator.prefix}${name}`)
    } else if (context?.translator?.prefix) {
      name = t(`${context.translator.prefix}${name}`)
    }

    return `${string.capitalCase(string.noCase(name))}:`
  },
  getChecked: (props, context = { value: null, name: false }, flashMessages) => {
    if (flashMessages.values) {
      const name = obj.getName(props, context)
      const value = flashMessages.get(name)
      return props.value === value
    }

    return props.get('checked') || context.value || false
  },
  getValue: (props, context={name: false, value:null}, flashMessages=defaultFlash) => {
    const name = obj.getName(props, context)
    const type = props.get('type', 'text')

    if(['radio', 'checkbox', 'range'].includes(type)) {
      return props.get('value') || context.value || ''
    }

    if (flashMessages.has(name)) {
      return flashMessages.get(name)
    }

    return props.get('value') || context.value || ''
  },
}

export default obj
