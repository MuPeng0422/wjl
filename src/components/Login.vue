<template>
  <div class="login">
    <el-form :rules="rules" ref="form" :model="form" label-width="80px" class="loginForm">
      <div class="title">系统登录</div>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" class="loginBtn" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      apiUrl: window.g.BASE_URL,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$axios.post(this.apiUrl + '/push/event/zhsqLogin', { username: this.form.username, password: this.form.password }).then((res) => {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            console.log(res)
            if (res.data.code === 200) {
              var data = {
                deptId: res.data.data.deptId,
                client: res.data.data.client
              }
              localStorage.setItem('store', JSON.stringify(data))
              this.$router.push({path: '/Index'})
            } else {
              this.$message.error(res.data.message)
            }
          } else {
            return false
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
.login{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #030409;
  background-image: url("./datav/img/bg.png");
  background-size: 100% 100%;

  .loginForm{
    width: 500px;
    height: 300px;
    margin: 0 auto;
    padding: 20px 50px 50px;
    background: #fff;

    .title{
      font-size: 28px;
      line-height: 60px;
      text-align: center;
      color: #000;
    }

    .loginBtn{
      width: 100%;
    }
  }
}
</style>
