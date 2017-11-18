'use strict';

module.exports = app => {
  // 任务模块功能： 创建任务，删除任务，查看详情，（修改任务： 增加标签， 增加清单， 截止日期， 修改成员， ）
  class TaskController extends app.Controller {
    // 创建任务
    async createTask () {
      const { ctx, service } = this;
      let params = ctx.request.body;
      // 任务名为必需
      if (!params.name) {
        ctx.body = app.CODE.ERROR_NO_TASK_NAME;
        return
      }
      // 迭代id和项目id为必需
      if (!params.pid || !params.fid) {
        ctx.body = app.CODE.ERROR_NO_PID_OR_FID;
        return
      }
      params.project_id = params.pid;
      params.iteration_id = params.fid;

      let user = app.getUserinfo(ctx)
      params.creator = user.name;
      params.creator_id = user.user_id;
      let result = await service.task.createTask(params);
      // 创建了项目后关联本人
      ctx.body = result;
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
  }
  return TaskController;
};
