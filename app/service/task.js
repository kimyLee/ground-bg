module.exports = app => {
    class Task extends app.Service {
      // 查找任务是否存在
      async isExistTask (id) {
        let result = await this.ctx.model.Task.findOne({where: { project_id: id }})
        return !!result
      }
      async createTask ({name, deadline = null, tagList = [], memberList = [], todoList = [], creator_id, creator, iteration_id, project_id}) {
        // todo: 时间是这么存的吗
        let task = await this.ctx.model.Task.create({name, deadline, creator_id, creator, project_id, iteration_id})
        console.log('成功创建', task.task_id)

        // 添加标签
        if (tagList.length) {
          await this.ctx.model.TasksTags.bulkCreate(tagList.map((e) => {
            return {task_id: task.task_id, tag_id: e}
          }))
        }

        // 添加成员
        if (memberList.length) {
          await this.ctx.model.UserTasks.bulkCreate(memberList.map((e) => {
            return {task_id: task.task_id, user_id: e}
          }))
        }

        // 添加清单
        // if (todoList.length) {
        //   await this.ctx.model.Todo.bulkCreate(todoList.map((e) => {
        //     return {task_id: task.task_id, name: e.name}
        //   }))
        //   // 添加子清单
        //   let len = todoList.length
        //   for (let i = 0; i < len; i++) {
        //     let target = todoList[i].list || []
        //     await this.ctx.model.TodoItem.bulkCreate(target.map((e) => {
        //       return {task_id: task.task_id, name: e.name}
        //     }))
        //   }
        // }
        return app.CODE.SUCCESS_CREATE_TASK;
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
    return Task;
  };