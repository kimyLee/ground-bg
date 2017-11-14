
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Tags = app.model.define('tags', {
      tag_id: {type: INTEGER, unique: true, primaryKey: 'true', autoIncrement: true},
      project_id: INTEGER,  // 所属项目
      name: STRING(255),    // 标签名
      created_at: DATE,
      updated_at: DATE
    });
    return Tags;
  };