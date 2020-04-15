<template>
  <div class="left-chart-1">
    <div class="lc1-header">小区人员统计</div>

    <div class="lc1-details">人员总数<span><dv-digital-flop :config="option" style="width:200px;height:50px;"/></span></div>
    <dv-capsule-chart class="lc1-chart" :config="config" />
  </div>
</template>

<script>
export default {
  name: 'LeftChart2',
  props: ['ageData'],
  watch: {
    ageData: {
      deep: true,
      handler: function (res) {
        for (var i = 0; i < res.length; i++) {
          var rows = {}
          rows['name'] = res[i].ageGroup
          rows['value'] = Number(res[i].totals)
          this.data.push(rows)
          this.number += Number(res[i].totals)
        }
        this.optionNumber.push(this.number)
        this.option = {
          number: this.optionNumber,
          content: '{nt}',
          style: {
            fontSize: 30,
            fill: '#3de7c9'
          }
        }
        this.config = {
          data: this.data,
          colors: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
          unit: '人'
        }
      }
    }
  },
  data () {
    return {
      data: [],
      number: 0,
      optionNumber: [],
      option: {
      },
      config2: null,
      config: {
      }
    }
  }
}
</script>

<style lang="less">
.left-chart-1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;

  .lc1-header {
    height: 50px;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  .lc1-details {
    height: 50px;
    font-size: 16px;
    display: flex;
    align-items: center;
  }

  .lc1-chart {
    flex: 1;
  }
}
</style>
