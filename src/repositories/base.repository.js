class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async mongoGet(id) {
    return await this.model.findById(id);
  }

  async mongoGetAll(pageSize = 5, pageNum = 1) {
      const skips = pageSize * (pageNum - 1);
      return await this.model
        .find()
        .skip(skips)
        .limit(pageSize);
  }
  
  async mongoGetOrderBy(pageSize = 5, pageNum = 1,order = {nombre:1}) {
    const skips = pageSize * (pageNum - 1);
    return await this.model
      .find()
      .skip(skips)
      .limit(pageSize).sort(order);
}
  async mongoCreate(entity) {
    return await this.model.create(entity);
  }

  async mongoUpdate(id, entity) {
    console.log("repBase.mongoUpdate: "+id + " - " + entity);
    if(!this.model.findById(id)){
      return {error:"id no encontrado"};
    }
    return await this.model.findByIdAndUpdate(id, entity);
  }

  async mongoDelete(id) {
    await this.model.findByIdAndDelete(id);
    return true;
  }
}

module.exports = BaseRepository;
  