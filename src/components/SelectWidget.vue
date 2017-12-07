<template>
  <el-form-item :label="label">
    <el-select :value="value" @input="value => { $emit('input', value) }">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  name: 'SelectWidget',
  props: ['value', 'label', 'options']
}
</script>
