
const pinyin = require("pinyin");

module.exports = app => {
  class User extends app.Service {
    // 查找用户是否存在
    async isExistUser (name) {
      let result = await this.ctx.model.User.findByName(name)
      return !!result
    }
    async login (params) {
      let userinfo = await this.ctx.model.User.getOneByUserNameAndPassword(params)
      let res = userinfo ? app.dataToJson(userinfo) : false
      if (res) {
        res.created_at = app.toTimeStamp(res.created_at)
        res.updated_at = app.toTimeStamp(res.updated_at)
        // 存进session
        let session = this.ctx.session
        session.isLogin = true;
        session.userinfo = JSON.stringify(res);
      }
      return res
    }
    // 创建新用户
    async newUser (params) {
      let zh = params.name
      // 获取拼音码数组
      let py = pinyin(zh, {
        style: pinyin.STYLE_NORMAL,
        heteronym: true
      })
      // 递归拼接姓名数组
      let generatePinyinName = (index) => {      
        let result = {long: [], short: []}
        if (index > 0) {
          // 上个迭代结果，一个对象
          let res = generatePinyinName(index - 1)
          for (let j = py[index].length; j--;) {
            let item = py[index][j].toLowerCase()
            res.long.forEach((ele) => {
              result.long.push(ele + item)
            })
            res.short.forEach((ele) => {
              result.short.push(ele + item[0])
            })
          }
        } else {
          return { long: py[index].map(e => e.toLowerCase()), short: py[index].map(e => e[0].toLowerCase()) }
        }
        return result
      }
      let str = generatePinyinName(py.length - 1)
      params.pinyin = str.long.concat(str.short).join()
      this.ctx.model.User.create(params)
    }
    // 检查登录态
    async checkLogin () {
      let session = this.ctx.session
      return (session && session.isLogin && session.userinfo) ? JSON.parse(session.userinfo) : false
    }
  }
  return User;
};