const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");
const registerStudent = async (req, res) => {
    try {

        const { name, email, password, department } = req.body;

        const studentExists = await Student.findOne({ email });

        if (studentExists) {
            return res.status(400).json({
                message: "Student already exists"
            });
        }

        

        const salt = await bcrypt.genSalt(10);

const hashedPassword = await bcrypt.hash(password, salt);

const student = await Student.create({
    name,
    email,
    password: hashedPassword,
    department
});
        res.status(201).json({
            message: "Student registered successfully",
            student
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }
};
const loginStudent = async (req, res) => {

    try {

        const { email, password } = req.body;

        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: student._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = { registerStudent, loginStudent };