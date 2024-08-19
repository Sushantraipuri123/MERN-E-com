const db = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports = {
    // User registration logic
    createUser: async (req, res) => {
        try {
            const { name, email, password, phoneNumber, role, addresses,storeName,gstNo } = req.body;
                //=== checking if user exists or not ===
            const exsistingUser = await db.findOne({email:req.body.email});
            if(exsistingUser){
                return res.status(400).json({
                    success:false,
                    status:400,
                    message:"Email already exists",
                })
            }
            // Creating a new user
            const user = await db.create({
                name,
                email,
                password,
                phoneNumber,
                role: role || 'user',
                addresses, 
                storeName,
                gstNo
            });

            res.status(200).json({
                success: true,
                status: 200,
                message: "User Created",
                body: user,
                token : await user.generateToken(),
                userId : user._id.toString()
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                status: 500,
                message: "User creation failed",
                error: error.message,
            });
        }
    },

   // User login logic
   loginUser: async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Received login request:", email);

        // Ensure the password is selected from the database
        const userExist = await db.findOne({ email }).select('+password');
        if (!userExist) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Invalid Credentials",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, userExist.password);
        console.log("Password match:", isPasswordMatch);

        if (isPasswordMatch) {
            // Generate token
            const token = await userExist.generateToken();

            return res.status(200).json({
                success: true,
                status: 200,
                message: "Login Successful",
                token: token,
                userId: userExist._id.toString(),
            });
        } else {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Invalid Credentials",
            });
        }
    } catch (error) {
        console.error("Error during login:", error.message);
        return res.status(500).json({
            success: false,
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}
}
