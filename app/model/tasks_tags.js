module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const TasksTags  = app.model.define('tasksTags', {
      tasks_tags_id: {type: INTEGER, unique: true, primaryKey: true, autoIncrement: true},
      user_id: INTEGER,
      task_id: INTEGER
    });

    TasksTags.addTag = async function(tag_id, task_id) {
      let result = await app.model.TasksTags.create({
        user_id: uid,
        task_id: tid
      });
      return result;
    }
    return TasksTags;
  };