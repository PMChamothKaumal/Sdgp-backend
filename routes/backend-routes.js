const express = require('express')
const router = express.Router();


const { TeaEstateOwner_Validation, Contact_Factory, GetNotifications, WeeklyReport, PastData, TeaTransporter_Validation, Dispatch_TeaWeight, Check_Emails, Update_TeaEstateOwners, GetTeastateOwnerDetails, NotfyTransporter } = require('../controller/backend-controller')

router.post('/TeaEstateOwner_Validation', TeaEstateOwner_Validation)
router.post('/TeaTransporter_Validation', TeaTransporter_Validation)
router.post('/Dispatch_TeaWeights', Dispatch_TeaWeight)
router.post('/Check_email_validations', Check_Emails)
router.post('/Update_TeaEstateOwner_Passwords', Update_TeaEstateOwners)
router.get('/Get_TeaEstateOwner_Details', GetTeastateOwnerDetails)
router.post('/Notify_transporter', NotfyTransporter)
router.get('/Get_Notifications', GetNotifications)
router.post('/Weekly_Report', WeeklyReport)
router.post('/Get_Past_Data', PastData)
router.post('/Contact_Factory', Contact_Factory)
module.exports = router;