const express = require("express");
const router = express.Router();
const multer = require("multer");
const { verify } = require("../controllers/Verify.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/verify", (req, res) => {
  verify(req, res);
});

module.exports = router;
