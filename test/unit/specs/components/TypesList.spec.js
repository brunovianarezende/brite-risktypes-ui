import Vue from 'vue'
import TypesList from '@/components/TypesList'
import {buildStore} from '@/store'
import {registerGlobalComponents} from '@/utils'

registerGlobalComponents()

describe('TypesList.vue', () => {
  describe('methods', () => {
    describe('label', () => {
      const type1 = {id: 1, name: 'name 1', description: 'description 1'}
      const type2 = {id: 2, name: 'name 2', description: 'description 2'}

      const mockStore = buildStore([
        type1, type2
      ])

      it("it should return a string with name if select isn't expanded and the method is called for the selected item", () => {
        const Constructor = Vue.extend(TypesList)
        const vm = new Constructor({store: mockStore}).$mount()
        vm.value = type1
        vm.visibleChange(false)
        expect(vm.label(type1)).toEqual('name 1')
      })

      it("it should return a string with name and description if select isn't expanded and the method is called for a not selected item", () => {
        const Constructor = Vue.extend(TypesList)
        const vm = new Constructor({store: mockStore}).$mount()
        vm.value = type1
        vm.visibleChange(false)
        expect(vm.label(type2)).toEqual('name 2 - description 2')
      })

      it('it should return a string with name and description if select is expanded', () => {
        const Constructor = Vue.extend(TypesList)
        const vm = new Constructor({store: mockStore}).$mount()
        vm.value = type1
        vm.visibleChange(true)
        expect(vm.label(type1)).toEqual('name 1 - description 1')
        expect(vm.label(type2)).toEqual('name 2 - description 2')
      })
    })

    describe('isAddButtonDisabled', () => {
      const type1 = {id: 1, name: 'name 1', description: 'description 1'}
      const type2 = {id: 2, name: 'name 2', description: 'description 2'}

      const mockStore = buildStore([
        type1, type2
      ])

      it('should return true if there is no item selected', () => {
        const Constructor = Vue.extend(TypesList)
        const vm = new Constructor({store: mockStore}).$mount()
        expect(vm.isAddButtonDisabled()).toEqual(true)
      })

      it('should return false if there is an item selected', () => {
        const Constructor = Vue.extend(TypesList)
        const vm = new Constructor({store: mockStore}).$mount()
        vm.value = type1
        expect(vm.isAddButtonDisabled()).toEqual(false)
      })
    })
  })
})