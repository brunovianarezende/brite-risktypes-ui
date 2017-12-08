import {buildStore} from '@/store'
import {FullType, InsuranceInstance} from '@/model'
import {setApi} from '@/api'

describe('store.js', () => {
  describe('mutations', () => {
    describe('setTypes', () => {
      it('should change the list of types', () => {
        const obj1 = new FullType({id: 1, name: 'insurance1'})
        const obj2 = new FullType({id: 2, name: 'insurance2'})
        const obj3 = new FullType({id: 3, name: 'insurance3'})
        const store = buildStore([
          obj1, obj2
        ])

        store.commit('setTypes', [obj3])
        expect(store.state.types).toEqual([obj3])
      })
    })

    describe('addInsurance', () => {
      it('should add a new insurance to the list of insurances', () => {
        const type1 = new FullType({id: 1, name: 'insurance1', attributes: []})
        const instance = new InsuranceInstance(type1)
        const store = buildStore([type1], [])

        store.commit('addInsurance', instance)
        expect(store.state.insurances).toEqual([instance])
      })
    })
  })

  describe('actions', () => {
    describe('hydrate', () => {
      it('should call the API and get all types from the server', () => {
        const obj1 = new FullType({id: 1, name: 'Insurance1', description: 'Description1'})
        const obj2 = new FullType({id: 2, name: 'Insurance2', description: 'Description2'})

        const api = new function () {
          this.searchTypes = jest.fn(() => Promise.resolve([obj1, obj2]))
        }()
        setApi(api)

        const store = buildStore([])

        return store.dispatch('hydrate')
          .then(() => {
            expect(store.state.types).toEqual([obj1, obj2])
            expect(api.searchTypes.mock.calls).toEqual([[]])
          })
      })
    })

    describe('postInsurance', () => {
      it('should call the API to post the insurance to the server', () => {
        const type1 = new FullType({id: 1, name: 'Insurance1', description: 'Description1', attributes: []})

        const api = new function () {
          this.addInsurance = jest.fn((insurance) => Promise.resolve(1))
        }()
        setApi(api)

        const store = buildStore([type1])

        const instance = new InsuranceInstance(type1)
        return store.dispatch('addInsurance', instance)
          .then(() => {
            const expected = new InsuranceInstance(type1, 1)
            expect(store.state.insurances).toEqual([expected])
            expect(api.addInsurance.mock.calls).toEqual([[instance]])
          })
      })
    })
  })
})
