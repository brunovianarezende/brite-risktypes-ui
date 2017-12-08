<template>
  <div>
    <add-insurance-modal />
    <view-insurance-modal />
    <el-row>
      <el-col :span="24">
        <div>
          <el-form label-position="top">
            <el-form-item label="Add new Insurance">
              <el-select
                @visible-change="visibleChange"
                v-model="value"
                value-key="id"
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
            <el-button
              class="add-insurance-button"
              :disabled="isAddButtonDisabled()"
              @click="addButtonClicked"
              >Add</el-button>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>
          <el-table
            :data="insurances"
            stripe
            border
            empty-text="There are no insurances"
            style="width: 100%">
            <el-table-column
              align="left"
              prop="fullType.name"
              label="Type">
            </el-table-column>
            <el-table-column
              align="left"
              prop="id"
              label="Id" />
            <el-table-column
              fixed="right"
              label="Actions"
              width="120"
              >
              <template slot-scope="scope">
                <a class="view-insurance-icon" v-on:click="viewInsurance(scope.row)"><icon name="eye" scale="2" color="blue" /></a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddInsuranceModal from './InsuranceAdd'
import ViewInsuranceModal from './InsuranceView'
import 'vue-awesome/icons/eye'
import Icon from 'vue-awesome/components/Icon'

export default {
  name: 'TypesList',
  data () {
    return {
      value: null,
      selectListVisible: false
    }
  },
  computed: mapState([
    'types', 'insurances'
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
    },
    addButtonClicked () {
      this.$modal.show('add-insurance-modal', {type: this.value})
    },
    viewInsurance (insurance) {
      this.$modal.show('view-insurance-modal', {insurance})
    }
  },
  components: {
    AddInsuranceModal, ViewInsuranceModal, Icon
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
