<template>
<modal
  name="add-insurance-modal"
  height="auto"
  width="80%"
  scrollable
  >
  <div class="add-modal">
    <h1>Add Insurance</h1>
    <div class="buttons-container">
      <el-button class="save-add" v-on:click="onSaveButtonClick" type="primary">Save</el-button>
      <el-button class="cancel-add" v-on:click="onCancelButtonClick">Cancel</el-button>
    </div>
  </div>
</modal>
</template>

<script>
export default {
  name: 'AddInsuranceModal',
  props: ['onAddSuccess'],
  data () {
    return {
      contact: {}
    }
  },
  methods: {
    onSaveButtonClick () {
    },
    onCancelButtonClick () {
    }
  },
  components: {
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
