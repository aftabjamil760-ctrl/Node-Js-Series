const express = require('express')
const router = express.Router()
const Student = require('../models/students.model')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }
})

const fileFiler = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('only images are allowed!'), false)
    }
}

const upload = multer({
    storage: storage,
    fileFiler: fileFiler,
    limit: {
        fileSize: 1024 * 1024 * 3 // 3mb
    }
})

//http://localhost:5000?page-1&limit - 5


//get all Students
router.get('/', async (req, res) => {
    try {
        const search = req.query.search || ''
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 3
        const skip = (page - 1) * limit
        const query = {
           $or: [
    { first_name: { $regex: search, $options: 'i' } },
    { last_name: { $regex: search, $options: 'i' } }
]

        }
                const total = await Student.countDocuments(query)

        const students = await Student.find(query).skip(skip).limit(limit)
        res.json({
            total,
            page,
            limit,
            totalPage: Math.ceil(total / limit),
            students
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//get a single student
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        if(!student) return res.status(404).json({message: 'Student not found'})
        res.json(student)
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//add new student
router.post('/', upload.single('profile_pic'), async (req, res) => { // use post for add new data
    try {
        // const newStudent = await Student.create(req.body)
        const student = new Student(req.body)
        if (req.file) {
            student.profile_pic = req.file.filename
        }
        const newStudent = await student.save()
        res.status(201).json(newStudent)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
// update a student
router.put('/:id', upload.single('profile_pic'), async (req, res) => {
    try {
        const existingStudent = await Student.findById(req.params.id);

        if (!existingStudent) {
            // اگر student نہیں ملا تو نئی image delete کر دیں
            if (req.file && req.file.filename) {
                const filePath = path.join('./uploads', req.file.filename);
                fs.unlink(filePath, (err) => {
                    if (err) console.log('failed to delete image: ', err);
                });
            }
            return res.status(404).json({ message: 'Student not found' });
        }

        // اگر نئی file آئی ہے تو پرانی delete کر دیں
        if (req.file) {
            if (existingStudent.profile_pic) {
                const oldimagePath = path.join('./uploads', existingStudent.profile_pic);
                fs.unlink(oldimagePath, (err) => {
                    if (err) console.log('Failed to delete old image: ', err);
                    else console.log('Old image deleted successfully');
                });
            }
            req.body.profile_pic = req.file.filename;
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedStudent);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//delete student
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id)
        if (!student) return res.status(404).json({ message: 'Student not found' })
        if (student.profile_pic) { //also delete img from upload folder
            const filePath = path.join('./uploads', student.profile_pic)
            fs.unlink(filePath, (err) => {
                if(err) console.log('failed to delete: ', err)
            })
        }
         res.json({message: 'Student deleted successfully'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
module.exports = router