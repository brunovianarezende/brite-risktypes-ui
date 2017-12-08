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
  constructor (fullType) {
    this.fullType = fullType

    this.instanceValues = {}
    this.fullType.attributes.forEach(attribute => {
      this.instanceValues[attribute.id] = null
    })
  }

  getWidgets () {
    const self = this
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

      result.events = {
        input (v) {
          self.instanceValues[attribute.id] = v
        }
      }

      return result
    })
  }
}
