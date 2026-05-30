const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerStudent = async (req, res) => {
    try {
        const { name, email, password, department, studentId } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            department,
            studentId,
            role: "student",
        });

        res.status(201).json({
            message: "Student registered successfully",
            user,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            role: user.role,
            name: user.name,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    registerStudent,
    loginStudent,
};