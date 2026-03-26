const Joi = require('joi');
const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'course1 ' },
    { id: 2, name: 'course2 ' },
    { id: 3, name: 'course3 ' },
];

//helper functions:
function lookupCourse(id) {
    return courses.find(c => c.id === parseInt(id));
}

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     description: Retrieve a list of courses
 *     responses:
 *       200:
 *         description: A list of courses
 */
router.get('/', (req, res) => {
    res.send(courses);
});

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course found
 *       404:
 *         description: Course not found
 */
router.get('/:id', (req, res) => {
    const course = lookupCourse(req.params.id);
    if (!course)
        return res.status(404).send('The course was not found');
    else
        res.send(course);
})

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: course4
 *     responses:
 *       200:
 *         description: Course created
 *       400:
 *         description: Validation error
 */
router.post('/', (req, res) => {
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

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated course
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Course not found
 */
router.put('/:id', (req, res) => {
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

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course deleted
 *       404:
 *         description: Course not found
 */
router.delete('/:id', (req, res) => {
    const course = lookupCourse(req.params.id);
    if (!course)
        return res.status(404).send('The course was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

module.exports = router;