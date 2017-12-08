<template>
  <el-form-item :label="label">
    <el-input
      v-model="value"
      :disabled="true">
    </el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'BaseViewWidget',
  props: ['value', 'label']
}
</script>
