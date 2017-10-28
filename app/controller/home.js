'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    async index() {
      this.ctx.body = 'hi, egg';
    }
    async second () {
      this.ctx.body = 'hi, teest';
    }
  }
  return HomeController;
};
