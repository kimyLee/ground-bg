'use strict';

module.exports = app => {
  class SettingController extends app.Controller {
    // 关注、取消关注项目
    async followProject () {
      const { ctx, service } = this;
      let { isfollow } = ctx.request.body;
      if (!isfollow) {
        ctx.body = app.CODE.ERROR_PARAMS;
        return
      }
      await ctx.model.Project.create(params)
      ctx.body = app.CODE.SUCCESS;
    }
  }
  return SettingController;
};
