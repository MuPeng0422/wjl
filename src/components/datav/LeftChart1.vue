<template>
  <div id="rose-chart">
    <div class="rose-chart-title">小区人口年龄分布占比</div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: 'LeftChart1',
  data () {
    return {
      data: [],
      option: {}
    }
  },
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
        }
        this.option = {
          series: [
            {
              type: 'pie',
              radius: '70%',
              roseSort: false,
              data: this.data,
              outsideLabel: {
                formatter: '{name} {percent}%',
                labelLineEndLength: 50,
                style: {
                  fill: '#fff',
                  fontSize: 16
                },
                labelLineStyle: {
                  stroke: '#fff'
                }
              },
              roseType: true
            }
          ],
          color: ['#da2f00', '#fa3600', '#ff4411', '#ff724c', '#541200', '#801b00', '#a02200', '#5d1400', '#b72700']
        }
      }
    }
  },
  methods: {
    createData () {
      this.option = {
      }
    }
  }
}
</script>

<style lang="less">
#rose-chart {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .rose-chart-title {
    height: 50px;
    font-weight: bold;
    text-indent: 20px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  .dv-charts-container {
    height: calc(~"100% - 50px");
  }
}
</style>
