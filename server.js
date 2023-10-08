const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()
const cors = require('cors')
const PORT = 4000

app.use(cors())
app.use(express.json())

//DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/mernstack_crud')
.then(()=>{
    console.log("Database Connected Successfully...");
})
.catch((error)=>{
    console.log(error);
})

//user schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    }, 
    password:{
        type: String,
        require: true
    },
}, {timestamps: true})

//model
const User = mongoose.model("user", userSchema)


//create user post
app.post("/createuser", async(req, res)=>{
    try {
        const bodyData = req.body;
        const user = new User(bodyData)
        const userData = await user.save()
        res.send(userData)
        } 
    catch (error) 
    {
        console.log(error); 
    }
})

//read all user means get data
app.get("/readalluser", async(req, res)=>{
    try {
            const userData = await User.find({})
            res.send(userData)

    } 
    catch (error) {
        console.log(error); 
    }
})

//read single data only by ID
app.get("/read/:id", async(req, res)=>{
    try {
           const id=req.params.id;
           const user = await User.findById({_id: id})
           res.send(user)
    } 
    catch (error) {
        console.log(error); 
    }
})

//update user or data
app.put("/updateuser/:id", async(req, res)=>{
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate({_id: id}, req.body, {new:true})
        res.send(user)
    } catch (error) {
        console.log(error); 
    }
})

//deleted user or data
app.delete("/deleteuser/:id", async(req, res)=>{
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete({_id: id})
        res.send(user)
    } catch (error) {
        console.log(error); 
    }
})


app.listen(PORT, ()=>{
    console.log(`The server is running port no... ${PORT}`);
})