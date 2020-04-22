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
                    <dv-loading v-if="loading">Loading...</dv-loading>
                    <left-chart3 :data="personenelData"></left-chart3>
                  </dv-border-box-8>
                </div>
                <div class="chart">
                  <dv-border-box-8>
                    <left-chart2 :sexData="querySexData"></left-chart2>
                  </dv-border-box-8>
                </div>
                <div class="chart">
                  <dv-border-box-8>
                    <left-chart1 :ageData="queryAgeData"></left-chart1>
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
                    <top-middle-cmp :flow="flowData"></top-middle-cmp>
                  </dv-border-box-4>
                </div>
                <div class="rmctc-chart-2">
                  <dv-border-box-4 :reverse="true">
                    <top-right-cmp :devide="deviceData"></top-right-cmp>
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
                        <img :src="item.faceUrl" alt="">
                      </div>
                      <div class="details">
                        <div>
                          <p>{{ item.name }}</p>
                          <p>{{ item.time }}</p>
                        </div>
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
      apiUrl: 'http://localhost:7788',
      localhost: 'http://localhost:8000',
      loading: false,
      dataList: [],
      activeIndex: 6,
      // 是否真正建立连接
      lockReconnect: false,
      // 30秒一次心跳
      timeout: 30 * 1000,
      // 心跳心跳倒计时
      timeoutObj: null,
      // 心跳倒计时
      serverTimeoutObj: null,
      // 断开 重连倒计时
      timeoutnum: null,
      // 建立的连接
      ws: null,
      num: Math.ceil(Math.random() * 999999),
      heartCheck: {},
      // 0未知 1男 2女
      sex: '',
      age: '', // 年龄
      // 0业主，1家庭成员，2租客
      staffType: '',
      personenelData: [], // 人员信息存储
      queryAgeData: [], // 人员年龄存储
      deviceData: [], // 设备存储
      flowData: [], // 人流量存储
      querySexData: []
    }
  },
  created () {
    // 页面刚进入时开启长连接
    this.initWebSocket()
    this.getWebsocketData()
  },
  destroyed: function () {
    // 页面销毁时关闭长连接
    this.websocketclose()
  },
  methods: {
    initWebSocket () {
      // 初始化weosocket
      const socketUrl = this.apiUrl.replace('https', 'wss').replace('http', 'ws')
      const wsuri = socketUrl + '/imserver/' + this.num
      // 建立连接
      this.websock = new WebSocket(wsuri)
      // 连接成功
      this.websock.onopen = this.websocketonopen
      // 连接失败
      this.websock.onerror = this.websocketonerror
      // 接收消息
      this.websock.onmessage = this.websocketonmessage
      // 连接关闭
      this.websock.onclose = this.websocketclose
    },
    reconnect () {
      // 重新连接
      if (!this.lockReconnect) {
        this.lockReconnect = true
        // 没连接上会一直重连，设置延迟避免请求过多
        this.timeoutnum && clearTimeout(this.timeoutnum)
        this.timeoutnum = setTimeout(() => {
          // 新连接
          this.initWebSocket()
          this.lockReconnect = false
        }, 5000)
      }
    },
    // 重置心跳
    reset () {
      // 清除时间
      clearTimeout(this.timeoutObj)
      clearTimeout(this.serverTimeoutObj)
      // 重启心跳
      this.start()
    },
    // 开启心跳
    start () {
      this.timeoutObj && clearTimeout(this.timeoutObj)
      this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
      this.timeoutObj = setTimeout(() => {
        // 这里发送一个心跳，后端收到后，返回一个心跳信息
        if (this.websock.readyState === 1) {
          // 如果连接正常
          this.heartCheck.data = new Date().getTime()
          let msg = JSON.stringify(this.heartCheck)
          this.websocketsend(msg)
        } else {
          // 否则重连
          this.reconnect()
        }
        this.serverTimeoutObj = setTimeout(() => {
          // 超时关闭
          this.websock.close()
        }, this.timeout)
      }, this.timeout)
    },
    websocketonopen () {
      // 连接建立之后执行send方法发送数据
      // 开启心跳
      this.start()
    },
    websocketonerror (e) {
      // 连接失败事件
      // 错误
      console.log('WebSocket连接发生错误', e)
      // 错误提示
      console.error('Websocket error, Check you internet!', e)
      // 重连
      this.reconnect()
    },
    // 接收服务器推送的信息
    websocketonmessage (e) {
      // 收到服务器信息，心跳重置
      this.reset()

      // 处理服务器推送过来的数据
      let result = JSON.parse(e.data)
      console.log('推送的数据：', result)
      if (result.type === '0') {
        // 心跳检测 暂不处理
      } else if (result.type === '1') {
        // 连接成功 暂不处理
      } else if (result.type === '2') {
        // zhiyinqing推送的人脸识别数据
        this.getFaceData(result)
      } else if (result.type === '3') {
        // zhiyinqing推送的人脸识别数据
        this.getFlowData(result)
      }
    },
    websocketclose (e) {
      console.log(e)
      // 连接关闭事件
      // 关闭
      console.log('connection closed', e.code)
      // 提示关闭
      console.error('连接已关闭')
      // 重连
      this.reconnect()
    },
    getWebsocketData () {
      // 调用人脸抓拍列表
      this.$axios.get(this.apiUrl + '/push/face/index').then((res) => {
        var result = res.data.data.rows
        var data = []
        if (result.length > 0) {
          this.loading = false
          for (var i = 0; i < result.length; i++) {
            var rows = {}
            if (res.data.data.islocal) {
              rows['faceUrl'] = this.localhost + result[i].picUrl
            } else {
              rows['faceUrl'] = result[i].picUrl
            }
            rows['time'] = result[i].createTime
            if (result[i].staffName === null) {
              rows['name'] = '陌生人'
            } else {
              rows['name'] = result[i].staffName
            }
            data.push(rows)
          }
          this.dataList = data
        } else {
          this.loading = true
        }
      })
      // 查询人员列表
      this.$axios.get(this.apiUrl + '/push/face/index/staffPage').then((res) => {
        this.loading = false
        var result = res.data.data.rows
        for (var i = 0; i < result.length; i++) {
          var rows = []
          if (result[i].staffGender === 1) {
            this.sex = '男'
          } else if (result[i].staffGender === 2) {
            this.sex = '女'
          } else {
            this.sex = '未知'
          }

          if (result[i].staffType === 0) {
            this.staffType = '业主'
          } else if (result[i].staffType === 1) {
            this.staffType = '家庭成员'
          } else if (result[i].staffType === 2) {
            this.staffType = '租客'
          }

          this.age = this.getAge(result[i].staffBirthday)
          rows.push(result[i].staffName)
          rows.push(this.sex)
          rows.push(this.age)
          rows.push(result[i].houseAddress)
          rows.push(this.staffType)
          this.personenelData.push(rows)
        }
      })
      // 查询小区人员年龄分布
      this.$axios.get(this.apiUrl + '/push/face/index/queryAge').then((res) => {
        this.queryAgeData = res.data.data
      })
      // 查询设备列表
      // this.$axios.get(this.apiUrl + '/push/face/index/queryDevice').then((res) => {
      //   this.deviceData = res.data.data.data
      // })
      // 查询进出口人流量
      this.$axios.get(this.apiUrl + '/push/face/index/staffListByHour').then((res) => {
        this.flowData = res.data.data
      })
      // 查询人员性别
      this.$axios.get(this.apiUrl + '/push/face/index/staffGender').then((res) => {
        this.querySexData = res.data.data
      })
    },
    // 获取人脸检测实时推送的数据
    getFaceData (result) {
      var rows = {}
      if (result.islocal) {
        rows['faceUrl'] = this.localhost + result.data.picUrl
      } else {
        rows['faceUrl'] = result.data.picUrl
      }
      rows['time'] = this.timestampToTime(result.data.createTime)
      if (result.data.staffName === null) {
        rows['name'] = '陌生人'
      } else {
        rows['name'] = result.data.staffName
      }
      this.dataList.unshift(rows)
    },
    // 获取人流量实时推送的数据
    getFlowData (result) {
      if (Number(result.data.hours) === 0) {
        this.flowData.splice(0, this.flowData.length)
      } else {
        this.flowData.push(result.data)
      }
    },
    getAge (strAge) {
      let birthdays = new Date(strAge.replace(/-/g, '/'))
      let d = new Date()
      this.age =
        d.getFullYear() -
        birthdays.getFullYear() -
        (d.getMonth() < birthdays.getMonth() ||
        (d.getMonth() === birthdays.getMonth() &&
        d.getDate() < birthdays.getDate())
          ? 1
          : 0)
      return this.age
    },
    timestampToTime (time) {
      var date = new Date(time) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ' '
      var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() + ':'
      var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() + ':'
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + M + D + h + m + s
    },
    websocketsend (msg) {
      // 向服务器发送信息
      // 数据发送
      this.websock.send(msg)
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
          width: 16%;

          .border-box-content{
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
          }
          .item{
            width: 100%;
            height: 60%;
            overflow: hidden;

            img{
              width: 100%;
              height: 100%;
            }
          }

          .details{
            height: 40%;
            display: flex;
            align-items: center;
            justify-content: center;

            p{
              color: #00c2ff;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
