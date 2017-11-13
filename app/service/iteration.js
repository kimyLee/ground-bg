module.exports = app => {
    class Iteration extends app.Service {
      // 查找用户是否存在
      async isExistIteration (id) {
        let result = await this.ctx.model.Iteration.findOne({where: { iteration_id: id }})
        return !!result
      }
      // 更新项目
      async update (params) {
        let id = params.id
        let isExist = await this.service.iteration.isExistIteration(id)
        if (isExist) {
            await this.ctx.model.Iteration.update(params, {where: { iteration_id: id }})
            return app.CODE.SUCCESS
        } else {
            return app.CODE.ERROR_NO_ITERATION
        }
      }
      // 删除项目
      async del (id) {
        let isExist = await this.service.iteration.isExistIteration(id)
        if (isExist) {
            await this.ctx.model.Iteration.destroy({where: { iteration_id: id }})
            return app.CODE.SUCCESS
        } else {
            return app.CODE.ERROR_NO_ITERATION
        }
      }
    }
    return Iteration;
  };