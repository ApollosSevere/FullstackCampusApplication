const { Student } = require("../db");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await Student.findAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await Student.create(req.body);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:studentId", async (req, res, next) => {
  try {
    const result = await Student.findByPk(req.params.studentId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:studentId", async (req, res, next) => {
  try {
    const studentInstance = await Student.findByPk(req.params.studentId);
    const result = await studentInstance.update(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/addstudent/:studentId", async (req, res, next) => {
  try {
    const studentInstance = await Student.findByPk(req.params.studentId);
    const result = await studentInstance.update(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Student.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
