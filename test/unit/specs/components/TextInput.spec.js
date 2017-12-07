import Vue from 'vue'
import TextInput from '@/components/TextInput'
import {registerGlobalComponents} from '@/utils'

registerGlobalComponents()

describe('TextInput.vue', () => {
  describe('interface', () => {
    it('should render correctly', () => {
      const Comp = {
        render (createElement) {
          return createElement(
            'el-form', {}, [
              createElement(TextInput,
                {props: {label: this.label, placeholder: this.placeholder}})
            ]
          )
        },
        props: ['label', 'placeholder'],
        components: {TextInput},
        propsData: {
          label: 'The label',
          placeholder: 'The placeholder'
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
          const textInput = createElement(
            TextInput,
            {
              props: {
                label: this.label,
                placeholder: this.placeholder,
                value: this.value
              },
              on: {
                input: (v) => { this.value = v }
              }
            })

          return createElement(
            'el-form', {}, [div, textInput]
          )
        },
        props: ['label', 'placeholder'],
        data: {
          value: 'Hi'
        },
        components: {TextInput},
        propsData: {
          label: 'The label',
          placeholder: 'The placeholder'
        }
      }

      const vm = new Vue(Comp).$mount()
      return Vue.nextTick()
        .then(() => {
          const input = vm.$el.querySelector('input')
          expect(input.value).toEqual('Hi')
          input.value = 'hello'
          input.dispatchEvent(new Event('input'))
          return Vue.nextTick()
        })
        .then(() => {
          expect(vm.$el).toMatchSnapshot()
        })
    })
  })
})
