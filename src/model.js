export class FullType {
  constructor (typeInfo) {
    this.typeInfo = typeInfo
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
  }

  getWidgets () {
    return this.fullType.attributes.map((attribute) => {
      const result = {
        id: attribute.id
      }
      if (attribute.type === 'text') {
        result.type = 'TextInput'
      }
      result.props = {
        label: attribute.name,
        placeholder: attribute.description
      }
      return result
    })
  }
}
