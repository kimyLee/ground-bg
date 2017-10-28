module.exports = app => {
  class NewsService extends app.Service {
    async list(page = 1) {
      return true;
    }
  }
  return NewsService;
};