import User from "../models/userModel.js";
import bcrypt from "bcryptjs"


export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        if (!name || !email || !password) {
            res.status(400).json({ error: "Please fill all the fields" });
        }

        if (password.length < 6) {
            res.status(400).json({ error: "Password must be at least 6 characters" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
        }

        // Password hashing-------
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if (newUser) {
            res.status(201).json({ message: "User registered successfully" });
        } else {
            res.status(400).json({ error: "User registration failed" });
        }


    } catch (error) {

        console.log("Error in registerController", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}


// ----User login function---------------------------
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if(!user){
            res.status(400).json({error:"User not found"});
        }

        const checkPassword = await bcrypt.compare(password,user.password);

        if(!checkPassword){
            res.status(400).json({error:"Invalid credentials"});
        }

        

        


    } catch (error) {
        
        console.log("Error in loginController", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
