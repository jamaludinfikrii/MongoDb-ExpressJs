const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const port = 2001
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/dilizents';

MongoClient.connect(url, (err,db) => {
    console.log('Masuk')
})

app.get('/user' , (req,res)=> {
        var username = req.query.username
        var password = req.query.password
    MongoClient.connect(url, (err,db)=> {    
        userCol = db.collection('users');
        userCol.find({username : username , password : password}).toArray((err1, docs) => {
            db.close(); 
            res.send(docs)
            console.log(docs.length)
        })
    })
})

app.post('/user' , (req,res) => {
    MongoClient.connect(url , (err,db) => {
        var data = req.body
        collection = db.collection('users');
        collection.insertMany( [data] , (err,result) => {
            console.log(result)
            res.send('Insert Success')
        })
    })
})

// app.get('/user' , (req,res)=> {
//     MongoClient.connect(url, (err,db)=> {
//         var userCol = db.collection("users");
//         userCol.find({}).toArray((err1, docs) => {
//             db.close();   
//             res.send('docs')
//         })
//     })
// })


app.listen(port , () => {
    console.log('Server Aktif di Port : ' + port )
})