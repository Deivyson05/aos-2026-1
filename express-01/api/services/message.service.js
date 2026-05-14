const findAll = async (models) => {
  return await models.message.findAll();
};

const findById = async (models, id) => {
  return await models.message.findByPk(id);
};

const create = async (models, data) => {
  return await models.message.create(data);
};

const update = async (models, id, data) => {
  return await models.message.update(data, { where: { id } });
};

const remove = async (models, id) => {
  return await models.message.destroy({ where: { id } });
};

export default { findAll, findById, create, update, remove };