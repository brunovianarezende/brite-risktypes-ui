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
import {FullType, InsuranceInstance}  from '../model'

    const fullTypeRaw = JSON.parse(`
{
  "name": "Stolen car",
  "description": "Insurance for when a car is stolen",
  "attributes": [
    {
      "id": 1,
      "description": "When the insurance begins to take effect",
      "name": "Start date",
      "type": "date"
    },
    {
      "id": 2,
      "description": "When the insurance finishes",
      "name": "End date",
      "type": "date"
    },
    {
      "id": 3,
      "description": "How much to pay in the case of the car is stolen",
      "name": "Value",
      "type": "numeric"
    },
    {
      "id": 4,
      "description": "The maximal number of days the client has to communicate the theft",
      "name": "Communication days",
      "type": "int"
    },
    {
      "id": 5,
      "description": "Has the client being stolen before?",
      "name": "Customer history",
      "allowed_values": [
        "Never stolen",
        "Stolen once",
        "Stolen multiple times"
      ],
      "type": "enum"
    }
  ]
}
`)
  const fullType = new FullType(fullTypeRaw)
  const insuranceInstance = new InsuranceInstance(fullType)

export default {
  name: 'AddInsuranceModal',
  props: ['onAddSuccess'],
  data () {
    return {
      instance: insuranceInstance.instanceValues
    }
  },
  methods: {
    onSaveButtonClick () {
    },
    onCancelButtonClick () {
    },
    widgets () {
      return insuranceInstance.getWidgets()
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
