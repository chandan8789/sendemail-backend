const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require("path");
const cors = require('cors')
const PORT = 4000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "build")));

//DB Connection
mongoose.connect('mongodb+srv://alok:alok123@cluster0.yqdnixw.mongodb.net/ecomerce',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
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
app.post("/api/createuser", async(req, res)=>{
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
app.get("/api/readalluser", async(req, res)=>{
    try {
            const userData = await User.find({})
            res.send(userData)

    } 
    catch (error) {
        console.log(error); 
    }
})

//read single data only by ID
app.get("/api/read/:id", async(req, res)=>{
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
app.put("/api/updateuser/:id", async(req, res)=>{
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate({_id: id}, req.body, {new:true})
        res.send(user)
    } catch (error) {
        console.log(error); 
    }
})

//deleted user or data
app.delete("/api/deleteuser/:id", async(req, res)=>{
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete({_id: id})
        res.send(user)
    } catch (error) {
        console.log(error); 
    }
})


app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
  
  app.get("*", (req, res) => {
    res.status(404).json({
      status: "success",
      message: "Url not found",
    });
  });
  app.post("*", (req, res) => {
    res.status(404).json({
      status: "success",
      message: "Url not found",
    });
  });
  

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})