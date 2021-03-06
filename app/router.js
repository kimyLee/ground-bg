'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  // 公共模块
  app.post('/common/searchUser', app.controller.common.searchUser);  // 搜素所有用户
  
  // 用户登录模块
  app.post('/user/regist', app.controller.user.regist);              // 注册
  app.post('/user/login', app.controller.user.login);                // 登录
  app.get('/user/checkLogin', app.controller.user.checkLogin);       // 检查登录
  // 项目模块
  app.post('/project/createProject', app.controller.project.createProject);    // 创建项目
  app.get('/project/getProjectList', app.controller.project.getProjectList);   // 查看所有项目信息
  app.post('/project/updateProject', app.controller.project.updateProject);    // 创建项目
  app.post('/project/delProject', app.controller.project.delProject);          // 删除项目
  app.post('/project/followProject', app.controller.project.followProject);    // 收藏,取消收藏项目
      // 成员
  app.post('/project/addMember', app.controller.project.addMember);            // 增加项目成员
  app.post('/project/delMember', app.controller.project.delMember);            // 删除项目成员
      // 标签
  app.post('/tags/addTag', app.controller.tags.addTag);                        // 增加标签
  app.post('/tags/delTag', app.controller.tags.delTag);                        // 删除标签
  app.post('/tags/getTags', app.controller.tags.getTags);                      // 获取标签列表
  // 迭代模块
  app.post('/iteration/createIteration', app.controller.iteration.createIteration);    // 收藏,取消收藏项目
  app.get('/iteration/getIteration', app.controller.iteration.getIteration);           // 查看所有项目信息
  app.post('/iteration/updateIteration', app.controller.iteration.updateIteration);    // 创建项目
  app.post('/iteration/delIteration', app.controller.iteration.delIteration);          // 删除项目
  // 任务模块
  app.post('/task/createTask', app.controller.task.createTask);                        // 创建任务
  app.post('/task/createTask', app.controller.task.createTask);                        // 添加标签
};
