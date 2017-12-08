<template>
<modal
  name="add-insurance-modal"
  height="auto"
  width="80%"
  scrollable
  @before-open="beforeOpen"
  >
  <div class="add-modal">
    <h1>Add Insurance</h1>
    {{ instance }}
    <el-form>
      <component
        :key="widget.id"
        v-for="widget in widgets"
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
import {InsuranceInstance} from '../model'

export default {
  name: 'AddInsuranceModal',
  props: ['onAddSuccess'],
  data () {
    return {
      instance: {},
      widgets: []
    }
  },
  methods: {
    onSaveButtonClick () {
      this.$modal.hide('add-insurance-modal')
    },
    onCancelButtonClick () {
      this.$modal.hide('add-insurance-modal')
    },
    beforeOpen (event) {
      this.instance = {}
      const type = event.params.type
      const insuranceInstance = new InsuranceInstance(type)
      this.instance = insuranceInstance.bindReactivity(this.instance)
      this.widgets = insuranceInstance.getWidgets()
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
