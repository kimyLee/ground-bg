'use strict';

module.exports = app => {
  class CommonController extends app.Controller {
    // 人员搜索 todo: 评估效率
    async searchUser() {
      const { ctx } = this
      let params = ctx.request.body
      let result = app.CODE.SUCCESS
      result.data = []
      if (params.keyword) {
        result.data = await ctx.model.User.findAll({
          'attributes': ['user_id', 'name'],
          'where': {
            $or: [
              {
                'name': { $like: params.keyword + '%' }
              },
              {
                'pinyin': { $like: params.keyword + '%' }
              }
            ]
              
          }
        })
      }
      this.ctx.body = result;
    }
  }
  return CommonController;
};
