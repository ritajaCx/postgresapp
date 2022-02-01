const {Client} = require("pg")
const express = require ("express")
var app = express()
var port = process.env.PORT || 7077

const client = new Client({
    host : "127.0.0.1:3306",
    database : "student",
    port : 5432,
    user : "postgres",
    password : "styx97"

})

//connection
client.connect()

app.get("/", function(req,res){
    res.send("Welcome to database app using postgres")
})

//create table
app.get("/create", function(req,res){
    
    var sql1= "create table subject (name varchar(300), staff varchar(300) );"
    client.query(sql1, function(err){
        if(err){
            res.send(err)
            return
        }
        res.send("table created !")
    })
    
})

//insert data into table
app.get("/insert", function(req,res){

    var sql2= "insert into subject (name,staff) values ('English','SJ');"
    client.query(sql2, function(err){
        if(err){
            res.send(err)
            return
        }
        res.send("1 row inserted successfully!")
    })
    
})


//display table data
app.get("/display", function(req,res){

    var sql3 = "select * from subject;"
    client.query(sql3, function(err, result){
        if(err)
        {
            res.send("error in select query", err)
            return
        }
        var html=""
        if(result.rowCount>0){
           // console.log("displaying table 'Subject' data : ", result.rows);
            for (var tempRow of result.rows){
                html = html + tempRow.name + "</br>";
                res.send(tempRow)
            }
        }
        else{
            res.send(err)
            return
        }
    })

})

//update data
// app.get("/update", function(req,res){

//     var sql4= "update subject set staff='RD' where name='English';"
//     client.query(sql4, function(err){
//         if(err){
//             res.send(err)
//             return
//         }
//         res.send("1 row updated successfully!")
//     })
    
// })

app.listen(port, ()=>console.log("server running at",port))
