module.exports = app => {
    class Project extends app.Service {
      // 查找用户是否存在
      async isExistProject (id) {
        let result = await this.ctx.model.Project.findOne({where: { project_id: id }})
        return !!result
      }
      // 更新项目
      async update (params) {
        let id = params.id
        let isExist = await this.service.project.isExistProject(id)
        if (isExist) {
            await this.ctx.model.Project.update(params, {where: { project_id: id }})
            return app.CODE.SUCCESS
        } else {
            return app.CODE.ERROR_NO_PROJECT
        }
      }
      // 删除项目
      async del (id) {
        let isExist = await this.service.project.isExistProject(id)
        if (isExist) {
            await this.ctx.model.Project.destroy({where: { project_id: id }})
            return app.CODE.SUCCESS
        } else {
            return app.CODE.ERROR_NO_PROJECT
        }
      }
    }
    return Project;
  };