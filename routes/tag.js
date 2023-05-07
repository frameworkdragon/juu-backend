const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require("../middlewares/auth");

const {
  activeTag,
  clearTag,
  attachTagToUser,
} = require("../controller/tagController");

// Tag
router.route("/activeTag").get(activeTag);

router.route("/clearTag").get(clearTag);
router.route("/attachTagToUser").post(attachTagToUser);

module.exports = router;
