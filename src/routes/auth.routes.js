const express = require('express');

const authRouter = express.Router();



const authController = require("../controller/auth.controller.js");
/**   
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */   

authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @desc Login user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUserController);

module.exports = authRouter;

