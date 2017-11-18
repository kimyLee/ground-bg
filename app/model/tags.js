
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Tags = app.model.define('tags', {
      tag_id: {type: INTEGER, unique: true, primaryKey: 'true', autoIncrement: true},
      project_id: INTEGER,  // 所属项目
      name: STRING(255),    // 标签名
      created_at: DATE,
      updated_at: DATE
    });

    Tags.addTag = async function({name, pid}) {
      if (!name) {
        return app.CODE.ERROR_NO_TAG_NAME
      }
      if (!pid) {
        return app.CODE.ERROR_NO_ITERATION_PID
      }
      let result = await app.model.Tags.create({
        project_id: pid,
        name
      });
      return app.CODE.SUCCESS;
    }
    
    Tags.delTag = async function({ id }) {
      if (!id) {
        return app.CODE.ERROR_NO_TAG_ID
      }
      let result = await app.model.Tags.destroy({where: { tag_id: id }});
      return app.CODE.SUCCESS;
    }

    Tags.getTags = async function({ pid }) {
      if (!pid) {
        return app.CODE.ERROR_NO_ITERATION_PID
      }
      let result = await app.model.Tags.findAll({
        'where': { project_id: pid},
        'order': [
            ['created_at', 'DESC']
        ]
      })
      return result;
    }
    return Tags;
  };