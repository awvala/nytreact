const router = require("express").Router();
const articleRoutes = require("./books");

// article routes
router.use("/articles", articleRoutes);

module.exports = router;