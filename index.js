const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
require('dotenv').config();

var port = process.env.PORT || 8080;
var posts=[
    {
        id:1,
        title:"The Bengal Tiger",
        content:"The Bengal tiger it is only found in India. It is the prestige of our Homeland INDIA. Currently it is endangered because the population of the Bengal Tiger is has reduced to a great extent because of habitat loss, destruction, overgrazing and poaching. According to reports of 2011 there were only 2500 individuals in the left by then. In India there is no such kind of a conservation landscape which can support a population of around 250 adult individuals of Bengal tigers at a time so it is very difficult to protect them and to to conserve this heritage of India.Its coat is yellow to orange in colour with beautiful stripes all over the body in the colour from dark brown to black the lower portion is white.",
        time:"2:25:55 pm",
        date:"12/11/2021"
    },
    {
    id:2,
    title:"Snow Leopard",
    content:"The Snow Leopard live in the mountainous region of western and eastern Himalayas. They are majorly found in the areas of  Jammu and Kashmir, Himachal Pradesh, Uttrakhand, Arunachal Pradesh and in the Eastern Himalayas.Snow Leopard are one of the endangered animal species because there population is around 200 to 600 in INDIA and if the right measures are not taken to protect them then this beautiful species would be extinct. ",
    time:"1:58:25 pm",
    date:"13/11/2021"
},
{
    id:3,
    title:"The Kashmir Stag",
    content:"The Kashmir stag it is popularly known as hangul. It is basically a native of Kashmir majorly found  in the North Indian mountains get us including Chamba district in Himachal Pradesh Kashmir Valley and many dense forest on the high mountains.Due to the habitat loss and destruction, the population declined to just 3000 individuals that also a long time back.Therefore they have used the Dachigam national park in kashmir to save them and and protect these wonderful creatures.",
    time:"5:28:20 pm",
    date:"11/11/2021"
},

];

// Initialize Express
const app = express();

// Setting up template engine
app.set('view engine', 'ejs');

// bodyParser Initialized
app.use(bodyParser.urlencoded({
    extended: true
}));

//Static Files Served
app.use('/public', express.static('public'));

// Home Route
app.get('/', (req, res) => {
    res.render("home.ejs", {
        posts: posts,
        // title: posts
    });
});
app.get('/posts/:activepost',(req,res)=>{
    posts.forEach((post)=>{
        if(_.lowerCase(post.title)==_.lowerCase(req.params.activepost)){
            res.render('post.ejs',{
                title:post.title,
                content:post.content
            });
        }
    });
});

app.get('/compose',(req,res)=>{
    res.render('compose.ejs');
});

app.post('/compose',(req,res)=>{
    const post={
        content:req.body.post,
        title:req.body.title,
        date:new Date().toLocaleDateString(),
        time:new Date().toLocaleTimeString()
    }
    posts.push(post);
    res.redirect('/');
});

app.listen(port, () => {
    console.log("Server Up At " + port);
});