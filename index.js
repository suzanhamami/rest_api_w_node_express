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
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send('The course was not found');
    else
        res.send(course);
})

app.post('/api/courses', (req, res) => {
    //!NEW SYNTAX FOR JOI NOT LIKE THE VIDEO
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    //!
    //! const result = Joi.validate(req.body, schema);
    //! console.log(result);

    const result = schema.validate(req.body);
    console.log(result);
    //!This is the log if its an error, if not it only contains the value property
    // {
    //   value: { name: 'ne' },
    //   error: [Error [ValidationError]: "name" length must be at least 3 characters long] {
    //     _original: { name: 'ne' },
    //     details: [ [Object] ]
    //   }
    // }
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }
    //? Access results this is from googleai:
    // const { error, value } = validationResult;

    // if (error) {
    //     console.error(error.details[0].message);
    // } else {
    //     console.log('Data is valid:', value);
    // }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//PORT env var
process.env.PORT = 5000;
//! i should set the port by set port=5000 but its not working in the terminal so i did it manually
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));