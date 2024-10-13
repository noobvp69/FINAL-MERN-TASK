const express = require('express');
const app = express();

// for parsing the data
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//for storage related purposes
const cors = require('cors')
app.use(cors());

// for database connection and other purposes

const MongoClient = require('mongodb').MongoClient;

// Setting different port connection for the database
const port = 3001;

const {ObjectId} = require('mongodb')
const url = 'mongodb://localhost:27017/students';
const dbname = 'students'
let db;

MongoClient.connect(url)
    .then( async client =>{console.log("Connected to MongoDB")
    db = client.db(dbname)
    
    app.get('/students', async (req,res) =>{
        try{
            const user = await db.collection('users').find().toArray();
            console.log(user);
            return res.send(user);
        }catch(error){
            return res.status(500).send({message:'Error Displaying the students details'})
            
        }
    })

    app.get('/students/:id',async (req,res) => {
        try {
            const user = await db.collection('users').findOne({_id:new ObjectId(req.params.id)})
            console.log(user);
            res.send(user);
        } catch (error) {
            res.status(500).send({message: 'Error displaying the particular student details.'})
            
        }
        
    })
    app.post('/students', async (req,res) =>{
        try{
            const user = req.body;
            const result = await db.collection('users').insertOne(user);
            console.log(user);
           
            return res.status(201).send({message:'User has successfully submitted the details'});
        }catch(error){
            return res.status(500).send({message:'Error Submitting the students details'});
            
        }
    })
  
   
    app.delete('/students/:id', async (req,res) =>{
        try{
           
            const user = await db.collection('users').deleteOne({_id:new ObjectId(req.params.id)})
            console.log(user);
            res.send(user);
            res.status(201).send({message:'Particular user  Deleted submitted the details'});
        }catch(error){
            res.status(500).send({message:'Error Deleting the student details'});
            
        }
    })

   
    })
    app.listen(port,()=>{ console.log(`listening on ${port}`)})
