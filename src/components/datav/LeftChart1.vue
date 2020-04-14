<template>
  <div id="rose-chart">
    <div class="rose-chart-title">累计计量资金分布</div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
export default {
  name: 'LeftChart1',
  data () {
    return {
      option: {}
    }
  },
  methods: {
    createData () {
      const { randomExtend } = this

      this.option = {
        series: [
          {
            type: 'pie',
            radius: '70%',
            roseSort: false,
            data: [
              { name: '路基', value: randomExtend(40, 70) },
              { name: '交安设施', value: randomExtend(20, 30) },
              { name: '日常养护', value: randomExtend(10, 50) },
              { name: '桥通', value: randomExtend(5, 20) },
              { name: '交通事故', value: randomExtend(40, 50) },
              { name: '路面', value: randomExtend(20, 30) },
              { name: '绿化', value: randomExtend(5, 10) },
              { name: '计日工', value: randomExtend(20, 35) },
              { name: '除雪', value: randomExtend(5, 10) }
            ],
            insideLabel: {
              show: false
            },
            outsideLabel: {
              formatter: '{name} {percent}%',
              labelLineEndLength: 20,
              style: {
                fill: '#fff',
                fontSize: '20px'
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
    },
    randomExtend (minNum, maxNum) {
      if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10)
      } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      }
    }
  },
  mounted () {
    const { createData } = this

    createData()

    setInterval(createData, 30000)
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
