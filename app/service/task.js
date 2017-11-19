module.exports = app => {
    class Task extends app.Service {
      // 查找任务是否存在
      async isExistTask (id) {
        let result = await this.ctx.model.Task.findOne({where: { project_id: id }})
        return !!result
      }
      async createTask ({name, deadline = null, tagList = [], memberList = [], todoList = [], creator_id, creator, iteration_id, project_id}) {
        // todo: 时间是这么存的吗
        // 应该先判断任务和迭代是否存在
        let hasProject = await this.service.project.isExistProject(project_id)
        if (!hasProject) {
          return app.CODE.ERROR_NO_PROJECT
        }
        let hasIteration = await this.service.iteration.isExistIteration(iteration_id)
        if (!hasIteration) {
          return app.CODE.ERROR_NO_ITERATION
        }
        let task = await this.ctx.model.Task.create({name, deadline, creator_id, creator, project_id, iteration_id})

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
        
        // 添加清单, 先插入一级条目再插入子清单
        if (todoList.length) {
          let len = todoList.length
          for (let i = 0; i < len; i++) {
            let item = todoList[i]
            let parent = await this.ctx.model.Todo.create(
              {task_id: task.task_id, name: item.name}
            )
            // 批量添加子清单
            await this.ctx.model.TodoItem.bulkCreate(item.list.map((e) => {
              return {todo_id: parent.todo_id, name: e.name}
            }))
          }
        }
        return app.CODE.SUCCESS_CREATE_TASK;
      }
      // 更新项目, 截止日期， 增加标签（单独），添加评论（待定）， 添加清单（单独），修改清单（单独），删除清单（单独），添加成员（单独）， 删除成员（单独）
      // 更改名字， 截止日期
      async updateTask (params) {
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