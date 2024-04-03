const express = require('express');
const app = express();
const path = require("path");
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

app.set("view engine", "views");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true})); // This to make express read post request(URL) encoded body data
app.use(express.json());
app.use(methodOverride('_method'));

let posts = [ 
    {
        id : uuidv4(),
        username : "VishalPawar",
        content : "I am learning MERN Full Stack Web Development"
    },
    {
        id : uuidv4(),
        username : "ShraddhaKhapra",
        content : "Hardwork is the key to success"
    },
    {
        id : uuidv4(),
        username : "AbhishekKhade",
        content : "Going to US next week, celebrating 1st Remote Job"
    }
];

//Index Route
app.get("/posts", (req, res) => {
    console.log(posts);
    res.render("Home.ejs", {posts});
});

//Show Route
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("Show.ejs", {post});
});

//Create Route => serve Form (GET)
app.post("/posts/new", (req, res) => {
    res.render("New.ejs");
});

//Create Route => Save Post (POST)
app.post("/posts", (req, res) => {
    let id = uuidv4();
    let {username, content} = req.body;
    posts.push({id, username, content});
    console.log(posts);
    res.redirect("/posts"); // this redirection will be by default a get request i.e Index Route
});

//Edit Route => Serve Edit.ejs Form
app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("Edit.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    console.log(posts);
    res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id != p.id);
    console.log(post);
    res.redirect("/posts");
});

// app.listen() method should be written at the end of the file
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});