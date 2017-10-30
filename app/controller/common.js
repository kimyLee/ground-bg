'use strict';

module.exports = app => {
  class CommonController extends app.Controller {
    // 搜索用户
    async searchUser() {
      const { ctx } = this;
      let { isfollow } = ctx.request.body;
      let result = await ctx.model.User.findAll({
        'order': [
            ['id', 'DESC']
        ]
      })
      ctx.body = Object.assign(app.CODE.SUCCESS, {data: result})
    }
  }
  return CommonController;
};
