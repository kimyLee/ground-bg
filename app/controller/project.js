'use strict';

module.exports = app => {
  class ProjectController extends app.Controller {
    // 创建项目
    async createProject () {
      const { ctx, service } = this;
      let params = ctx.request.body;
      if (!params.name) {
        ctx.body = app.CODE.ERROR_NO_PROJECT_NAME;
        return
      }
      let user = app.getUserinfo(ctx)
      params.creator = user.name
      params.creator_id = user.user_id
      let pro = await ctx.model.Project.create(params);
      // 创建了项目后关联本人
      await ctx.model.UserProjects.tocreateRelation(pro.creator_id, pro.project_id);
      ctx.body = app.CODE.SUCCESS;
    }

    // 查看所有项目信息
    async getProjectList () {
        const { ctx } = this;
        let result = await ctx.model.Project.findAll({
            'order': [
                ['created_at', 'DESC']
            ]
        })
        ctx.body = Object.assign(app.CODE.SUCCESS, {data: result})
    }

    // 编辑项目
    async updateProject () {
        const { ctx, service } = this;
        let params = ctx.request.body;
        if (!params.id) {
            ctx.body = app.CODE.ERROR_NO_PROJECT;
            return
          }
        if (!params.name) {
            ctx.body = app.CODE.ERROR_NO_PROJECT_NAME;
            return
        }
        params.id = params.id - 0
        let res = await service.project.update(params)
        ctx.body = res
    }
    // 删除项目
    async delProject () {
        const { ctx, service } = this;
        let { id } = ctx.request.body;
        if (!id) {
            ctx.body = app.CODE.ERROR_NO_PROJECT;
            return
        }
        id = id - 0
        let res = await service.project.del(id)
        ctx.body = res
    }

    // 收藏项目
    async followProject () {
        const { ctx, service } = this;
        let { id, follow } = ctx.request.body;
        if (!id) {
            ctx.body = app.CODE.ERROR_NO_PROJECT;
            return
        }
        console.log(follow)
        if (follow === undefined) {
            ctx.body = app.CODE.ERROR_NO_FOLLOW_PARAMS;
            return
        }
        id = id - 0
        let res = await ctx.model.UserProjects.followProject(id, follow)
        ctx.body = res
    }
  }
  return ProjectController;
};
