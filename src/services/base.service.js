class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async mongoGet(id) {
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = "id must be sent";
      throw error;
    }

    const currentEntity = await this.repository.mongoGet(id);

    if (!currentEntity) {
      const error = new Error();
      error.status = 404;
      error.message = "entity does not found";
      throw error;
    }

    return currentEntity;
  }

  async mongoGetAll(pageSize, pageNum, campo={}) {
    return await this.repository.mongoGetAll(pageSize, pageNum, campo);
  }

  async mongoCreate(entity) {
    return await this.repository.mongoCreate(entity);
  }

  async mongoUpdate(id, entity) {
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = "id must be sent";
      throw error;
    }

    const {_id} = await this.repository.mongoGet(id);

    if (!_id) {
      const error = new Error();
      error.status = 404;
      error.message = "entity does not found";
      throw error;
    }

    return await this.repository.mongoUpdate(id, entity);
  }

  async mongoDelete(id) {
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = "id must be sent";
      throw error;
    }

    return await this.repository.mongoDelete(id);
  }
}

module.exports = BaseService;
