
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Task = app.model.define('task', {
      task_id: {type: INTEGER, unique: true, primaryKey: 'true', autoIncrement: true},
      iteration_id: INTEGER,  // 所属迭代
      name: STRING(255),     // 任务名
      creator: STRING(50),   // 创建人
      creator_id: INTEGER,   // 创建人ID
      deadline: DATE,        // 结束时间
      created_at: DATE,
      updated_at: DATE
      // 外键关联，任务成员表， 任务标签表， 标签表（归属项目），评论表
    });
    return Task;
  };