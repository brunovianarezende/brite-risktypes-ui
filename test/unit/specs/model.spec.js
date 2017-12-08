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
    it('should return the type id', () => {
      const insuranceType = new FullType({
        id: 2,
        name: 'Stolen car'
      })
      expect(insuranceType.id).toEqual(2)
    })

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

    describe('instanceValues', () => {
      it('should contain one key for each attribute', () => {
        const instance = new InsuranceInstance(createType([
          {
            id: 47,
            name: 'Customer name',
            description: 'The customer name',
            type: 'text'
          },
          {
            id: 48,
            name: 'Date',
            description: 'The date',
            type: 'date'
          }
        ]))

        expect(instance.instanceValues).toEqual({
          47: null,
          48: null
        })
      })
    })

    describe('widgets', () => {
      const t = (widgets) => {
        widgets.forEach(widget => {
          expect(widget['events']).toBeTruthy()
          delete widget['events']
        })
        return widgets
      }

      describe('edit widgets', () => {
        it('should return the correct widget when type is text', () => {
          const instance = new InsuranceInstance(createType([
            {
              id: 47,
              name: 'Customer name',
              description: 'The customer name',
              type: 'text'
            }
          ]))
          expect(t(instance.getWidgets())).toEqual([
            {
              id: 47,
              type: 'text-widget',
              props: {
                value: null,
                label: 'Customer name',
                placeholder: 'The customer name'
              }
            }
          ])
        })

        it('should return the correct widget when type is date', () => {
          const instance = new InsuranceInstance(createType([
            {
              id: 47,
              name: 'Date',
              description: 'The Date',
              type: 'date'
            }
          ]))
          expect(t(instance.getWidgets())).toEqual([
            {
              id: 47,
              type: 'date-widget',
              props: {
                value: null,
                label: 'Date',
                placeholder: 'The Date'
              }
            }
          ])
        })
        it('should return the correct widget when type is int', () => {
          const instance = new InsuranceInstance(createType([
            {
              id: 47,
              name: 'Int',
              description: 'The int',
              type: 'int'
            }
          ]))
          expect(t(instance.getWidgets())).toEqual([
            {
              id: 47,
              type: 'integer-widget',
              props: {
                value: null,
                label: 'Int',
                placeholder: 'The int'
              }
            }
          ])
        })

        it('should return the correct widget when type is numeric', () => {
          const instance = new InsuranceInstance(createType([
            {
              id: 47,
              name: 'Numeric',
              description: 'The Numeric',
              type: 'numeric'
            }
          ]))
          expect(t(instance.getWidgets())).toEqual([
            {
              id: 47,
              type: 'numeric-widget',
              props: {
                value: null,
                label: 'Numeric',
                placeholder: 'The Numeric'
              }
            }
          ])
        })

        it('should return the correct widget when type is enum', () => {
          const instance = new InsuranceInstance(createType([
            {
              id: 47,
              name: 'Enum',
              description: 'The Enum',
              type: 'enum',
              allowed_values: ['Never stolen', 'Stolen once', 'Stolen multiple times']
            }
          ]))
          expect(t(instance.getWidgets())).toEqual([
            {
              id: 47,
              type: 'select-widget',
              props: {
                label: 'Enum',
                placeholder: 'The Enum',
                value: null,
                options: ['Never stolen', 'Stolen once', 'Stolen multiple times']
              }
            }
          ])
        })
      })

      describe('view widgets', () => {
        it('should return the correct widget when type is text', () => {
          const instance = new InsuranceInstance(createType([
            {
              id: 47,
              name: 'Customer name',
              description: 'The customer name',
              type: 'text'
            }
          ]))
          expect(instance.getWidgets('view')).toEqual([
            {
              id: 47,
              type: 'base-view-widget',
              props: {
                value: null,
                label: 'Customer name'
              }
            }
          ])
        })

        it('should return the correct widget when type is date', () => {
          const instance = new InsuranceInstance(createType([
            {
              id: 47,
              name: 'Date',
              description: 'The Date',
              type: 'date'
            }
          ]))
          expect(instance.getWidgets('view')).toEqual([
            {
              id: 47,
              type: 'date-view-widget',
              props: {
                value: null,
                label: 'Date'
              }
            }
          ])
        })
        it('should return the correct widget when type is int', () => {
          const instance = new InsuranceInstance(createType([
            {
              id: 47,
              name: 'Int',
              description: 'The int',
              type: 'int'
            }
          ]))
          expect(instance.getWidgets('view')).toEqual([
            {
              id: 47,
              type: 'base-view-widget',
              props: {
                value: null,
                label: 'Int'
              }
            }
          ])
        })

        it('should return the correct widget when type is numeric', () => {
          const instance = new InsuranceInstance(createType([
            {
              id: 47,
              name: 'Numeric',
              description: 'The Numeric',
              type: 'numeric'
            }
          ]))
          expect(instance.getWidgets('view')).toEqual([
            {
              id: 47,
              type: 'base-view-widget',
              props: {
                value: null,
                label: 'Numeric'
              }
            }
          ])
        })

        it('should return the correct widget when type is enum', () => {
          const instance = new InsuranceInstance(createType([
            {
              id: 47,
              name: 'Enum',
              description: 'The Enum',
              type: 'enum',
              allowed_values: ['Never stolen', 'Stolen once', 'Stolen multiple times']
            }
          ]))
          expect(instance.getWidgets('view')).toEqual([
            {
              id: 47,
              type: 'base-view-widget',
              props: {
                label: 'Enum',
                value: null
              }
            }
          ])
        })
      })
    })
  })
})
