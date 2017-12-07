<template>
<modal
  name="add-insurance-modal"
  height="auto"
  width="80%"
  scrollable
  >
  <div class="add-modal">
    <h1>Add Insurance</h1>
    {{ instance }}
    <el-form>
      <component
        :key="widget.id"
        v-for="widget in widgets()"
        v-bind="widget.props"
        v-on="widget.events || {}"
        :is="widget.type"></component>

    </el-form>
    <div class="buttons-container">
      <el-button class="save-add" v-on:click="onSaveButtonClick" type="primary">Save</el-button>
      <el-button class="cancel-add" v-on:click="onCancelButtonClick">Cancel</el-button>
    </div>
  </div>
</modal>
</template>

<script>
import {IntegerWidget, NumericWidget, DateWidget, TextWidget, SelectWidget} from './Widgets'

export default {
  name: 'AddInsuranceModal',
  props: ['onAddSuccess'],
  data () {
    return {
      instance: {
        '1': null,
        '2': null,
        '3': null,
        '4': null,
        '5': null
      }
    }
  },
  methods: {
    onSaveButtonClick () {
    },
    onCancelButtonClick () {
    },
    widgets () {
      const self = this
      const inputEvent = (id) => (v) => {
        self.instance[id + ''] = v
      }
      return [
        {
          id: 1,
          type: 'text-widget',
          props: {
            label: 'Name',
            placeholder: 'The customer name'
          },
          events: {
            input: inputEvent(1)
          }
        },
        {
          id: 2,
          type: 'integer-widget',
          props: {
            label: 'Age',
            placeholder: 'The customer age'
          },
          events: {
            input: inputEvent(2)
          }
        },
        {
          id: 3,
          type: 'date-widget',
          props: {
            label: 'Birthdate',
            placeholder: 'The customer Birthdate',
            value: self.instance['3']
          },
          events: {
            input: inputEvent(3)
          }
        },
        {
          id: 4,
          type: 'numeric-widget',
          props: {
            label: 'Amount to pay',
            placeholder: 'How many dollars must we pay?'
          },
          events: {
            input: inputEvent(4)
          }
        },
        {
          id: 5,
          type: 'select-widget',
          props: {
            label: 'Married',
            options: ['Yes', 'No'],
            value: self.instance['5']
          },
          events: {
            input: inputEvent(5)
          }
        }
      ]
    }
  },
  components: {
    IntegerWidget, NumericWidget, DateWidget, TextWidget, SelectWidget
  }
}
</script>

<style lang="scss" scoped>
.add-modal {
  margin: 10px;
}
.buttons-container {
  margin-top: 20px;
}
</style>
