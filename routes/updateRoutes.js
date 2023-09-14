const {Router}=require('express');
const { updatePasswordControllers } = require('../controllers/updatePasswordControllers');
const router=Router()

router.post('/',updatePasswordControllers);

module.exports=router;