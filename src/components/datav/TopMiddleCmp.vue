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
  data () {
    return {
      option: {
        xAxis: {
          data: [
            '0时', '2时', '4时', '6时', '8时', '10时',
            '12时', '14时', '16时', '18时', '20时', '22时', '24时'
          ],
          boundaryGap: false,
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
          }
        },
        series: [
          {
            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
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
