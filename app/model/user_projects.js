module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const UserProjects  = app.model.define('userProjects', {
      user_project_id: {type: INTEGER, unique: true, primaryKey: true, autoIncrement: true},
      user_id: INTEGER,
      project_id: INTEGER,
      is_follow: { type: INTEGER, defaultValue: 0 }
    });

    UserProjects.tocreateRelation = async function(uid, pid, follow) {
      let result = await app.model.UserProjects.create({
        user_id: uid,
        project_id: pid,
        is_follow: follow || false
      });
      return result;
    }
    // 收藏项目
    UserProjects.followProject = async function(pid, follow) {
      // 先检查项目是否存在
      let isExist = await app.model.UserProjects.find({'where': { 'project_id': pid }})
      if (!isExist) {
        return app.CODE.ERROR_NO_PROJECT
      }
      let result = await app.model.UserProjects.update(
        { 'is_follow': follow},
        {
          'where': { 'project_id': pid }
        }
      );
      return app.CODE.SUCCESS;
    }
    // 去掉一下注释运行报错
    /* UserProjects.associate = function() { // 一开始不在回调里面，  app.model.User找不到对象
      assert.ok(app.model.User);
      assert.ok(app.model.Project);
      assert.ok(app.model.UserProjects);
      app.model.User.belongsToMany(app.model.Project, { as: 'project', through: UserProjects, foreignKey: 'user_id' })
      app.model.Project.belongsToMany(app.model.User, { as: 'user', through: UserProjects, foreignKey: 'project_id' })
    } */
    return UserProjects;
  };