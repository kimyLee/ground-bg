
module.exports = app => {
    const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  
    const Comment = app.model.define('comment', {
      comment_id: {type: INTEGER, unique: true, primaryKey: 'true', autoIncrement: true},
      project_id: INTEGER,  // 所属项目
      content: TEXT,        // 评论内容
      created_at: DATE,
      updated_at: DATE
    });
    return Comment;
  };