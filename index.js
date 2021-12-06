const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());



//database conection
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'testdb',
    port: 3306
});


//check db connection
db.connect(err=>{
    if(err){
        console.log("err");
    }
    console.log("database connected...");
})


//get all data
app.get('/user',(req,res)=>{
    
    let qr = `select * from user`;
    db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err,'errs');
        }

        if(result.length>0)
        {
            res.send({
                message: 'all users data',
                data: result
            });
        }
    });
});

//get data by id
app.get('/user/:id',(req,res)=>{
    let gid = req.params.id;

    let qr = `select * from user where id = ${gid}`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        if(result.length>0)
        {
            res.send({
                message:'get single data',
                data:result
            });
        }
        else{
            res.send({
                message : 'data not found'
            });
        }
    });
});

//post data
app.post('/user',(req,res)=>{
    console.log(req.body,'post data')

    let fullname = req.body.fullname;
    let email = req.body.email;
    let mobile = req.body.mobile;

    let qr = `insert into user(fullname,email,mobile)
              values('${fullname}' , '${email}' , '${mobile}')`;
    
    console.log(qr,'qr');
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result,result);
        res.send({
            message: 'data inserted!',
        });
    });
});

//update data
app.put('/user/:id',(req,res)=>{

    console.log("update");

    let gid = req.params.id;
    let fullname = req.body.fullname;
    let email = req.body.email;
    let mobile = req.body.mobile;

    let qr =   `update user set fullname= '${fullname}' , email = '${email}' , mobile='${mobile}'
                where id = ${gid}`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message : 'data updated'
        });
    });
});

//delete data
app.delete('/user/:id',(req,res)=>{
    let gid = req.params.id;

    let qr = `delete from user where id = ${gid}`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message : 'data deleted!'
        });
    });
});

app.listen(3000,()=>{
    console.log('server running...');
})