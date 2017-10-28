module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Project = app.model.define('project', {
      project_id: {type: INTEGER, unique: true, primaryKey: 'true', autoIncrement: true},
      name: STRING(255),    // 项目名
      desc: STRING(255),    // 项目简介
      creator: STRING(50),  // 创建人
      creator_id: INTEGER,  // 创建人ID
      created_at: DATE,
      updated_at: DATE
    });
  
    return Project;
  };