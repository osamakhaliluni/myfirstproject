const { name } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");

const Article = require("./models/article");

mongoose.connect("mongodb+srv://osamakhaliluni:011113457@myfirstcluster.8hsyfsa.mongodb.net/?retryWrites=true&w=majority&appName=myFirstCluster")
.then(()=>{
    console.log("database connected");
}).catch(()=>{
    console.log("database error");
})

const app = express();
app.use(express.json());



app.post("/article", async function(request, response){
    const newArticle = new Article();
    newArticle.title = request.body.title;
    newArticle.body = request.body.body;
    newArticle.likesNum = 3;
    await newArticle.save();

    response.send("saving done");
})

app.get("/article", async function(request, response){
    const articles = await Article.find();
    console.log("" + articles);
    response.json(articles);
})

app.get("/article/:artId", async function(request, response){
    const articles = await Article.findById(request.params.artId);
    console.log("" + articles);
    response.json(articles);
})

app.delete("/article/:artId", async function(request, response){
    const articles = await Article.findByIdAndDelete(request.params.artId);
    console.log("" + articles);
    response.json(articles);
})

app.get("/allArticles", async(request, response)=>{
    const articles = await Article.find();
    response.render("allArticles.ejs", {
        articles : articles,
    });
})

app.get("/sum/:num1/:num2", (request, response) => {
    const sum = Number(request.params.num1) + Number(request.params.num2);
    response.send(""+sum);
})

app.get("/body", (requset, response) => {
    console.log(requset.body);
    console.log(requset.query);

    response.send("hello "+ requset.body.name + " " + requset.query.age);
})

app.get("/", (request, response)=>{
    // response.sendFile(__dirname + "/views/index.html");
    response.render("index.ejs",{
        name: "osama"
    });
})



app.listen(3000, function(){
    console.log("listening to port 3000");
})