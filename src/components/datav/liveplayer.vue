<template>
<div class="h5videowrapper h5container" >
    <video class="h5video" :id="videoid" autoplay controls webkit-playsinline playsinline type="video/mp4"></video>
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
  mounted () {
    // this.PlayVideo('token1')
  },
  methods: {
    PlayVideo (token) {
      if (token !== '') {
        var str = 'id' + token
        this.videoid = str.replace(/-/g, '')
      }
      if (this.h5handler !== undefined) {
        this.h5handler.disconnect()
        delete this.h5handler
        this.h5handler = undefined
      }
      this.currtoken = token
      var root = window.g.API_ROOT
      var wsroot = window.g.WS_HOST_ROOT
      if (root === undefined) {
        root = window.location.protocol + '//' + window.location.host + window.location.pathname
      }
      if (wsroot === undefined) {
        wsroot = window.location.host
      }
      let conf = {
        videoid: 'video1',
        protocol: window.location.protocol, // http: or https:
        host: wsroot, // localhost:8080
        rootpath: '/', // '/'
        token: token,
        hlsver: 'v1', // v1 is for ts, v2 is for fmp4
        session: 'c1782caf-b670-42d8-ba90-2244d0b0ee83' // session got from login
      }

      this.h5handler = new H5sPlayerWS(conf)
      // this.h5handler = new H5sPlayerRTC(conf);

      this.h5handler.connect()
    }
  }
}
</script>

<style scoped>

.h5videowrapper{
  width: 100%;
  height: 100%;
}
.h5video{
   width: 100%;
   height: 100%;
   background: black;
}
</style>
