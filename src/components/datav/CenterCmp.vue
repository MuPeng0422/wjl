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
            <v-liveplayer ref="myvideo"></v-liveplayer>
          </dv-border-box-2>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Liveplayer from './liveplayer'
export default {
  name: 'CenterCmp',
  components: {
    'v-liveplayer': Liveplayer
  },
  data () {
    return {
      videoData: [
        {
          ref: 'myvideo1'
        },
        {
          ref: 'myvideo2'
        },
        {
          ref: 'myvideo3'
        },
        {
          ref: 'myvideo4'
        }
      ]
    }
  },
  created () {
    this.$axios.get(window.g.API_ROOT + '/api/v1/GetSrc').then((res) => {
      console.log(res)
      for (var i = 0; i < res.data.src.length; i++) {
        this.PlayVideo(res.data.src[i].strToken)
      }
    })
  },
  methods: {
    PlayVideo (token) {
      this.$refs.myvideo.PlayVideo(token)
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
