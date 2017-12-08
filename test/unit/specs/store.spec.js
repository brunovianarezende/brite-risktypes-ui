import {buildStore} from '@/store'
import {FullType} from '@/model'
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
  })
})
