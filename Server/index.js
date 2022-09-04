const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


 const uri = "mongodb+srv://mehadi:mehadi10712@programinighero.o6s5hxf.mongodb.net/?retryWrites=true&w=majority"
 const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run(){
     try{
         await client.connect();
         const userCollection = client.db('jekonoName').collection('user');

         //Add new user that means A user add into database and data get from frontend'
         app.post('/user', async(req,res)=>{
            const newUser = req.body;
            console.log('adding new user', newUser)
            const result = await userCollection.insertOne(newUser);
            res.send(result)
         })


         //Get all user data from database using API

         app.get('/user', async(req,res)=>{
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
         });

        //Get user By id

        app.get(`/user/:id`, async(req,res) => {
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await userCollection.findOne(query);
            res.send(result);

        });

        //update user

        app.put(`/user/:id`, async(req, res ) => {
            const id = req.params.id;
            const updateUser = req.body;
            const query = {_id: ObjectId(id)};
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updateUser.name,
                    email:updateUser.email,
                }
                
            }
            const result = await userCollection.updateOne(query, updateDoc,options);
            res.send(result);
        })

         // Delete User

         app.delete(`/user/:id`, async(req,res) =>{
            
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result);
         })
         
        
     }finally{


     }
     
 }
 run().catch(console.dir); //I make a mistake in there

 //const users = [
//     { id: 1, name: 'Sabana', email: 'sabana@gmail.com', phone: '0178888888' },
//     { id: 2, name: 'Shabnoor', email: 'Shabnoor@gmail.com', phone: '0178888888' },
//     { id: 3, name: 'Suchorita', email: 'Suchorita@gmail.com', phone: '0178888888' },
//     { id: 4, name: 'suchonda', email: 'suchonda@gmail.com', phone: '0178888888' },
//     { id: 5, name: 'srabonti', email: 'srabonti@gmail.com', phone: '0178888888' },
//     { id: 6, name: 'sabila', email: 'sabila@gmail.com', phone: '0178888888' },
//     { id: 7, name: 'sohana', email: 'sohana@gmail.com', phone: '0178888888' },
// ]

// app.get('/',(req, res) => {
//     res.send('Hello from my personal Smarty')
// })

// app.get('/users', (req, res) =>{
//     res.send(users);
// });

// app.get('/users/:id',(req, res) =>{
//     console.log(req.params)
//     const id = parseInt(req.params.id)
//     const user = users.find(u=> u.id === id);
//     res.send(user)

// })

app.get('/', (req, res) =>{
    res.send('Running My Node CRUD Server');
});

app.listen(port, ()=> {
    console.log('listening on port',port)
})