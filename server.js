//decalre necessary variables
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const articleRouter = require("./routes/articles");
const Article = require('./models/article');


// initialise HTML template
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));


//connect to database
// const dbPath = "mongodb://localhost/blog";
mongoose.connect( "mongodb://localhost/blog", { 
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });


app.get('/', async(req, res)=>{
const articles = await Article.find().sort({
  createdAt: 'desc'
});

res.render("articles/index", {articles: articles});
});

app.use("/articles", articleRouter); 

app.listen(5000);

