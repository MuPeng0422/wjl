<template>
  <div id="data-view">
    <dv-full-screen-container>
      <div class="main-header">
        <top-header />
      </div>

      <div class="main-container">
        <dv-border-box-1>
          <div class="left-container">
            <dv-border-box-11
              title="人员统计"
              class="left-chart-container"
            >
              <div class="charts-container">
                <div class="chart">
                  <dv-border-box-8>
                    <left-chart3></left-chart3>
                  </dv-border-box-8>
                </div>
                <div class="chart">
                  <dv-border-box-8>
                    <left-chart2></left-chart2>
                  </dv-border-box-8>
                </div>
                <div class="chart">
                  <dv-border-box-8>
                    <left-chart1></left-chart1>
                  </dv-border-box-8>
                </div>
              </div>
            </dv-border-box-11>
          </div>
          <div class="right-container">
            <div class="rmc-top-container">
              <div class="rmctc-left-container">
                <dv-border-box-13>
                  <center-cmp></center-cmp>
                </dv-border-box-13>
              </div>
              <div class="rmctc-right-container">
                <div class="rmctc-chart-1">
                  <dv-border-box-4>
                    <top-middle-cmp></top-middle-cmp>
                  </dv-border-box-4>
                </div>
                <div class="rmctc-chart-2">
                  <dv-border-box-4 :reverse="true">
                    <top-right-cmp></top-right-cmp>
                  </dv-border-box-4>
                </div>
              </div>
            </div>
            <div class="rmc-bottom-container">
              <dv-border-box-10>
                <div class="personal">
                  <dv-loading v-if="loading">Loading...</dv-loading>
                  <div class="personal-item" v-for="(item, index) in dataList"
                       :key="item.id" v-show="activeIndex>index">
                    <dv-border-box-8>
                      <div class="item">
                        <img :src="faceImgUrl + item.faceUrl" alt="">
                      </div>
                      <div class="details">
                        <p>{{ item.deviceId }}</p>
                        <p>{{ item.id }}</p>
                        <p>{{ item.time }}</p>
                      </div>
                    </dv-border-box-8>
                  </div>
                </div>
              </dv-border-box-10>
            </div>
          </div>
        </dv-border-box-1>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import topHeader from './topHeader'
import LeftChart1 from './LeftChart1'
import LeftChart2 from './LeftChart2'
import LeftChart3 from './LeftChart3'
import CenterCmp from './CenterCmp'
import LabelTag from './LabelTag'
import TopMiddleCmp from './TopMiddleCmp'
import TopRightCmp from './TopRightCmp'

export default {
  name: 'DataView',
  components: {
    topHeader,
    LeftChart1,
    LeftChart2,
    LeftChart3,
    CenterCmp,
    LabelTag,
    TopMiddleCmp,
    TopRightCmp
  },
  data () {
    return {
      loading: false,
      dataList: [],
      faceImgUrl: 'data:img/jpg;base64,',
      activeIndex: 6,
      ws: null, // 建立的连接
      lockReconnect: false, // 是否真正建立连接
      timeout: 28 * 1000, // 30秒一次心跳
      timeoutObj: null, // 心跳心跳倒计时
      serverTimeoutObj: null, // 心跳倒计时
      timeoutnum: null // 断开 重连倒计时
    }
  },
  created () {
    this.initWebSocket()
  },
  methods: {
    initWebSocket () { // 初始化weosocket
      const wsuri = 'ws:apple.atx.net.cn/imserver/333'
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen () { // 连接建立之后执行send方法发送数据
      this.loading = true
      this.$axios.get('http://apple.atx.net.cn/push/face/index').then((res) => {
        this.loading = false
        var data = res.data.data.rows
        this.dataList = data
      })
    },
    websocketonerror () { // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage (e) { // 数据接收
      console.log('接收的数据：')
      if (e.data !== '连接成功') {
        this.dataList.unshift(JSON.parse(e.data).data)
      }
    },
    websocketsend (Data) { // 数据发送
      this.websock.send(Data)
    },
    websocketclose (e) { // 关闭
      console.log('断开连接', e)
      console.log('又重新连接了')
      this.initWebSocket()
    }
  }
}
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url("./img/bg.png");
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-header {
    height: 100px;
  }

  .main-container {
    height: calc(~"100% - 100px");

    .border-box-content {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
    }
  }

  .left-container {
    width: 25%;

    .left-chart-container {
      width: 100%;

      .charts-container{
        width: 100%;
        height: 100%;
        padding-top: 50px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .chart{
          height: 33%;
        }
      }
    }
  }

  .right-container {
    width: 75%;

    .rmc-top-container {
      height: 75%;
      display: flex;

      .rmctc-left-container {
        width: 65%;
        height: 100%;
      }

      .rmctc-right-container {
        width: 35%;
        height: 100%;

        .rmctc-chart-1 {
          height: 50%;
        }

        .rmctc-chart-2 {
          height: 50%;
        }
      }
    }

    .rmc-bottom-container {
      height: 25%;

      .personal {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;

        .personal-item{

          .border-box-content{
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
          }
          .item{
            width: 100%;

            img{
              width: 100%;
            }
          }

          .details{
            p{
              color: #00c2ff;
              margin: 10px 0 0 0;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
