<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div>
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
    }
  },
  computed: mapState([
  ]),
  methods: {
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
