<template>
  <div class="left-chart-1">
    <div class="lc1-details">人员总数<span>{{ number }}</span></div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: 'LeftChart2',
  props: ['sexData'],
  watch: {
    sexData: {
      deep: true,
      handler: function (res) {
        this.dataArr = []
        this.xAxisArr = []
        this.number = 0
        for (var i = 0; i < res.length; i++) {
          if (res[i].gender === '1') {
            this.xAxisArr.push('男')
          } else if (res[i].gender === '2') {
            this.xAxisArr.push('女')
          } else {
            this.xAxisArr.push('未知')
          }
          this.dataArr.push(Number(res[i].count))
          this.number += Number(res[i].count)
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
              style: {
                fontSize: 14,
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
                fontSize: 14,
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
              name: '年龄',
              data: this.dataArr,
              type: 'bar',
              barWidth: 30,
              barStyle: {
                fill: 'rgba(0, 186, 255, 0.4)'
              },
              gradient: {
                color: ['#37a2da', '#67e0e3']
              },
              label: {
                show: true,
                position: 'center',
                offset: [0, 0],
                style: {
                  fontSize: 20,
                  fill: '#fff'
                }
              }
            }
          ]
        }
      }
    }
  },
  data () {
    return {
      data: [],
      number: 0,
      xAxisArr: [],
      dataArr: [],
      option: {}
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

    span {
      color: #096dd9;
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }
  }

  .lc1-chart {
    flex: 1;
  }
}
</style>
