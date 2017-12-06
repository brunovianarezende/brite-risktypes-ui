<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div>
          <el-form label-position="top">
            <el-form-item label="Add new Insurance">
              <el-select
                @visible-change="visibleChange"
                v-model="value"
                placeholder="Insurance Type">
                <el-option
                  v-for="item in types"
                  :key="item.id"
                  :label="`${label(item)}`"
                  :value="item"
                  >
                </el-option>
              </el-select>
            </el-form-item>
            <el-button :disabled="isAddButtonDisabled()">Add</el-button>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TypesList',
  data () {
    return {
      value: null,
      selectListVisible: false
    }
  },
  computed: mapState([
    'types'
  ]),
  methods: {
    label (item) {
      if (item === this.value && !this.selectListVisible) {
        return item.name
      } else {
        return `${item.name} - ${item.description}`
      }
    },
    visibleChange (isVisible) {
      this.selectListVisible = isVisible
    },
    isAddButtonDisabled () {
      return this.value == null
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
@import url("//unpkg.com/element-ui@2.0.4/lib/theme-chalk/index.css");
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.grid-content {
  min-height: 36px;
}
</style>
