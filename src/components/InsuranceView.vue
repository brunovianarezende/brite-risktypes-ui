<template>
<modal
  name="view-insurance-modal"
  height="auto"
  width="80%"
  scrollable
  @before-open="beforeOpen"
  >
  <div class="view-modal">
    <h1>Insurance - {{typeName}}</h1>
    <el-form>
      <component
        :key="widget.id"
        v-for="widget in widgets"
        v-bind="widget.props"
        :is="widget.type"></component>
    </el-form>

    <div class="buttons-container">
      <el-button class="close-view" v-on:click="onCloseButtonClick">Close</el-button>
    </div>
  </div>
</modal>
</template>

<script>
import {BaseViewWidget, DateViewWidget} from './Widgets'

export default {
  name: 'ViewInsuranceModal',
  data () {
    return {
      insuranceInstance: null,
      widgets: []
    }
  },
  methods: {
    onCloseButtonClick () {
      this.$modal.hide('view-insurance-modal')
    },
    beforeOpen (event) {
      this.insuranceInstance = event.params.insurance
      this.widgets = this.insuranceInstance.getWidgets('view')
    }
  },
  computed: {
    typeName () {
      if (this.insuranceInstance !== null) {
        return this.insuranceInstance.fullType.name
      } else {
        return ''
      }
    }
  },
  components: {
    BaseViewWidget, DateViewWidget
  }
}
</script>

<style lang="scss" scoped>
.view-modal {
  margin: 10px;
}
.buttons-container {
  margin-top: 20px;
}
</style>
