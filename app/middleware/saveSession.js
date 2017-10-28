// 作用： 延长登录时效, 拦截未登录操作
module.exports = (options, app) => {
  return async function saveSession(ctx, next) {
    // 不是用户登录相关接口的话，如果 Session 是空的，则不保存, 并通知登录
    if (ctx.request.url.indexOf('/user') !== 0 && !ctx.session.isLogin) {
      ctx.body = app.CODE.ERROR_NO_LOGIN
    } else {
      await next();
      ctx.session.isLogin && ctx.session.save();
    }
  };
};
