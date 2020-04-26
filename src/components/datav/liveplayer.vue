<template>
<div class="h5videowrapper h5container" >
    <ul>
      <li>
        <dv-border-box-2>
          <video class="h5video" id="video0" autoplay controls webkit-playsinline playsinline type="video/mp4"></video>
        </dv-border-box-2>
      </li>
      <li>
        <dv-border-box-2>
          <video class="h5video" id="video1" autoplay controls webkit-playsinline playsinline type="video/mp4"></video>
        </dv-border-box-2>
      </li>
      <li>
        <dv-border-box-2>
          <video class="h5video" id="video2" autoplay controls webkit-playsinline playsinline type="video/mp4"></video>
        </dv-border-box-2>
      </li>
      <li>
        <dv-border-box-2>
          <video class="h5video" id="video3" autoplay controls webkit-playsinline playsinline type="video/mp4"></video>
        </dv-border-box-2>
      </li>
    </ul>
</div>
</template>

<script>
import '../../assets/js/adapter'
import { H5sPlayerWS, H5sPlayerHls, H5sPlayerRTC } from '../../assets/js/h5splayer.js'
import { H5siOS, H5sPlayerCreate } from '../../assets/js/h5splayerhelper.js'
export default {
  name: 'liveplayer',
  data () {
    return {
      videoData: [],
      videoid: 'video1',
      h5handler: undefined,
      currtoken: undefined,
      ptzshow: false,
      proto: 'WS'
    }
  },
  beforeDestroy () {
    if (this.h5handler !== undefined) {
      this.h5handler.disconnect()
      delete this.h5handler
      this.h5handler = undefined
    }
    this.currtoken = undefined
  },
  created () {
    // this.getData()
  },
  mounted () {
    this.PlayVideo()
  },
  methods: {
    async PlayVideo () {
      this.videoData = await this.$axios.get(window.g.API_ROOT + '/api/v1/GetSrc').then((res) => {
        return res.data.src
      })
      if (this.h5handler !== undefined) {
        this.h5handler.disconnect()
        delete this.h5handler
        this.h5handler = undefined
      }
      var root = window.g.API_ROOT
      var wsroot = window.g.WS_HOST_ROOT
      if (root === undefined) {
        root = window.location.protocol + '//' + window.location.host + window.location.pathname
      }
      if (wsroot === undefined) {
        wsroot = window.location.host
      }

      let conf0 = {
        videoid: 'video0',
        protocol: window.location.protocol, // http: or https:
        host: wsroot, // localhost:8080
        rootpath: '/', // '/'
        token: this.videoData[0].strToken,
        hlsver: 'v1', // v1 is for ts, v2 is for fmp4
        session: 'c1782caf-b670-42d8-ba90-2244d0b0ee83' // session got from login
      }

      var h5handler0 = new H5sPlayerWS(conf0)
      h5handler0.connect()

      let conf1 = {
        videoid: 'video1',
        protocol: window.location.protocol, // http: or https:
        host: wsroot, // localhost:8080
        rootpath: '/', // '/'
        token: this.videoData[1].strToken,
        hlsver: 'v1', // v1 is for ts, v2 is for fmp4
        session: 'c1782caf-b670-42d8-ba90-2244d0b0ee83' // session got from login
      }
      var h5handler1 = new H5sPlayerWS(conf1)
      h5handler1.connect()

      let conf2 = {
        videoid: 'video2',
        protocol: window.location.protocol, // http: or https:
        host: wsroot, // localhost:8080
        rootpath: '/', // '/'
        token: this.videoData[2].strToken,
        hlsver: 'v1', // v1 is for ts, v2 is for fmp4
        session: 'c1782caf-b670-42d8-ba90-2244d0b0ee83' // session got from login
      }
      var h5handler2 = new H5sPlayerWS(conf2)
      h5handler2.connect()

      let conf3 = {
        videoid: 'video3',
        protocol: window.location.protocol, // http: or https:
        host: wsroot, // localhost:8080
        rootpath: '/', // '/'
        token: this.videoData[3].strToken,
        hlsver: 'v1', // v1 is for ts, v2 is for fmp4
        session: 'c1782caf-b670-42d8-ba90-2244d0b0ee83' // session got from login
      }
      var h5handler3 = new H5sPlayerWS(conf3)
      h5handler3.connect()
    }
  }
}
</script>

<style lang="less">

.h5videowrapper{
  width: 100%;
  height: 100%;

  ul{
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(2, 50%);
      grid-template-rows: repeat(2, 50%);
      padding: 20px;
      box-sizing: border-box;
      li{
        width: 100%;
        height: 100%;
        padding: 5px;
        .dv-border-box-2{
          width: 100%;
          height: 100%;
        }
      }
    }
}
.h5video{
   width: 100%;
   height: 100%;
   background: black;
}
</style>
