class BaseRepository {
    constructor(model) {
      this.model = model;
    }
  
    async mongoGet(id) {
      return await this.model.findById(id);
    }
  
    // async getAll() {
    //   return await this.model.find()
    // }
    async mongoGetAll(pageSize = 5, pageNum = 1) {
        const skips = pageSize * (pageNum - 1);
        return await this.model
          .find()
          .skip(skips)
          .limit(pageSize);
    }

  
    async mongoCreate(entity) {
      return await this.model.create(entity);
    }
  
    async mongoUpdate(id, entity) {
      return await this.model.findByIdAndUpdate(id, entity, { new: true });
    }
  
    async mongoDelete(id) {
      await this.model.findByIdAndDelete(id);
      return true;
    }
  }
  
  module.exports = BaseRepository;
  