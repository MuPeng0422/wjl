<template>
  <div class="top-middle-cmp">
    <div class="chart-name">
      进出口人流量统计
      <dv-decoration-3 style="width:200px;height:20px;" />
    </div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: 'TopMiddleCmp',
  props: ['flow'],
  watch: {
    flow: {
      deep: true,
      handler: function (res) {
        this.xAxisArr = ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时']
        this.dataArr = []
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].hours - 1)
          console.log(res[i].counts)
          this.dataArr[res[i].hours - 1] = Number(res[i].counts)
        }
        this.option = {
          xAxis: {
            data: this.xAxisArr,
            axisLine: {
              style: {
                stroke: '#fff'
              }
            },
            axisLabel: {
              interval: 4,
              style: {
                fill: '#fff'
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
            data: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              style: {
                stroke: '#fff'
              }
            },
            axisLabel: {
              style: {
                fill: '#fff'
              }
            },
            axisTick: {
              show: false
            },
            min: 0
          },
          series: [
            {
              data: this.dataArr,
              type: 'line',
              lineArea: {
                show: true,
                gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
              },
              label: {
                show: true,
                formatter: '{value} '
              }
            }
          ]
        }
      }
    }
  },
  data () {
    return {
      xAxisArr: [],
      dataArr: [],
      option: {
      }
    }
  }
}
</script>

<style lang="less">
.top-middle-cmp {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;

  .chart-name {
    position: absolute;
    right: 0;
    text-align: right;
    font-size: 20px;
    top: 10px;
  }
}
</style>
