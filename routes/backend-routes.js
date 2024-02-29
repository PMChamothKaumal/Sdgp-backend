const express = require('express')
const router = express.Router();


const { TeaEstateOwner_Validation, TeaTransporter_Validation, Register_TeaEstateOwners, Check_Emails, Update_TeaEstateOwners, GetTeastateOwnerDetails } = require('../controller/backend-controller')

router.post('/TeaEstateOwner_Validation', TeaEstateOwner_Validation)
router.post('/TeaTransporter_Validation', TeaTransporter_Validation)
router.post('/Register_TeaEstateOwners', Register_TeaEstateOwners)
router.post('/Check_email_validations', Check_Emails)
router.post('/Update_TeaEstateOwner_Passwords', Update_TeaEstateOwners)
router.get('/Get_TeaEstateOwner_Details', GetTeastateOwnerDetails)

module.exports = router;