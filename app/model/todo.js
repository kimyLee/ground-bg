
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Todo = app.model.define('todo', {
      todo_id: {type: INTEGER, unique: true, primaryKey: 'true', autoIncrement: true},
      task_id: INTEGER,      // 所属任务
      name: STRING(255),     // 清单名
      created_at: DATE,
      updated_at: DATE
    });
    return Todo;
  };