const express = require('express');
const router = express.Router();

const reports = require("../models/reports.js");

router.get('/', (req, res) => reports.getReports(res, req));
router.post('/', (req, res) => reports.addReport(res, req.body));
// router.put('/', (req, res) => reports.updateReport(res, req.body));
// router.delete('/', (req, res) => reports.deleteReport(res, req.body));


module.exports = router;
