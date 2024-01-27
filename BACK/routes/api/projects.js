const router = require("express").Router();
const Project = require("../../models/project.model");



router.get("/", (req, res) => {
  Project.find()
    .populate("author", "email username")
    .exec((err, projects) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json(projects);
    });
});

router.get("/:projectId", (req, res) => {
  const { projectId } = req.params;
  Project.findById(projectId)
  .populate("author", "email username")
  .then((project) => {
    res.json(project);
  });
});

router.post("/", (req, res) => {
  const author = {
    _id: req.user._id,
    email: req.user.email,
  };

  req.body.author = author;

  Project.create({
    ...req.body,
    email: req.user.email,
    username: req.user.username,
  })
    .then((project) => Project.findById(project._id).populate("author", "email username"))
    .then((populatedSong) => {
      console.log("Proyecto creado exitosamente:", populatedSong);
      res.json({
        message: "proyecto creado exitosamente",
        project: populatedSong,
      });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

router.put("/:projectId", (req, res) => {
  const { projectId } = req.params;

  Project.findById(projectId, (err, project) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (project.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para realizar esta acción" });
    }
    Project.findByIdAndUpdate(projectId, req.body, { new: true })
      .then((updatedSong) => {
        res.json(updatedSong);
      })
      .catch((error) => res.status(500).json({ error: error.message }));
  });
});

router.delete("/:projectId", (req, res) => {
  const { projectId } = req.params;

  Project.findById(projectId, (err, project) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (project.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para realizar esta acción" });
    }
    project.remove((err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json({ message: "Proyecto eliminado exitosamente" });
    });
  });
});

module.exports = router;
