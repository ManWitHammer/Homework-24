const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()

const port = process.env.PORT || 1487
const app = express()


const createPath = (folder, page, ext) =>
	path.resolve(__dirname, folder, `${page}.${ext}`)

// middlewares:
app.use(express.static(__dirname + '/pages'))
app.use((req, res, next) => {
	console.log(req.path)
	console.log(req.method)
	next()
})

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

const UsersModel = mongoose.model('users', UserSchema)

mongoose.connect(process.env.URI)

app.get('/', (req, res) => {
	res.sendFile(createPath('pages', 'index', 'html'))
})
app.get('/main', (req, res) => {
	res.redirect('/')
})
app.get('/page1', (req, res) => {
	res.sendFile(createPath('pages', 'page1', 'html'))
})
app.get('/page2', (req, res) => {
	res.sendFile(createPath('pages', 'page2', 'html'))
})
app.get('/usersData', async (req, res) => {
    try {
        const users = await UsersModel.find().sort({_id: -1})
        res.send(users)
    } catch (error) {
        console.log(error)
    }
})
app.use(express.json())
app.post('/usersData', async (req, res) => {
    const {name, email, password} = req.body
  
    try {
        const user = new UsersModel({
        name,
        email, 
        password
        })
        
        await user.save()
        
        res.send(user)
        
    } catch (error) {
        console.log(error)
    }
})
app.patch('/usersData/:id', async (req, res) => {
    try {
      const user = await UsersModel.findById(req.params.id)
      user.name = req.body.name
      await user.save()
      res.send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  
  });
app.use((req, res) => {
    res.status(404).sendFile(createPath('pages', 'error', 'html'))
})

app.listen(port, () => {
    console.log(`Server is running. Port is ${port}`)
})