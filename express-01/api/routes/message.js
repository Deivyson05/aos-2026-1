import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.get("/", async (req, res) => {
  try {
     
    const messages = await req.context.models.Message.findAll();
    return res.status(200).send(messages);
  } catch (error) {
    return res.status(500).json({
      message: "erro interno do servidor",
      erro: error
    })
  }
});

router.get("/:messageId", async (req, res) => {
  try {
     
    const message = await req.context.models.Message.findByPk(
      req.params.messageId,
    );
    return res.status(message == null ? 404 : 304).send(message);
  } catch (error) {
    return res.status(500).json({
      message: "erro interno do servidor",
      erro: error
    });
  }
});

router.post("/", async (req, res) => {
  try {
     
    const message = await req.context.models.Message.create({
      text: req.body.text,
      userId: req.context.me.id,
    });

    return res.status(200).send(message);
  } catch (error) {
    return res.status(500).json({
      message: "erro interno do servidor",
      erro: error
    });
  }
});

router.delete("/:messageId", async (req, res) => {
  try {
     
    const result = await req.context.models.Message.destroy({
      where: { id: req.params.messageId },
    });

    return res.status(200).send(true);
  } catch (error) {
    return res.status(500).json({
      message: "erro interno do servidor",
      erro: error
    });
  }
});

export default router;
