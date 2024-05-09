const db = require("../config/db");

const getStudents = async (req, res) => {
    try {
        const [data] = await db.query("SELECT * FROM task");
        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No task records found",
            });
        }
        res.status(200).json({
            success: true,
            message: "All task records",
            totalStudents: data.length,
            data,
        });
    } catch (error) {
        console.error("Error in Get All Task API:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

const getStudentByID = async (req, res) => {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid task ID",
            });
        }
        const [data] = await db.query("SELECT * FROM task WHERE id=?", [studentId]);
        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No task found with the provided ID",
            });
        }
        res.status(200).json({
            success: true,
            message: "Task details",
            data: data[0],
        });
    } catch (error) {
        console.error("Error in Get Task by ID API:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

const createStudent = async (req, res) => {
    try {
        const { Title, Description, Status } = req.body;
        if (!Title || !Description || !Status) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields",
            });
        }
        const [data] = await db.query("INSERT INTO task (Title, Description, Status) VALUES (?, ?, ?)", [Title, Description, Status]);
        res.status(201).json({
            success: true,
            message: "New task created",
            data: {
                id: data.insertId,
                Title,
                Description,
                Status,
            },
        });
    } catch (error) {
        console.error("Error in Create Task API:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const { Title, Description, Status } = req.body;
        if (!studentId || !Title || !Description || !Status) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields",
            });
        }
        const [data] = await db.query("UPDATE task SET Title=?, Description=?, Status=? WHERE id=?", [Title, Description, Status, studentId]);
        if (data.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "No task found with the provided ID or no changes applied",
            });
        }
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
        });
    } catch (error) {
        console.error("Error in Update Task API:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid task ID",
            });
        }
        await db.query("DELETE FROM task WHERE id=?", [studentId]);
        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.error("Error in Delete Task API:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

module.exports = { getStudents, getStudentByID, createStudent, updateStudent, deleteStudent };
