const { string } = require('@poppinss/utils/build/helpers');

const flashMessages = {
  has: (name) => {
    return false
  },
  get: (name, defaultMessage) => {
    if (name == 'errors.sampleError') return 'This field is required'
    if (name == 'errors.sample2Error') return 'This field is required'
    else return defaultMessage
  },
  all: () => {
    return {
      errors: {
        sampleError: 'This field is required',
        sample2Error: 'This field is required',
      }
    }
  }
}

const jrmc = {
  getCssClass: (props, baseClass='', defaultClass='') => {
    const klass = props.has('class') ? props.get('class') : defaultClass
    const klassString = Array.isArray(klass) ? klass.join(' ') : klass
    const baseClassString = Array.isArray(baseClass) ? baseClass.join(' ') : baseClass

    return [baseClassString, klassString].join(' ').trim()
  },
  getMethodForm: (props, defaultMethod) => props.get('method', defaultMethod),
  getTagName: (props, defaultTagName='div') => props.get('as', defaultTagName),
  getName: (props, context={name: false}) => props.has('name') || context.name ? props.get('name') || context.name : '',
  getId: (props, context={id: false}) => props.has('id') || context.id || props.has('name') ? props.get('id') || context.id || props.get('name') : '',
  getRequired: (props, context={required: false}) => props.has('required') || context.required ? props.get('required') || context.required : false,
  getDisabled: obj => obj.disabled ?? '',
  getSelected: obj => obj.selected ?? '',
  getLabel: props => {
    const name = props.has('name') ? props.get('name') : ''
    return `${string.capitalCase(string.noCase(name))}:`
  },
  getChecked: (props, context = { value: null }, flashMessages) => {
    const name = jrmc.getName(props, context)

    if (flashMessages.values) {
      const value = flashMessages.get(name)
      return props.value === value
    }

    return props.get('checked') || context.value || false
  },
  getValue: (props, context={name: false, value:null}, flashMessages=null) => {
    const name = jrmc.getName(props, context)
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

module.exports = {
  jrmc,
  csrfField: () => 'csrf',
  fakeUsers: ({ currentPage, total }) => {
    let urls = []
    for (let index = 0; index < total; index++) {
      urls.push({ url: `#${index+1}`, page: index+1 })
    }

    return {
      currentPage,
      lastPage: urls.length,
      getUrl: index => urls[index].url,
      getUrlsForRange: (first, last) => (urls.filter(url => (url.page >= first && url.page <= last))),
      getPreviousPageUrl: () => urls[currentPage-1].url,
      getNextPageUrl: () => urls[currentPage+1].url,
    }
  },
  flashMessages
}
