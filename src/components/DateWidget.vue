<template>
  <el-form-item :label="label">
    <el-date-picker
      class="date-widget"
      ref='_datepicker'
      :placeholder="placeholder"
      :value="value"
      type="date"
      format="dd/MM/yyyy"
      value-format="yyyy-MM-dd"
      @input="value => { $emit('input', value) }"
    ></el-date-picker>
  </el-form-item>
</template>

<script>
export default {
  name: 'DateWidget',
  props: ['value', 'label', 'placeholder']
}
</script>

<style lang="scss" scoped>
.date-widget {
  width: 350px;
}
</style>
