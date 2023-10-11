

import mongoose, { Schema, model, mongo } from "mongoose"; 


mongoose.connect("mongodb://127.0.0.1:27017/LoginSignup")

.then(()=> {
     console.log("mongodb connected ") ; 
}) 
.catch( (err)=> {
      console.log("failed to connnect") ; 
}) ;


const loginSchema = new mongoose.Schema( {
      name : {
         type: String , 
         required: true 
      } , 

      password : {
          type: String ,  
          require: true ,
      } 
})


const collection  = new mongoose.model("LoginCollection1", loginSchema) ; 




export default collection ; 