const express = require('express');
const mongoose = require('mongoose');

const connection=mongoose.connect('mongodb+srv://admin:1fBT5oDa5PAr1kKh@cluster0-nnkzp.mongodb.net/Student?retryWrites=true&w=majority', {useNewUrlParser: true});
connection.then(()=>console.log("Database connection done"));
// password: 701fBT5oDa5PAr1kKh70
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
    }).then(result =>(res.render("booking_page"))).catch(err =>{console.log(err)});
    let hallStudent = req.body.hallSelect;
    let roomStudent = req.body.roomNumberSelect;
    
    const filter = { studentID: id };
    const update = { studentHall: hallStudent, studentRoom: roomStudent };
    
    res.render("profile");
    Student.findOneAndUpdate(
        {"studentID": id},
        { $set: {studentHall: hallStudent, studentRoom: roomStudent}}
        
    ).then(result =>(res.render("profile"))).catch(err =>{console.log(err)});
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
    console.log("http://localhost:5000 \nServer successfully, running at port 5000");
})