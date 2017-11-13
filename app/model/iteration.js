
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Iteration = app.model.define('iteration', {
      iteration_id: {type: INTEGER, unique: true, primaryKey: 'true', autoIncrement: true},
      project_id: INTEGER,  // 所属项目
      name: STRING(255),    // 迭代名
      creator: STRING(50),  // 创建人
      creator_id: INTEGER,  // 创建人ID
      start: STRING(50),    // 开始时间
      end: STRING(50),      // 结束时间
      created_at: DATE,
      updated_at: DATE
    });
    return Iteration;
  };