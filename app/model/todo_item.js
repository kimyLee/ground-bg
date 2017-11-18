
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const TodoItem = app.model.define('todoItem', {
    todo_item_id: {type: INTEGER, unique: true, primaryKey: 'true', autoIncrement: true},
    todo_id: INTEGER,      // 所属清单
    name: STRING(255),     // 清单项名
    status: {type: INTEGER, default: 0},       // 清单项状态， 0未完成， 1完成
    created_at: DATE,
    updated_at: DATE
  });
  return TodoItem;
};