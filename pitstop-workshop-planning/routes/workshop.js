var express = require('express');
var router = express.Router();

//controllers
let {
  pingPong,
  allVehicles,
  allJobsDay,
  allJobs,
  scheduleJob,
  deleteMaintenanceJob,
  completeJob,
  jobDetails
} = require("../controllers/workshopController");

/* GET users listing. */
router.get('/ping', pingPong);

/* GET vehicles (get vehicles list ). */
router.get('/vehicles/all', allVehicles);

/* GET maintenance jobs for a specific day */
router.get('/jobs/all/:date', allJobsDay);

/* GET maintenance jobs  */
router.get('/jobs/all', allJobs);

/* GET maintenance job details  */
router.get('/jobs/:id', jobDetails);

/* POST schedule a maintenance job */
router.post('/jobs/schedule', scheduleJob);

/* DELETE delete a maintenance job  */
router.delete('/jobs/:id', deleteMaintenanceJob);

/* PUT Complete a maintenance job  */
router.put('/jobs/complete/:id', completeJob);

module.exports = router;
