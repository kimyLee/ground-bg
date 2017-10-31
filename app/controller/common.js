'use strict';

module.exports = app => {
  class CommonController extends app.Controller {
    // 人员搜索
    async searchUser() {
      this.ctx.body = 'hi, egg';
    }
  }
  return CommonController;
};
