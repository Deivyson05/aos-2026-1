import models from "../models/index.js";

const getAllTarefas = async () => {
  return await models.tarefa.findAll();
};

const getTarefaById = async (objectId) => {
  return await models.tarefa.findByPk(objectId);
};

const createTarefa = async (tarefaData) => {
  return await models.tarefa.create(tarefaData);
};

const updateTarefa = async (objectId, tarefaData) => {
  const response = await models.tarefa.update(tarefaData, {
    where: { objectId },
    returning: true,
  });
  return response;
};

const deleteTarefa = async (objectId) => {
  return await models.tarefa.destroy({
    where: { objectId },
  });
};

export default {
  getAllTarefas,
  getTarefaById,
  createTarefa,
  updateTarefa,
  deleteTarefa,
};