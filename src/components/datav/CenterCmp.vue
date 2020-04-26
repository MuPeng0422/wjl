<template>
  <div class="center-cmp">
    <div class="cc-header">
      <dv-decoration-1 style="width:200px;height:50px;" />
      <div>重点监控</div>
      <dv-decoration-1 style="width:200px;height:50px;" />
    </div>
    <div class="video">
      <v-liveplayer></v-liveplayer>
    </div>
  </div>
</template>

<script>
import Liveplayer from './liveplayer'
export default {
  name: 'CenterCmp',
  components: {
    'v-liveplayer': Liveplayer
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
  }
}
</style>