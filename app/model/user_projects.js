module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const UserProjects  = app.model.define('userProjects', {
      is_follow: { type: INTEGER, defaultValue: 0 }
    });
    // UserProjects.associate = function() { // 一开始不在回调里面，  app.model.User找不到对象
    console.log(666, app.model, 333, this)
    app.model.user.belongsToMany(app.model.project, { through: UserProjects, foreignKey: 'user_id' })
    app.model.project.belongsToMany(app.model.user, { through: UserProjects, foreignKey: 'project_id' })
    // }
    return UserProjects;
  };