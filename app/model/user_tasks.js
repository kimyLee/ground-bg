module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const UserTasks  = app.model.define('userTasks', {
      user_tasks_id: {type: INTEGER, unique: true, primaryKey: true, autoIncrement: true},
      user_id: INTEGER,
      task_id: INTEGER
    });

    UserTasks.addMember = async function(uid, tid) {
      let result = await app.model.UserTasks.create({
        user_id: uid,
        task_id: tid
      });
      return result;
    }
    return UserTasks;
  };