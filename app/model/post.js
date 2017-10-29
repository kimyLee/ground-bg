module.exports = app => { 
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Post = app.model.define('Post', {
    name: STRING(30),
    user_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });
  // 引用readme 的 post示例，直接去掉注释运行associate也报错
  /* Post.associate = function() {
    app.model.Post.belongsTo(app.model.User, { as: 'user' });
  } */

  return Post;
};