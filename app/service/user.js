module.exports = app => {
  class User extends app.Service {
    // 查找用户是否存在
    async isExistUser (name) {
      let result = await this.ctx.model.User.findByName(name)
      return !!result
    }
    async login (params) {
      let userinfo = await this.ctx.model.User.getOneByUserNameAndPassword(params)
      let res = userinfo ? app.dataToJson(userinfo) : false
      if (res) {
        res.created_at = app.toTimeStamp(res.created_at)
        res.updated_at = app.toTimeStamp(res.updated_at)
        // 存进session
        let session = this.ctx.session
        session.isLogin = true;
        session.userinfo = JSON.stringify(res);
      }
      return res
    }
    // 创建新用户
    async newUser (params) {
      this.ctx.model.User.create(params)
    }
    // 检查登录态
    async checkLogin () {
      let session = this.ctx.session
      return (session && session.isLogin && session.userinfo) ? JSON.parse(session.userinfo) : false
    }
  }
  return User;
};