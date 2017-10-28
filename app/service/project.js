module.exports = app => {
    class Project extends app.Service {
      // 查找用户是否存在
      async isExistProject (id) {
        let result = await this.ctx.model.Project.findById(id)
        return !!result
      }
      // 更新项目
      async update (params) {
        let isExist = await this.service.project.isExistProject(params.id)
        if (isExist) {
            await this.ctx.model.Project.create(params)
            return app.CODE.SUCCESS
        } else {
            return app.CODE.ERROR_NO_PROJECT
        }
        
      }
    }
    return Project;
  };