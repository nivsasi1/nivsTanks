const express = require('express');
const router = express.Router()


const { handleAddTank, handleTanks } = require("../controllers/car.js")

router.get("/tanks", handleTanks);
router.post("/addTank", handleAddTank);


module.exports = router;