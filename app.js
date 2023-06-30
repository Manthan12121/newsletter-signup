const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https") ;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true }));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function(req,res){
    
    var name = req.body.name ;
    var email = req.body.email ;

    var data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : name,   
                },  
            },
        ],
    } ;
    
    const url = "https://us10.api.mailchimp.com/3.0/lists/0dc9485ff3";
    const jsonData = JSON.stringify(data) ;

    const options = {
        method : "POST" ,
        auth : "manthan1:324f2e4af38f3a348a38e109daa8d13c-us10"
    }
    const request = https.request(url,options, (response) => {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/ failure.html");
        }
        response.on("data" ,(data) => {
            console.log(JSON.parse(data)) ;
        });
    });

    request.write(jsonData);
    request.end();

}) ;

app.post("/failure" ,function(req,res){
    res.redirect("/");
});

app.listen(3000, (req,res) => {
    console.log("server in running on port 3000") 
}) ;


// f81c83a4f7b821e689ff7a88ce806a89-us10
// 