
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    user_id: {type: INTEGER, unique: true, primaryKey: true, autoIncrement: true},
    // login: STRING,
    name: STRING(30),
    pwd: STRING(32),
    theme: STRING(30),
    pinyin: STRING(255),
    // logan: {type: STRING(32), allowNull: true},
    // age: {type: INTEGER, allowNull: true},
    last_sign_in_at: DATE,
    created_at: DATE,
    updated_at: DATE,
  });

  User.findByName = async function(name) {
    let result = await this.findOne({ where: { name }});
    return result;
  }

  User.getOneByUserNameAndPassword = async function({name, pwd}) {
    let result = await this.findOne({
      'attributes': ['user_id', 'name', 'theme'],
      where: { name, pwd }
    });
    return result;
  }
  /* User.associate = function() {
    assert.ok(app.model.User);
    assert.ok(app.model.Project);
    assert.ok(app.model.UserProjects);
    app.model.User.belongsToMany(app.model.Project, { as: 'project', through: app.model.UserProjects, foreignKey: 'user_id' })    
  } */

  /* User.prototype.logSignin = function* () {
    yield this.update({ last_sign_in_at: new Date() });
  } */

  return User;
};