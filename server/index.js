const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
require('dotenv').config()
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const multer = require('multer')
const path = require('path')


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true })
        console.log(`mongodb connected: ${conn.connection.name}`)
    } catch (error) {
        console.log(error.message)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    }, 
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({storage: storage})

app.post('/api/upload', upload.single('file'), (req, res) =>{
    res.status(200).json('file had been uploaded')
})

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/categories', categoryRoute)


app.listen(PORT, ()=> {
    connectDB()
    console.log(`server listening on http://localhost:${PORT}`)
})