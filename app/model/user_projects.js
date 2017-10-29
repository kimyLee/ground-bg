module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const UserProjects  = app.model.define('userProjects', {
      is_follow: { type: INTEGER, defaultValue: 0 }
    });
    // 去掉一下注释运行报错
    /* UserProjects.associate = function() { // 一开始不在回调里面，  app.model.User找不到对象
      // app.model.User.belongsToMany(app.model.Project, { as: 'project', through: UserProjects, foreignKey: 'user_id' })
      // app.model.Project.belongsToMany(app.model.User, { as: 'user', through: UserProjects, foreignKey: 'project_id' })
    } */
    return UserProjects;
  };