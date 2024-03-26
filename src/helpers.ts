import string from '@poppinss/utils/string'

const defaultFlash = {
  values:{},
  has: (name: boolean) => name ? false : false,
  get: (name: string) => name
}

const obj = {
  getCssClass: (props: any, baseClass='', defaultClass='') => {
    const klass = props.has('class') ? props.get('class') : defaultClass
    const klassString = Array.isArray(klass) ? klass.join(' ') : klass
    const baseClassString = Array.isArray(baseClass) ? baseClass.join(' ') : baseClass

    return [baseClassString, klassString].join(' ').trim()
  },
  getMethodForm: (props: any, defaultMethod: string) => props.get('method', defaultMethod),
  getTagName: (props: any, defaultTagName: string = 'div') => props.get('as', defaultTagName),
  getName: (props: any, context={name: false}) => props.has('name') || context.name ? props.get('name') || context.name : '',
  getId: (props: any, context={id: false}) => props.has('id') || context.id || props.has('name') ? props.get('id') || context.id || props.get('name') : '',
  getRequired: (props: any, context={required: false}) => props.has('required') || context.required ? props.get('required') || context.required : false,
  getDisabled: (obj: any) => obj.disabled ?? '',
  getSelected: (props: any, context = { value: null, name: false }, flashMessages=defaultFlash, option: any) => {
    const name = obj.getName(props, context)
    const value = obj.getValue(props, context)
    let values: null|any = null

    if (value) {
      values = Array.isArray(value) ? value : [value]
    }

    if (Object.keys(flashMessages.values).length !== 0) {
      values = flashMessages.get(name)
    }

    if (values) {
      return values.includes(option.value)
    }

    return option.selected ?? false
  },
  getLabel: (props: any) => {
    const name = props.has('name') ? props.get('name') : ''

    return `${string.capitalCase(string.noCase(name))}:`
  },
  getChecked: (props: any, context = { value: null, name: false }, flashMessages: any) => {
    if (Object.keys(flashMessages.values).length !== 0) {
      const name = obj.getName(props, context)
      const value = flashMessages.get(name)
      return props.value === value
    }

    return props.get('checked') || context.value || false
  },
  getValue: (props: any, context={name: false, value:null}, flashMessages=defaultFlash) => {
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
