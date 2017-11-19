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
        // 获取关注列表
        let userId = app.getUserinfo(ctx).user_id
        let followList = await ctx.model.UserProjects.findAll({
            'where': {
                'user_id': userId,
                'is_follow': 1
            },
            'order': [
                ['created_at', 'DESC']
            ]
        })
        ctx.body = Object.assign(app.CODE.SUCCESS, {data: { projects: result, followList}})
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
        if (follow === undefined) {
            ctx.body = app.CODE.ERROR_NO_FOLLOW_PARAMS;
            return
        }
        id = id - 0
        let res = await ctx.model.UserProjects.followProject(id, follow)
        ctx.body = res
    }

    // 增加项目成员
    async addMember () {
        const { ctx, service } = this;
        let { userId, pid } = ctx.request.body;
        if (!userId) {
            ctx.body = app.CODE.ERROR_NO_MEMBER;
            return
        }
        if (!pid) {
            ctx.body = app.CODE.ERROR_NO_ITERATION_PID;
            return
        }
        // 判断成员是否已存在项目
        let isExist = await ctx.model.UserProjects.findOne({where: {
             project_id: pid,
             user_id: userId 
        }})
        if (isExist) {
            ctx.body = app.CODE.ERROR_MEMBER_HAS_EXIST;
            return
        }
        await this.ctx.model.UserProjects.tocreateRelation(userId, pid)
        ctx.body = app.CODE.SUCCESS
    }

    // 删除项目成员
    async delMember () {
        const { ctx, service } = this;
        let { userId, pid } = ctx.request.body;
        if (!userId) {
            ctx.body = app.CODE.ERROR_NO_MEMBER;
        }
        if (!pid) {
            ctx.body = app.CODE.ERROR_NO_ITERATION_PID;
        }
        await this.ctx.model.UserProjects.destroy({where: { 
            project_id: pid, 
            user_id: userId
        }})
        ctx.body = app.CODE.SUCCESS
    }
  }
  return ProjectController;
};
