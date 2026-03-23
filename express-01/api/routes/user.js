import { Router } from "express";
import models from "../models";

const router = Router();

router.get("/", async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.send(users);
});

router.get("/:userId", async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId);
  return res.send(user);
});

router.post("/", async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.json({
      body: req.body,
      text: "Está faltando informações"
    });
  } else {
    await models.User.create(
      {
        username: username,
        email: email,
        messages: []
      },
      {
        include: [models.Message]
      }
    )
  }
  return res.json({
    body: req.body,
    text: "requisicao enviada"
  })
});

router.put("/:userId", async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await User.update(req.body, {
      where: { id }
    });

    if (updated) {
      const user = await User.findByPk(id);
      return res.json(user);
    }

    return res.status(404).json({ error: 'Usuário não encontrado' });

  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar' });
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.destroy({
      where: { id }
    });

    if (deleted) {
      return res.json({ message: 'Usuário deletado' });
    }

    return res.status(404).json({ error: 'Usuário não encontrado' });

  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar' });
  }
});

export default router;
