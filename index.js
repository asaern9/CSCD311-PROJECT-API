const express = require('express');
const mongoose = require('mongoose');

const connection=mongoose.connect('mongodb://localhost:27017/Student_login', {useNewUrlParser: true});
connection.then(()=>console.log("Database connection done"));

const studentSchema = mongoose.Schema({
    studentID: String,
    studentPIN: String,
    studentGender: String,
    StudentEmail: String,
    studentName: String,
})

const hallSchema = mongoose.Schema({
    hallName: String,
})

const Student = mongoose.model("Student_login", studentSchema);

const hall_db = mongoose.model("hall_db", hallSchema);

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/views'))


app.get("/",(req,res)=>{
    res.render("index")
});


app.post("/login",(req,res)=>{
    let id = req.body.username;
    let pin = req.body.password;
    Student.findOne({
        studentID: id,
        studentPIN: pin,
    }, (err, user)=>{
        if(err){
            
            console.log(err);
            return res.status(500).send("505");
        }
        if(!user){
            alert("Invalid credentials");
            return res.status(400).render("index");
        }

        return res.render("booking_page", {data: user});
    })
});


app.post("/booking",(req,res)=>{
    
})




app.listen(5000,()=>{
    console.log("Server successfully, running at port 5000");
})