import Vue from 'vue'
import TypesList from '@/components/TypesList'
import {buildStore} from '@/store'
import {FullType} from '@/model'
import {registerGlobalComponents} from '@/utils'
import {simulateClick} from './utils'

registerGlobalComponents()

const _t = (rawType) => {
  return new FullType({...rawType, attributes: []})
}

describe('TypesList.vue', () => {
  describe('methods', () => {
    describe('label', () => {
      const type1 = _t({id: 1, name: 'name 1', description: 'description 1'})
      const type2 = _t({id: 2, name: 'name 2', description: 'description 2'})

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
      const type1 = _t({id: 1, name: 'name 1', description: 'description 1'})
      const type2 = _t({id: 2, name: 'name 2', description: 'description 2'})

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

  describe('interface', () => {
    const type1 = _t({id: 1, name: 'name 1', description: 'description 1'})
    const type2 = _t({id: 2, name: 'name 2', description: 'description 2'})

    const mockStore = buildStore([
      type1, type2
    ])

    it('should open add insurance modal when one clicks on "add" button', () => {
      const Constructor = Vue.extend(TypesList)
      const vm = new Constructor({store: mockStore}).$mount()
      vm.value = type1
      return Vue.nextTick()
        .then(() => {
          const addInsuranceButton = vm.$el.querySelector('.add-insurance-button')
          simulateClick(vm, addInsuranceButton)
          return Vue.nextTick()
        })
        .then(() => {
          // NOTE: this selector won't return the full modal code, probably due to
          // transition issues.
          const selector = 'div[data-modal="add-insurance-modal"]'
          const modal = vm.$el.querySelector(selector)
          expect(modal).toEqual(expect.anything())
        })
    })
  })
})
