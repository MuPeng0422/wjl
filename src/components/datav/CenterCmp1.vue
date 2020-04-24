<template>
  <div class="center-cmp">
    <div class="cc-header">
      <dv-decoration-1 style="width:200px;height:50px;" />
      <div>重点监控</div>
      <dv-decoration-1 style="width:200px;height:50px;" />
    </div>
    <div class="video">
      <ul>
        <li>
          <dv-border-box-2>
             <video-player  class="video-player vjs-custom-skin"
                             ref="videoPlayer"
                             :options="playerOptions"
                             :playsinline="true"
                             customEventName="customstatechangedeventname"
                            >
              </video-player>
          </dv-border-box-2>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import 'videojs-flash'
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'CenterCmp',
  components: {
    videoPlayer
  },
  data () {
    return {
      playerOptions: {
        // videojs options
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        techOrder: ['flash', 'html5'], // 设置顺序，
        sourceOrder: true,
        fluid: true,
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        sources: [
          {
            type: 'rtmp/flv',
            src: 'rtmp://rtmp01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.hd'
          },
          {
            withCredentials: false,
            type: 'application/x-mpegURL',
            src: 'http://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.hd.m3u8' // 这是hls流
          }
        ],
        width: document.documentElement.clientWidth,
        autoplay: true,
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
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

          .video-player{
            width: 100%;
            height: 100%;

            .video-js{
              width: 100%;
              height: 100%;
            }

          }
        }
      }
    }
  }
}
</style>
