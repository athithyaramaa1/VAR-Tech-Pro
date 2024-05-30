const express = require("express");
const { registerUser, loginUser, testController, forgotPasswordController } = require("../controllers/userController");
const {validateToken, isAdmin} = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser)
router.post("/forgot-password", forgotPasswordController)
router.post('/test', validateToken, isAdmin, testController)

router.get('/user-auth', validateToken, (req, res)=>{
    res.status(200).send({user:true})
})

router.get('/admin-auth', validateToken,isAdmin, (req, res)=>{
    res.status(200).send({admin:true})
})

module.exports = router;