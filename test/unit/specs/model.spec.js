import { FullType, InsuranceInstance } from '@/model'

describe('model', () => {
  const createRawType = (attributes) => {
    return {
      name: 'Stolen car',
      description: 'Insurance for when a car is stolen',
      attributes
    }
  }

  describe('FullType', () => {
    it('should return the type name', () => {
      const insuranceType = new FullType({
        name: 'Stolen car'
      })
      expect(insuranceType.name).toEqual('Stolen car')
    })

    it('should return the type description', () => {
      const insuranceType = new FullType({
        name: 'Stolen car',
        description: 'Insurance for when a car is stolen'
      })
      expect(insuranceType.description).toEqual('Insurance for when a car is stolen')
    })

    it('should return the type attributes', () => {
      const insuranceType = new FullType({
        name: 'Stolen car',
        description: 'Insurance for when a car is stolen',
        attributes: [
          {
            id: 47,
            name: 'Customer name',
            description: 'The customer name',
            type: 'text'
          }
        ]
      })
      expect(insuranceType.attributes).toEqual([
        {
          id: 47,
          name: 'Customer name',
          description: 'The customer name',
          type: 'text'
        }
      ])
    })

    describe('FullType.createInstance', () => {
      it('should return a new instance created after the type data', () => {
        const attributes = [
          {
            id: 47,
            name: 'Customer name',
            description: 'The customer name',
            type: 'text'
          }
        ]
        const insuranceType = new FullType(createRawType(attributes))
        const expected = new InsuranceInstance(insuranceType)
        expect(insuranceType.createInstance()).toEqual(expected)
      })
    })
  })

  describe('InsuranceInstance', () => {
    const createType = (attrs) => {
      return new FullType(createRawType(attrs))
    }

    describe('widgets', () => {
      it('should return the correct widget when type is text', () => {
        const instance = new InsuranceInstance(createType([
          {
            id: 47,
            name: 'Customer name',
            description: 'The customer name',
            type: 'text'
          }
        ]))
        expect(instance.getWidgets()).toEqual([
          {
            id: 47,
            type: 'TextInput',
            props: {
              label: 'Customer name',
              placeholder: 'The customer name'
            }
          }
        ])
      })
    })
  })
})
