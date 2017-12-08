<template>
  <el-form-item :label="label">
    <el-date-picker
      :disabled="true"
      class="date-widget"
      :value="value"
      type="date"
      format="dd/MM/yyyy"
      value-format="yyyy-MM-dd"
    ></el-date-picker>
  </el-form-item>
</template>

<script>
export default {
  name: 'DateViewWidget',
  props: ['value', 'label']
}
</script>

<style lang="scss" scoped>
.date-widget {
  width: 350px;
}
</style>
