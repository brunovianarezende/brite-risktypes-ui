import Vue from 'vue'
import SelectWidget from '@/components/SelectWidget'
import {registerGlobalComponents} from '@/utils'
import { triggerEvent } from './utils'

registerGlobalComponents()

describe('Select.vue', () => {
  describe('interface', () => {
    it('should render correctly', () => {
      const Comp = {
        render (createElement) {
          return createElement(
            'el-form', {}, [
              createElement(SelectWidget,
                {props: {label: this.label, options: this.options, value: ''}})
            ]
          )
        },
        props: ['label', 'options'],
        components: {SelectWidget},
        propsData: {
          label: 'The label',
          options: ['a', 'B', 'c']
        }
      }

      const vm = new Vue(Comp).$mount()
      return Vue.nextTick()
        .then(() => {
          expect(vm.$el).toMatchSnapshot()
        })
    })

    it('should support v-model', () => {
      const Comp = {
        render (createElement) {
          const div = createElement('div', this.value)
          const selectWidget = createElement(SelectWidget,
            {
              props: {label: this.label, options: this.options, value: this.value},
              on: { input: (v) => { this.value = v } }
            })

          return createElement(
            'el-form', {}, [div, selectWidget]
          )
        },
        props: ['label', 'options'],
        data: {
          value: 'c'
        },
        components: {SelectWidget},
        propsData: {
          label: 'The label',
          options: ['a', 'B', 'c']
        }
      }

      const vm = new Vue(Comp).$mount()
      return Vue.nextTick()
        .then(() => {
          expect(vm.$el).toMatchSnapshot()
          const options = vm.$el.querySelectorAll('.el-select-dropdown__item')
          triggerEvent(options[1], 'mouseenter')
          options[1].click()
          return Vue.nextTick()
        })
        .then(() => {
          expect(vm.$el).toMatchSnapshot()
        })
    })
  })
})
