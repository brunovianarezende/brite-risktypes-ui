export class FullType {
  constructor (typeInfo) {
    this.typeInfo = typeInfo
  }

  get id () {
    return this.typeInfo.id
  }

  get name () {
    return this.typeInfo.name
  }

  get description () {
    return this.typeInfo.description
  }

  get attributes () {
    return this.typeInfo.attributes
  }

  createInstance () {
    return new InsuranceInstance(this)
  }
}

export class InsuranceInstance {
  constructor (fullType, id) {
    this.fullType = fullType
    this.id = id

    this.instanceValues = {}
    this.fullType.attributes.forEach(attribute => {
      this.instanceValues[attribute.id] = null
    })
  }

  bindReactivity (reactiveObject) {
    // Vue reactivity thing, I'm not sure how to unit test it
    this.instanceValues = Object.assign({}, reactiveObject, this.instanceValues)
    return this.instanceValues
  }

  getWidgets (mode = 'edit') {
    const self = this
    if (mode === 'edit') {
      return this.fullType.attributes.map((attribute) => {
        const result = {
          id: attribute.id
        }
        result.type = {
          text: 'text-widget',
          date: 'date-widget',
          enum: 'select-widget',
          numeric: 'numeric-widget',
          int: 'integer-widget'
        }[attribute.type]

        result.props = {
          label: attribute.name,
          placeholder: attribute.description,
          value: self.instanceValues[attribute.id]
        }

        if (attribute.type === 'enum') {
          result.props.options = attribute.allowed_values
        }

        // Need to add proper unit tests for the events
        result.events = {
          input (v) {
            self.instanceValues[attribute.id] = v
            result.props.value = v
          }
        }

        return result
      })
    } else {
      return this.fullType.attributes.map((attribute) => {
        const result = {
          id: attribute.id
        }
        result.type = {
          date: 'date-view-widget'
        }[attribute.type] || 'base-view-widget'

        result.props = {
          label: attribute.name,
          value: self.instanceValues[attribute.id]
        }

        return result
      })
    }
  }
}
