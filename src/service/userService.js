const user = require('../model/user');
const {generateToken} = require("../config/generateToken");
const bcrypt = require("bcrypt");



//create 

const registerUser = async (req, res, next) =>{
    try {
        const {name, email, password } = req.body;
        let payload = {name, email, password }

        if(!name || !email || !password){
            return res.status(400).json({message:"Missing required fields"})
        }
        const userData = await user.findOne({email});
        if (userData){
            return res.status(400).json({message:"Email already registered"})
        }
        // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10); // Generate a salt with cost factor 10
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
        const newUser = new user({
            name,
            email,
            password: hashedPassword, // Save the hashed password
        });
        await newUser.save();
        const responsePayload = { 
                                  _id: newUser._id,
                                  name: newUser.name,
                                  email: newUser.email, 
                                  avatar: newUser.avatar,
                                  token: generateToken(user._id) };

        return res.status(201).json({ message: "User created successfully", user: responsePayload });

    } catch (error) {
        throw Error(error)
    }
    
};
const loginUser = async (req, res, next) =>{
    try {
        
        const {email, password} = req.body;
        let payload = {email, password}

        if( !email || !password){
            return res.status(400).json({message:"Provide email and password"})
        }
        const userData = await user.findOne({email});
        if (!userData){
            return res.status(400).json({message:"Email does not exist"})
        }
        const isMatch = await bcrypt.compare(password,userData.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const responsePayload = { 
                                  _id: userData._id,
                                  name: userData.name,
                                  email: userData.email, 
                                  avatar: userData.avatar,
                                  token: generateToken(userData._id) };
        return res.status(201).json({ user: responsePayload });

    } catch (error) {
        throw Error(error)
    }
    
};

const resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;

        // Validate input
        if (!email || !newPassword) {
            return res.status(400).json({ message: "Email and new password are required" });
        }

        // Find user by email
        const userData = await user.findOne({ email });
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password
        userData.password = hashedPassword;
        await userData.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting password:", error.message);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};



module.exports = {registerUser, loginUser, resetPassword}