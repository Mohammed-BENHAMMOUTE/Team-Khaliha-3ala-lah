var express = require('express');
var router = express.Router();

//controllers
let {
  pingPong,
  allVehicles,
  registerVehicle,
  deleteVehicle,
  allCustomers
} = require("../controllers/vehiclesController");

/* GET ping (testing ). */
router.get('/ping', pingPong);

/* GET customers (get customers list ). */
router.get('/customers/all', allCustomers);

/* GET /api/vehicles/all (list all registered vehicles) */
router.get("/all", allVehicles);

/* POST /api/vehicles/add (register a vehicle) */
router.post("/add", registerVehicle);

/* DELETE /api/vehicles/:license (delete a vehicle) */
router.delete("/:license", deleteVehicle);

module.exports = router;
