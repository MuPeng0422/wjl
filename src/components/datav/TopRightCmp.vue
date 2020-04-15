<template>
  <div class="top-right-cmp">
    <div class="chart-name">
      设备状态
      <dv-decoration-3 style="width:200px;height:20px;" />
    </div>
    <div class="device">
      <ul>
        <li
          v-for="(item, index) in data"
          :key="index"
        >
          <div class="address">{{ item.address }}</div>
          <div class="config"><dv-percent-pond :config="item.config" /></div>
          <div class="status" :class="bgColor">{{ item.status }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopRightCmp',
  props: ['devide'],
  watch: {
    devide: {
      deep: true,
      handler: function (res) {
        console.log(res)
        for (var i = 0; i < res.length; i++) {
          var rows = {}
          rows['address'] = res[i].address
          rows['deviceId'] = res[i].deviceId
          rows['deviceType'] = res[i].deviceType
          if (res[i].status === 1) {
            rows['status'] = '在线'
            this.bgColor = 'green'
            rows['config'] = {
              value: 100,
              colors: ['green', 'darkgreen']
            }
          } else if (res[i].status === 0) {
            rows['status'] = '掉线'
            this.bgColor = 'red'
            rows['config'] = {
              value: 100,
              lineDash: [5, 1],
              colors: ['red', 'brown']
            }
          }

          this.data.push(rows)
          if (i >= 4) {
            return false
          }
        }
      }
    }
  },
  data () {
    return {
      data: [],
      bgColor: ''
    }
  }
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
    margin-top: 70px;
    ul{
      width: 100%;
      height: 100%;
      padding: 0 0 30px;
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
