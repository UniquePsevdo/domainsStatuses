const express = require('express');
const apiRouter = express.Router();
const {getDomainsStatuses} = require('../controllers/domainController');

apiRouter.post('/get-check-id', getDomainsStatuses);

module.exports = apiRouter;