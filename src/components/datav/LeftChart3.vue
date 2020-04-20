<template>
  <div id="scroll-board">
    <dv-scroll-board :config="config" />
  </div>
</template>

<script>
export default {
  name: 'LeftChart3',
  props: ['data'],
  watch: {
    data: {
      deep: true,
      handler: function (res) {
        this.config = {
          header: ['人员姓名', '性别', '年龄', '家庭地址', '人员类型'],
          data: this.data,
          columnWidth: [60, 100, 60, 50],
          rowNum: 5,
          align: [1],
          index: true,
          indexHeader: '序号',
          headerBGC: '#1981f6',
          oddRowBGC: 'rgba(0, 44, 81, 0.8)',
          evenRowBGC: 'rgba(10, 29, 50, 0.8)'
        }
      }
    }
  },
  data () {
    return {
      config: {}
    }
  }
}
</script>

<style lang="less">
#scroll-board {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
}
</style>
