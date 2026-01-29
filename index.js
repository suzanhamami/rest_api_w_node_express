const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req,res) => {
    res.send([1, 2, 3]);
});

app.get('/api/courses/:id', (req,res) => {
    res.send(req.params.id);
})
//we can have multiple parameters:
app.get('/api/posts/:year/:month', (req,res) => {
    res.send(req.params);
})
//for query: like ?sortBy=name
app.get('/api/posts/:year/:month', (req,res) => {
    res.send(req.query);
})

//PORT env var
process.env.PORT=5000;
//! i should set the port by set port=5000 but its not working in the terminal so i did it manually
const port = process.env.PORT || 3000;
console.log(process.env.port);
app.listen(port, () => console.log(`Listening on port ${port}`));