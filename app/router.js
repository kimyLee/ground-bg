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
};
