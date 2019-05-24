var http = require('http');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Register = require('./routes/register');
const Login = require('./routes/login');
const CreatePost = require('./routes/createpost');
const cors = require('cors');

const UserRegister = require('./routes/userregister');
const UserLogin = require('./routes/userlogin');
const UserCreatePost = require('./routes/usercreatepost');


const MongoClient = require('mongodb').MongoClient;

var path = require('path');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/register',Register);
app.use('/login', Login);
app.use('/createpost', CreatePost);

app.use('/userregister', UserRegister);
app.use('/userlogin', UserLogin);
app.use('/usercreatepost', UserCreatePost)

// app.use((req, res, next) => {

//   res.setHeader(
//     "auth"
//   );
// });




app.use(express.static(path.join(__dirname, 'public')));

app.get('*' , (req, res)=>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


// const uri = "mongodb+srv://basant:iloveyoumom09876)@cluster0-4llz2.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("sajilosewa").collection("devices");
//   // perform actions on the collection object
//   if(err){
//     console.log(err);
//   }else{
//     console.log("mongodb is connected ");
//   }

//   var ins = {name: 'giri' , email:'giriraj@gmail.com'};

//   collection.insertOne(ins, function(err, res){
//     console.log("data inserted");
//   });


//   client.close();
  
// });



// mongoose.connect('mongodb://localhost/sajilosewa')
// .then(() => console.log('Connected to MongoDB...'))
//   .catch(err => console.error('Could not connect to MongoDB...'));




mongoose.connect('mongodb+srv://basant:iloveyoumom09876)@cluster0-4llz2.mongodb.net/test?retryWrites=true')
.then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));