<template>
  <el-form-item :label="label">
    <el-numeral-input
      :placeholder="placeholder"
      :value="value"
      @input="value => { $emit('input', value) }"
    ></el-numeral-input>
  </el-form-item>
</template>

<script>
import ElNumeralInput from './ElNumeralInput'

export default {
  name: 'NumericWidget',
  props: ['value', 'label', 'placeholder'],
  components: {
    ElNumeralInput
  }
}
</script>
