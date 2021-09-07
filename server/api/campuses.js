const { Campus, Student } = require("../db");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await Campus.findAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await Campus.create(req.body);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:campusId", async (req, res, next) => {
  try {
    if (req.params.campusId !== "null" && req.params.campusId !== "undefined") {
      const result = await Campus.findByPk(req.params.campusId);
      res.json(result);
    } else {
      res.send([]);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:campusId", async (req, res, next) => {
  try {
    const campusInstance = await Campus.findByPk(req.params.campusId);
    const result = await campusInstance.update(req.body);
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

router.put("/removestudent/:studentId", async (req, res, next) => {
  try {
    const studentInstance = await Student.findByPk(req.params.studentId);
    const result = await studentInstance.update(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/students/:studentId", async (req, res, next) => {
  try {
    if (
      req.params.studentId !== "null" &&
      req.params.studentId !== "undefined"
    ) {
      const result = await Student.findAll({
        where: {
          campusId: req.params.studentId,
        },
      });
      res.json(result);
    } else {
      res.send([]);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Campus.destroy({
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
