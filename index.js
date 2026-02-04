const Joi = require('joi');
const express = require('express');
const app = express();

//?for parsing json
app.use(express.json());

const courses = [
    { id: 1, name: 'course1 ' },
    { id: 2, name: 'course2 ' },
    { id: 3, name: 'course3 ' },
];

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = lookupCourse(req.params.id);
    if (!course)
        return res.status(404).send('The course was not found');
    else
        res.send(course);
})

app.post('/api/courses', (req, res) => {
    //!NEW SYNTAX FOR JOI NOT LIKE THE VIDEO
    //? NEW VALIDATION FUNCTION
    const { error } = validateCourse(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //lookup the course
    //if not existent, return 404
    const course = lookupCourse(req.params.id);
    if (!course)
        return res.status(404).send('The course was not found');
    //validate
    //if invalid, return 400 (bad request)
    const { error } = validateCourse(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    //update course
    //return updated course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = lookupCourse(req.params.id);
    if (!course)
        return res.status(404).send('The course was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

function lookupCourse(id){
    return course = courses.find(c => c.id === parseInt(id));
}

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

//PORT env var
//! for powershell: $env:port=5000 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));