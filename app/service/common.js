module.exports = app => {
    class Common extends app.Service {
      // 搜索用户
      async search (name) {
        let result = await this.ctx.model.User.findByName(name)
        return !!result
      }
    }
    return Common;
  };