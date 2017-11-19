'use strict';

module.exports = app => {
  class TagsController extends app.Controller {
    async getTags() {
      const { ctx, service } = this;
      let result = await ctx.model.Tags.getTags(ctx.request.body)
      ctx.body = app.dataToJson(result)
    }

    async addTag() {
      const { ctx, service } = this;
      let result = await ctx.model.Tags.addTag(ctx.request.body)
      ctx.body = result
    }

    async delTag() {
      const { ctx, service } = this;
      let result = await ctx.model.Tags.delTag(ctx.request.body)
      ctx.body = result
    }
  }
  return TagsController;
};
