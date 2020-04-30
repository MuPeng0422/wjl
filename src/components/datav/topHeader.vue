<template>
  <div id="top-header">
    <div class="header-left-decoration">
      <img :src="logoImg" class="logo" alt="logo" />
    </div>
    <dv-decoration-5 class="header-center-decoration" />
    <div class="header-right-decoration" justify="end">
      <el-button type="primary" @click="SignOut">退出平台</el-button>
<!--      <div class="right-time-weather">-->
<!--        <div class="time">-->
<!--          {{ nowDate + ' ' + nowTime + ' ' + nowWeek }}-->
<!--        </div>-->
<!--        <div class="weather">-->
<!--          {{ localweather }}-->
<!--          <img :src="weatherImg" :style="{width:'20px',height:'20px'}">-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <dv-decoration-10 />
    <div class="center-title">陕西省公安厅雁塔区智慧安防小区管理平台</div>
  </div>
</template>

<script>
export default {
  name: 'TopHeader',
  data () {
    return {
      logoImg: '/static/logo.png',
      localweather: {},
      weatherImg: '',
      nowDate: '2020-01-01', // 当前日期
      nowTime: '00:00:00', // 当前时间
      nowWeek: '星期一' // 当前星期
    }
  },
  mounted () {
    this.currentTime()
    this.get_data()
  },
  methods: {
    SignOut () {
      this.$store.state.deptId = ''
      this.$store.state.client = ''
      this.$router.push({path: '/'})
    },
    currentTime () {
      setInterval(this.getDate, 1000)
    },
    getDate () {
      var _this = this
      let yy = new Date().getFullYear()
      let mm = (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)
      let dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
      let week = new Date().getDay()
      let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
      let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
      if (week === 1) {
        this.nowWeek = '星期一'
      } else if (week === 2) {
        this.nowWeek = '星期二'
      } else if (week === 3) {
        this.nowWeek = '星期三'
      } else if (week === 4) {
        this.nowWeek = '星期四'
      } else if (week === 5) {
        this.nowWeek = '星期五'
      } else if (week === 6) {
        this.nowWeek = '星期六'
      } else {
        this.nowWeek = '星期日'
      }
      _this.nowTime = hh + ':' + mf + ':' + ss
      _this.nowDate = yy + '/' + mm + '/' + dd
    },
    get_data () {
      var _this = this
      this.$axios.get('https://tianqiapi.com/api?version=v6&appid=71549884&appsecret=XH6bWw5A').then(function (response) {
        var data = response.data
        _this.localweather = data.city + ' ' + data.wea + ' ' + data.tem2 + '℃ ~ ' + data.tem1 + '℃ ' + data.win
        _this.weatherImg = 'http://tq.daodaoim.com/tianqiapi/skin/pitaya/' + response.data.wea_img + '.png'
      })
    }
  }
}
</script>

<style lang="less" scoped>
#top-header {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .dv-decoration-10 {
    position: absolute;
    width: 98%;
    left: 1%;
    height: 5px;
    bottom: 0px;
  }

  .header-center-decoration {
    width: 60%;
    height: 60px;
    margin-top: 30px;
  }

  .header-left-decoration {
    width: 20%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
  }

  .header-right-decoration {
    width: 20%;
    padding: 20px;
    height: 100px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: flex-end;
    .right-time-weather{
      width: 100%;
      color: #00c2ff;
      text-align: right;
      .time{
        font-size: 16px;
      }
      .weather{
        img{
          vertical-align: middle;
        }
      }
    }
  }

  .center-title {
    position: absolute;
    font-size: 24px;
    font-weight: bold;
    left: 50%;
    top: 25px;
    transform: translateX(-50%);
  }
}
</style>
