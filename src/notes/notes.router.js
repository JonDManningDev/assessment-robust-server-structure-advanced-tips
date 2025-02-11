const router = require("express").Router({ mergeParams: true });
const controller = require("./notes.controller");
const ratingsController = require("../ratings/ratings.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:noteId/ratings/:ratingId").get(controller.noteExists, ratingsController.read).all(methodNotAllowed);

router.route("/:noteId/ratings").get(controller.noteExists, ratingsController.list).all(methodNotAllowed);

router
  .route("/:noteId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

module.exports = router;
