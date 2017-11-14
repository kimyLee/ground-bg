'use strict';

module.exports = app => {
  class IterationController extends app.Controller {
    // 创建迭代
    async createIteration () {
      const { ctx, service } = this;
      let params = ctx.request.body;
      if (!params.name) {
        ctx.body = app.CODE.ERROR_NO_ITERATION_NAME;
        return
      }
      if (!params.pid) {
        ctx.body = app.CODE.ERROR_NO_ITERATION_PID;
        return
      }
      params.project_id = params.pid
      
      if (!params.begin || !params.end) {
        ctx.body = app.CODE.ERROR_NO_ITERATION_TIME;
        return
      }
      let user = app.getUserinfo(ctx)
      params.creator = user.name
      params.creator_id = user.user_id
      let pro = await ctx.model.Iteration.create(params);
      ctx.body = app.CODE.SUCCESS;
    }

    // 查看所有迭代信息
    async getIteration () {
        const { ctx } = this;
        let result = await ctx.model.Iteration.findAll({
            'order': [
                ['created_at', 'DESC']
            ]
        })
        ctx.body = Object.assign(app.CODE.SUCCESS, {data: result})
    }

    // 编辑迭代 params: id, name, pid
    async updateIteration () {
        const { ctx, service } = this;
        let params = ctx.request.body;
        if (!params.id) {
            ctx.body = app.CODE.ERROR_NO_ITERATION;
            return
          }
        if (!params.name) {
            ctx.body = app.CODE.ERROR_NO_ITERATION_NAME;
            return
        }

        if (!params.pid) {
            ctx.body = app.CODE.ERROR_NO_ITERATION_PID;
            return
        }

        if (!params.begin || !params.end) {
            ctx.body = app.CODE.ERROR_NO_ITERATION_TIME;
            return
        }
        params.project_id = params.pid - 0
        params.iteration_id = params.id - 0
        let res = await service.iteration.update(params)
        ctx.body = res
    }
    // 删除项目
    async delIteration () {
        const { ctx, service } = this;
        let { id } = ctx.request.body;
        if (!id) {
          ctx.body = app.CODE.ERROR_NO_ITERATION;
          return
        }
        id = id - 0
        let res = await service.iteration.del(id)
        ctx.body = res
    }
  }
  return IterationController;
};
