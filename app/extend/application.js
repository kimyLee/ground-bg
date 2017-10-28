
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
        // 用户模块
        SUCCESS_LOGIN: {code: 0, msg: '登录成功'},
        ERROR_NO_LOGIN: {code: -1, msg: '请先登录'},
        ERROR_LOGIN: {code: -1, msg: '登陆失败，用户密码错误'},
        ERROR_USERNAME: {code: -1, msg: '用户名错误'},
        ERROR_PWD: {code: -1, msg: '用户密码错误'},
        ERROR_USER_EXIST: {code: -1, msg: '该用户已存在'},
        // 项目模块
        SUCCESS_CREATE_PROJECT: {code: 0, msg: '创建成功'},
        ERROR_NO_PROJECT_NAME: {code: -1, msg: '项目名不能为空'},
        ERROR_NO_PROJECT: {code: -1, msg: '找不到对应项目'},
        FAIL_CREATE_PROJECT: {code: -1, msg: '创建失败'},
      }
    }
    return this[code];
  }
}
