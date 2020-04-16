<template>
  <div class="center-cmp">
    <div class="cc-header">
      <dv-decoration-1 style="width:200px;height:50px;" />
      <div>重点监控</div>
      <dv-decoration-1 style="width:200px;height:50px;" />
    </div>
    <div class="video">
      <ul>
        <li v-for="(item, index) in videoData" :key="index">
          <dv-border-box-2>
            <d-player :options="item.options"></d-player>
          </dv-border-box-2>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import dPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'

export default {
  name: 'CenterCmp',
  components: {
    dPlayer
  },
  data () {
    return {
      videoData: [{
        options: {
          video: {
            url: 'http://static.smartisanos.cn/common/video/t1-ui.mp4',
            pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg'
          },
          autoplay: true,
          theme: '#FADFA3',
          live: true,
          lang: 'zh-cn',
          screenshot: true,
          preload: 'auto',
          volume: 0.7,
          mutex: false,
          contextmenu: [{
            text: 'GitHub',
            link: 'https://github.com/MoePlayer/vue-dplayer'
          }]
        }
      }, {
        options: {
          video: {
            url: 'http://static.smartisanos.cn/common/video/t1-ui.mp4',
            pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg'
          },
          autoplay: true,
          theme: '#FADFA3',
          live: true,
          lang: 'zh-cn',
          screenshot: true,
          preload: 'auto',
          volume: 0.7,
          mutex: false,
          contextmenu: [{
            text: 'GitHub',
            link: 'https://github.com/MoePlayer/vue-dplayer'
          }]
        }
      }, {
        options: {
          video: {
            url: 'http://static.smartisanos.cn/common/video/t1-ui.mp4',
            pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg'
          },
          autoplay: true,
          theme: '#FADFA3',
          live: true,
          lang: 'zh-cn',
          screenshot: true,
          preload: 'auto',
          volume: 0.7,
          mutex: false,
          contextmenu: [{
            text: 'GitHub',
            link: 'https://github.com/MoePlayer/vue-dplayer'
          }]
        }
      }, {
        options: {
          video: {
            url: 'http://static.smartisanos.cn/common/video/t1-ui.mp4',
            pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg'
          },
          autoplay: true,
          theme: '#FADFA3',
          live: true,
          lang: 'zh-cn',
          screenshot: true,
          preload: 'auto',
          volume: 0.7,
          mutex: false,
          contextmenu: [{
            text: 'GitHub',
            link: 'https://github.com/MoePlayer/vue-dplayer'
          }]
        }
      }]
    }
  },
  mounted () {
  },
  methods: {
    play () {
      console.log('play callback')
    }
  }
}
</script>

<style lang="less">
.center-cmp {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;

  .cc-header {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
  }

  .video{
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
}
</style>
