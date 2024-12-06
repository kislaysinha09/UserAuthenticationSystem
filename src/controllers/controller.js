const userService = require("../service/userService");

const userRegisterController = async (req,res) => {
    await userService.registerUser(req, res)
}

const loginController = async (req,res) => {
    await userService.loginUser(req, res)
}

const passResetController = async(req,res) => {
    await userService.resetPassword(req, res)
}


module.exports = {userRegisterController,loginController, passResetController}