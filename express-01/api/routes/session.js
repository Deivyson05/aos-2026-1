import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    res.status(102).json({
      message: "processando..."
    });
    const user = await req.context.models.User.findByPk(req.context.me.id);
    return res.send(user);
  } catch (error) {
    return res.status(500).json({
      message: "erro interno do servidor",
      erro: error
    });
  }
});

export default router;
