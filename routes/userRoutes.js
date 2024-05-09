const express = require('express');
const { getStudents, getStudentByID, createStudent, updateStudent, deleteStudent } = require('../controllers/userController');

// Create router object
const router = express.Router();

// Define routes
router.get('/getall', getStudents); // Get all students list
router.get('/get/:id', getStudentByID); // Get student by ID
router.post('/create', createStudent); // Create student
router.put('/update/:id', updateStudent); // Update student
router.delete('/delete/:id', deleteStudent); // Delete student

module.exports = router;
