const router = require("express").Router();
const multer = require("multer");
const { analyzePhoto } = require("../controllers/aiController");
const { authMiddleware, donorOnly } = require("../utils/auth");

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/analyze-photo",
  authMiddleware,
  donorOnly,
  upload.single("photo"),
  analyzePhoto,
);

module.exports = router;
