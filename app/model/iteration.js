
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Iteration = app.model.define('iteration', {
      project_id: {type: INTEGER, unique: true, primaryKey: 'true', autoIncrement: true},
      name: STRING(255),    // 项目名
      desc: STRING(255),    // 项目简介
      creator: STRING(50),  // 创建人
      creator_id: INTEGER,  // 创建人ID
      created_at: DATE,
      updated_at: DATE
    });
    /* Project.associate = function() {
      assert.ok(app.model.User);
      assert.ok(app.model.Project);
      assert.ok(app.model.UserProjects);
      Project.belongsToMany(app.model.User, { through: app.model.UserProjects, foreignKey: 'project_id' })
    } */
    return Project;
  };