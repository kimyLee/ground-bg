
const code = Symbol('Application#bar');

module.exports =  {
  // 根据session获取当前登录用户
  getUserinfo (ctx) {
    let session = ctx.session
    return session.userinfo ? JSON.parse(session.userinfo) : {};
  },
  
  // 日期转时间戳
  toTimeStamp (time) {
    return new Date(time).getTime()
  },

  // 数据模型转js对象
  dataToJson (data) {
    return JSON.parse(JSON.stringify(data))
  },

  get CODE () {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    if (!this[code]) {
      this[code] = {
        SUCCESS: {code: 0, msg: '请求成功处理'},
        FAIL: {code: -1, msg: '请求失败'},
        // 公共模块
        // 用户模块
        SUCCESS_LOGIN: {code: 0, msg: '登录成功'},
        ERROR_NO_LOGIN: {code: -1, msg: '请先登录'},
        ERROR_LOGIN: {code: -1, msg: '登陆失败，用户密码错误'},
        ERROR_USERNAME: {code: -1, msg: '用户名错误'},
        ERROR_PWD: {code: -1, msg: '用户密码错误'},
        ERROR_USER_EXIST: {code: -1, msg: '该用户已存在'},
        ERROR_USER_NOEXIST: {code: -1, msg: '用户不存在'},
        // 项目模块
        SUCCESS_CREATE_PROJECT: {code: 0, msg: '创建成功'},
        ERROR_NO_PROJECT_NAME: {code: -1, msg: '项目名不能为空'},
        ERROR_NO_MEMBER: {code: -1, msg: '成员不能为空'},
        ERROR_MEMBER_HAS_EXIST: {code: -1, msg: '成员已经存在'},
        ERROR_NO_FOLLOW_PARAMS: {code: -1, msg: '变更状态不能为空'},
        ERROR_NO_PROJECT: {code: -1, msg: '找不到对应项目'},
        FAIL_CREATE_PROJECT: {code: -1, msg: '创建失败'},
        // 标签
        ERROR_NO_TAG_NAME: {code: -1, msg: '标签名不能为空'},
        ERROR_NO_TAG_ID: {code: -1, msg: '标签id不能为空'},
        // 迭代模块
        ERROR_NO_ITERATION: {code: -1, msg: '找不到该迭代'},
        ERROR_NO_ITERATION_PID: {code: -1, msg: '项目ID不能为空'},
        ERROR_NO_ITERATION_NAME: {code: -1, msg: '迭代名不能为空'},
        ERROR_NO_ITERATION_TIME: {code: -1, msg: '迭代开始或结束时间不能为空'},
        // 任务模块
        SUCCESS_CREATE_TASK: {code: 0, msg: '创建成功'},
        ERROR_NO_PID_OR_FID: {code: -1, msg: '项目id或迭代id不能为空'},
        ERROR_NO_TASK_NAME: {code: -1, msg: '任务名不能为空'},
        ERROR_NO_TASK: {code: -1, msg: '找不到对应任务'},
        FAIL_CREATE_TASK: {code: -1, msg: '创建失败'},
      }
    }
    return this[code];
  }
}
