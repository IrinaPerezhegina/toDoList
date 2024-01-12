/** @format */

const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/tasks", require("./tasks.routes"));

module.exports = router;
