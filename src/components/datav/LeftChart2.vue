<template>
  <div class="left-chart-1">
    <div class="lc1-header">张三收费站</div>

    <div class="lc1-details">设备运行总数<span><dv-digital-flop :config="option" style="width:200px;height:50px;"/></span></div>
    <dv-capsule-chart class="lc1-chart" :config="config" />
  </div>
</template>

<script>
export default {
  name: 'LeftChart2',
  data () {
    return {
      option: {
        number: [100],
        content: '{nt}',
        style: {
          fontSize: 30,
          fill: '#3de7c9'
        }
      },
      config2: null,
      config: {
        data: [
          {
            name: '收费系统',
            value: 167
          },
          {
            name: '通信系统',
            value: 67
          },
          {
            name: '监控系统',
            value: 123
          },
          {
            name: '供配电系统',
            value: 55
          },
          {
            name: '其他',
            value: 98
          }
        ],
        colors: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        unit: '件'
      }
    }
  }
}
</script>

<style lang="less">
.left-chart-1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;

  .lc1-header {
    height: 50px;
    font-weight: bold;
    text-indent: 20px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  .lc1-details {
    height: 50px;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-indent: 20px;
  }

  .lc1-chart {
    flex: 1;
  }
}
</style>
