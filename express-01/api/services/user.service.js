const findAll = async (models) => {
  return await models.user.findAll();
};

const findById = async (models, id) => {
  return await models.user.findByPk(id);
};

const create = async (models, data) => {
  return await models.user.create(data);
};

const update = async (models, id, data) => {
  return await models.user.update(data, { where: { id } });
};

const remove = async (models, id) => {
  return await models.user.destroy({ where: { id } });
};

export default { findAll, findById, create, update, remove };