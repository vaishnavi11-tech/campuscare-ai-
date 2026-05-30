const isAdmin = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admin only."
        });
    }

    next();
};

const isFaculty = (req, res, next) => {

    if (req.user.role !== "faculty") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Faculty only."
        });
    }

    next();
};

const isStudent = (req, res, next) => {

    if (req.user.role !== "student") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Student only."
        });
    }

    next();
};

module.exports = {
    isAdmin,
    isFaculty,
    isStudent
};