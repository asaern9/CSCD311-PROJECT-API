const express = require('express');
const mongoose = require('mongoose');

const connection=mongoose.connect('mongodb+srv://admin:1fBT5oDa5PAr1kKh@cluster0-nnkzp.mongodb.net/Student?retryWrites=true&w=majority', {useNewUrlParser: true});
connection.then(()=>console.log("Database connection done"));
// password: 1fBT5oDa5PAr1kKh
// username: admin

const studentSchema = mongoose.Schema({
    studentID: String,
    studentPIN: String,
    studentGender: String,
    studentEmail: String,
    studentName: String,
    studentHall: String,
    studentRoom: String,
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

/*Student.create({
    "studentID": "10687636",
    "studentPIN": "7894",
    "studentGender": "Male",
    "studentEmail": "asaern9@gmail.com",
    "studentName": "Asare Kwabena Ernest",
    "studentHall": "Akuafo Hall",
    "StudentRoom": "A001"
    
});*/

app.get("/",(req,res)=>{
    res.render("index")
});


app.post("/login",(req,res)=>{
    let id = req.body.username;
    let pin = req.body.password;
    Student.findOne({
        studentID: id,
        studentPIN: pin,
    }).then(result =>(res.render("booking_page"))).catch(err =>{console.log(err)})
    let hallStudent = req.body.hallSelect;
    let roomStudent = req.body.roomNumberSelect;
    
    Student.updateOne(
        {"studentID": id},
        { $set: {studentHall: hallStudent, studentRoom: roomStudent}}
        
    );
    console.log(hallStudent);
    console.log(roomStudent);
   
  /*  let studentHall = new Student({
        Studenthall: hallStudent,
        Studentroom: roomStudent,
    }).save()*/
    
});

app.get("/profile",(req,res)=>{
    res.render("profile")
})



app.listen(5000,()=>{
    console.log("Server successfully, running at port 5000");
})