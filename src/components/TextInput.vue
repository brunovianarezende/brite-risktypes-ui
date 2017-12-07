<template>
  <el-form-item :label="label">
    <el-input
      :placeholder="placeholder"
      :value="value"
      @input="value => { $emit('input', value) }"
    ></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'TextInput',
  props: ['value', 'label', 'placeholder']
}
</script>
