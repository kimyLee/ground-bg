module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    user_id: {type: INTEGER, unique: true, primaryKey: 'true', autoIncrement: true},
    name: STRING(30),
    pwd: STRING(32),
    theme: STRING(30),
    last_sign_in_at: DATE,
    created_at: DATE,
    updated_at: DATE,
  });

  User.findByName = async function(name) {
    let result = await this.findOne({ where: { name }});
    return result;
  }

  User.getOneByUserNameAndPassword = async function({name, pwd}) {
    let result = await this.findOne({ where: { name, pwd }});
    return result;
  }

  User.prototype.logSignin = function* () {
    yield this.update({ last_sign_in_at: new Date() });
  }

  return User;
};