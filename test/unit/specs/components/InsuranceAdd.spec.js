import Vue from 'vue'
import InsuranceAdd from '@/components/InsuranceAdd'
import { FullType } from '@/model'
import {registerGlobalComponents} from '@/utils'

registerGlobalComponents()

describe('InsuranceAdd.vue', () => {
  describe('methods', () => {
    describe('beforeOpen', () => {
      it('should create a proper instance given a type', () => {
        const Constructor = Vue.extend(InsuranceAdd)
        const vm = new Constructor().$mount()
        const type = new FullType({
          'id': 1,
          'name': 'name',
          'description': 'description',
          'attributes': [
            {
              id: 11,
              name: 'Attribute',
              type: 'date'
            }
          ]
        })
        vm.beforeOpen({params: {type}})
        expect(vm.instance).toEqual({
          '11': null
        })
        const t = (widget) => {
          expect(widget['events']).toBeTruthy()
          delete widget['events']
          return widget
        }
        expect(vm.widgets.map(t)).toEqual([{
          id: 11,
          type: 'date-widget',
          props: {
            value: null,
            label: 'Attribute',
            placeholder: undefined
          }
        }])
      })
    })
  })
})
