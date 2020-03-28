const express = require('express');
const Article = require('./../models/article');
const router = express.Router();


router.get('/edit/:id', async(req,res)=>{
 const article = await Article.findById(req.params.id);
   
res.render('articles/edit', {article: article});
});


router.get('/:slug', async(req,res)=>{
    const article = await Article.findOne({slug: req.params.slug});
    if(article == null) res.redirect('/');
res.render('articles/show', {article: article});
});


router.get('/new', (req,res)=>{
   res.render('articles/new', {article: new Article()});
}); 

router.post('/', (req, res, next)=>{
req.article = new Article();
next();
createAndRedirect('new');
});


router.delete('/:id', async(req,res)=> {
    await Article.findById(req.params.id);
    res.redirect('/');
});


router.put('/', (req, res, next)=>{
    req.article = Article.findById(req.params.id);
    next();
    createAndRedirect('edit');
    });

function createAndRedirect(path){
    return async(req, res) =>{
    let article= req.article;
        article.title= req.body.title;
        article.description= req.body.description;
        article.markdown= req.body.markdown;
    
    try{
    article= await article.save();
    res.redirect(`/article/${article.slug}`);
    }
    catch(e){
    res.render(`article/${path}`, {article: article});
     console.log(e);
    }
}
}

console.log("running fine");

module.exports = router; 


