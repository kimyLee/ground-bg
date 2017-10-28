'use strict';

module.exports = app => {
  class UserController extends app.Controller {
    // 注册
    async regist () {
      const { ctx, service } = this;
      let params = ctx.request.body;
      if (!params.name) {
        ctx.body = app.CODE.ERROR_USERNAME;
        return
      }
      if (!params.pwd) {
        ctx.body = app.CODE.ERROR_PWD;
        return
      }
      let isExistUser = await service.user.isExistUser(params.name)
      if (isExistUser) {
        ctx.body = app.CODE.ERROR_USER_EXIST;
        return
      }
      await service.user.newUser(params)
      this.ctx.body = app.CODE.SUCCESS;
    }

    // 登录
    async login () {
      const { ctx, service } = this;
      let params = ctx.request.body;
      let result = await service.user.login(params)
      this.ctx.body = result ? Object.assign(app.CODE.SUCCESS_LOGIN, {data: result}) : app.CODE.ERROR_LOGIN;
    }

    // 检查登录
    async checkLogin () {
      let result = await this.service.user.checkLogin()
      this.ctx.body = result ? Object.assign(app.CODE.SUCCESS_LOGIN, {data: result}) : app.CODE.ERROR_NO_LOGIN;
    }
  }
  return UserController;
};
