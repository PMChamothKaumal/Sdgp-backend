const express = require('express')
const router = express.Router();


const { TeaEstateOwner_Validation, TeaTransporter_Validation, Register_TeaEstateOwners } = require('../controller/backend-controller')

router.post('/TeaEstateOwner_Validation', TeaEstateOwner_Validation)
router.post('/TeaTransporter_Validation', TeaTransporter_Validation)
router.post('/Register_TeaEstateOwners', Register_TeaEstateOwners)

module.exports = router;