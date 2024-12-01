const express = require('express')
const mongoose=require("mongoose");
require('dotenv').config();  
const path=require("path"); 
const axios =require('axios');
const bodyParser = require('body-parser');
const ejsMate=require("ejs-mate");

const app = express();
const port = process.env.port || 3000

app.set('views', path.join(__dirname, 'views'));         //ejs
app.set("view engine","ejs"); 

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('ejs', ejsMate);

const User=require('./models/user')

//database connection
const dbUrl=process.env.MONGO_ATLAS_URL;
main().catch(err => console.log(err)); 
   
async function main() {
  await mongoose.connect(dbUrl);
}

//twitter API call function using username
async function fetchData(username) {
      try {
        const response = await axios.get(`https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics`,{
            headers: {
              Authorization: `Bearer ${process.env.token}`
            }
          }); 
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
       }
     }

//get username API
app.get('/', function (req, res) {
  res.render("store.ejs")

})

//display Data API
app.get('/display', async function(req, res) {
  const allUsers = await User.find({});
    res.render("display.ejs",{allUsers});

})

//data stored in database using response of twitter api
app.post("/username" ,async(req,res)=>{
        const username=req.body.username;
        const data=await fetchData(username);
        if(data){
          const userData={
              name:data.data.name,
              username:data.data.username,
              followers:data.data.public_metrics.followers_count,
              following:data.data.public_metrics.following_count,
              tweets:data.data.public_metrics.tweet_count,
              likes:data.data.public_metrics.like_count,
              id:data.data.id
          }
          console.log(userData);
          const user=new User(userData);
          await user.save();
          // res.json({statusCode:200,message:"User data Stored"})
          console.log("Data is saved");
          res.redirect("/display");
         
        }
        else{
          res.json({statusCode:400,message:"API is not working"})
        }
     
})

//server started
app.listen(port,(req,res)=>{
    console.log(`Server is working ${port}`)
})