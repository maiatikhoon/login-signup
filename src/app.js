

import express from "express" ;  
import path,{dirname} from "path" ; 
import { fileURLToPath } from "url";  
import bodyParser from "body-parser";
import hbs from "hbs" ;  
const __dirname = dirname(fileURLToPath(import.meta.url)) ; 

import collection from "./db/conn.js" ; 
 

const app = express() ;   

app.use(bodyParser.urlencoded({extended:true})) ; 

const port = process.env.PORT || 3000 ;  

app.use(express.static("public")) ;    

const template_path = path.join(__dirname, "../templates/views") ;   

app.use(express.json());
app.set("view engine", "hbs") ; 
app.set("views", template_path) ; 



app.get("/", (req ,res)=> {
     res.render("login") ; 
})

app.get("/signup", (req ,res)=> {
    res.render("signup") ;      
}) 


app.post("/signup", async(req ,res)=> { 
     
     const data = {
         name: req.body.username , 
         password: req.body.pass , 
     }  

    await collection.insertMany([data]) ; 

    res.render("./home") ; 

}) 


app.post("/login", async(req ,res)=> {
      
    try { 

        const check = await collection.findOne({name: req.body.username}).exec() ; 
        
          if(check.password === req.body.password) {
              res.render("./home") ; 
         } else {
              res.send("wrong password ") ; 
         }
        

    } catch(err) {
            res.send("Wrong details");  
    }
})

app.listen(port , ()=> {
      console.log(`Server is listening on port ${port}`) ; 
})
