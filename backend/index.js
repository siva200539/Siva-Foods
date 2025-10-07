const express=require("express")
const cors= require("cors")
const jwt=require('jsonwebtoken');
const  bcrypt=require('bcryptjs');

const app=express()
const port=7001
app.use(cors())
app.use(express.json())

const users = [];  // To store no of users

const secretKey = 'try-a-pwd';

app.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    const hashedPassword= await bcrypt.hash(password,10);
    users.push({username,password:hashedPassword});
    res.sendStatus(201);
    console.log("User registered Successfully")
})
app.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    const user=users.find((us)=>us.username===username)
    if(user){
       const isValiduser=await bcrypt.compare(password,user.password,);
       if(isValiduser){
            const token=await jwt.sign({username},secretKey,{expiresIn:'1hr'})
            res.json({ token });
            console.log("login Successfully");
       }else{
            res.status(401).json({message:'Invalid Credential,since Password Does not match'})
       }

    }else{
      res.status(401).json({message:'Invalid Credential,since User Not Found,SignUp to Login plz'})
    }
})

const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = "mongodb+srv://siva2005bharathi_db_user:test1@cluster0.iectls7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const food=client.db("demo").collection("food");
    const fdata=client.db("demo").collection("fdata") 

    app.post("/upload",async(req,res)=>{
         const data=req.body
         const result=await food.insertOne(data)
         res.send(result)
    })
    app.post("/upload1",async(req,res)=>{
         const data=req.body
         const result=await fdata.insertMany(data)
         res.send(result)
    })
//get
    app.get("/getall",async(req,res)=>{
        const data=food.find()
        const result=await  data.toArray()
        res.send(result)
    })
    //getone
    app.get("/getone/:id",async(req,res)=>{
        const id=req.params.id
        const objid={_id:new ObjectId(id)};
        const result=await food.findOne(objid);
        res.send(result)
    })
     app.get("/getone/:id",async(req,res)=>{
        const id=req.params.id
        const objid={_id:new ObjectId(id)};
        const result=await fdata.findOne(objid);
        res.send(result)
    })
    app.get("/getal",async(req,res)=>{
        const data=fdata.find()
        const result=await  data.toArray()
        res.send(result)
    })
     app.delete("/delete/:id",async(req,res)=>{
        const id=req.params.id
        const objid={_id:new ObjectId(id)};
        const result=await food.deleteOne(objid);
        res.send(result)
    })
    app.delete("/erase/:id",async(req,res)=>{
        const id=req.params.id
        const objid={_id:new ObjectId(id)};
        const result=await fdata.deleteOne(objid);
        res.send(result)
    })
   
app.patch("/editfood/:id",async(req,res)=>{
      const id=req.params.id;
      const updatedata=req.body;
      const filter={_id:new ObjectId(id)};
      const updateDne={
        $set:{
          ...updatedata
        },
      }
        const options={upsert:true};
        const result=await food.updateMany(filter,updateDne,options);
        res.send(result);
    })
     app.patch("/changefood/:id/:id",async(req,res)=>{
      const id=req.params.id;
      const updatecoursedata=req.body;
      const filter={_id:new ObjectId(id)};
      const updateDne={
        $set:{
          ...updatecoursedata
        },
      }

        const options={upsert:true};
        const result=await fdata.updateMany(filter,updateDne,options);
        res.send(result);
    })
     await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);
app.listen(port,()=>{
    console.log("Running on Port",port)
})