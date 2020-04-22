<template>
  <div class="top-right-cmp">
    <div class="chart-name">
      设备报警
      <dv-decoration-3 style="width:200px;height:20px;" />
    </div>
    <div class="device">
      <dv-scroll-board :config="config" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopRightCmp',
  data () {
    return {
      data: [],
      config: {
        header: ['报警时间', '报警设备', '故障'],
        data: [
          ['2020-04-10 16:04:32', '二级指挥平台手报', '消防手报按钮'],
          ['2020-04-10 15:41:18', '二级指挥平台手报', '消防手报按钮'],
          ['2020-04-10 15:17:46', '二级指挥平台手报', '消防手报按钮'],
          ['2020-04-10 14:59:12', '二级指挥平台手报', '消防手报按钮'],
          ['2020-04-10 14:04:19', '二级指挥平台手报', '消防手报按钮'],
          ['2020-04-10 13:48:05', '二级指挥平台手报', '消防手报按钮'],
          ['2020-04-10 13:15:37', '西安怡诚医药包装有限公司总配', '漏电报警'],
          ['2020-04-10 12:04:32', '二级指挥平台手报', '消防手报按钮']
        ],
        columnWidth: [170, 300],
        align: ['center'],
        rowNum: 5,
        headerBGC: '#1981f6',
        headerHeight: 45,
        oddRowBGC: 'rgba(0, 44, 81, 0.8)',
        evenRowBGC: 'rgba(10, 29, 50, 0.8)'
      }
    }
  }
  // created () {
  //   this.getData()
  // },
  // watch: {
  //   'data': {
  //     handler: function (val) {
  //       this.config = {
  //         header: ['报警时间', '报警设备', '故障'],
  //         data: val,
  //         columnWidth: [170, 200],
  //         align: ['center'],
  //         rowNum: 5,
  //         headerBGC: '#1981f6',
  //         headerHeight: 45,
  //         oddRowBGC: 'rgba(0, 44, 81, 0.8)',
  //         evenRowBGC: 'rgba(10, 29, 50, 0.8)'
  //       }
  //     }
  //   }
  // },
  // methods: {
  //   getData () {
  //     var random = parseInt(Math.random() * (10 - 1 + 1) + 1, 10)
  //     setInterval(() => {
  //       var list = []
  //       let dates = new Date()
  //       let yy = dates.getFullYear()
  //       let mm = (dates.getMonth() + 1).toString().padStart(2, '0')
  //       let dd = (dates.getDate()).toString().padStart(2, '0')
  //       let hh = (dates.getHours()).toString().padStart(2, '0')
  //       let min = (dates.getMinutes()).toString().padStart(2, '0')
  //       let ss = (dates.getSeconds()).toString().padStart(2, '0')
  //       let myDate = `${yy}-${mm}-${dd} ${hh}:${min}:${ss}`
  //       list.push(myDate)
  //       this.data.push(list)
  //     }, random * 1000)
  //   }
  // }
}
</script>

<style lang="less">
.top-right-cmp {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;

  .chart-name {
    position: absolute;
    right: 10px;
    text-align: right;
    font-size: 20px;
    top: 0;
  }

  .device{
    width: 100%;
    height: calc(~"100% - 70px");
    margin-top: 55px;
    ul{
      width: 100%;
      height: 100%;
      padding: 0 40px 30px 0;
      margin: 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      li{
        width: 100%;
        height: 10%;
        list-style: none;
        display: flex;
        justify-content: space-between;
        .address{
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex: 1;
        }
        .config{
          width: 60%;
          padding: 0 20px;
        }
        .status{
          width: 10%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
        }
        .green {
          background: green;
        }
        .red {
          background: red;
        }
        .dv-percent-pond{
          width: 100%;
          height: 100%;

          text{
            display: none;
          }
        }
      }
    }
  }

  .lc1-chart{
    width: 100%;
    height: 100%;
    padding: 50px;
  }
}
</style>
