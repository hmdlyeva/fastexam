const router = require("express").Router();
const control = require("../controller/controller");

router.get("/users", control.getAllData);
router.delete("/users/:id", control.deleteData);
router.post("/users", control.postData);


module.exports = router;
