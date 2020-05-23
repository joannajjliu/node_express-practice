//Build RESTful APIs 
//  with Node,
//  and Express (fast, light-weight framework to give structure for http request)
const Joi = require('@hapi/joi'); //npm module class for input validation
express = require('express');
const app = express(); //assined to "app" by convention

app.use(express.json()); //express.json is middleware

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {//callback function, also called "route handler"
    res.send("Hello World");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Route parameters:
app.get('/api/courses/:id/:year', (req, res) => {
    //type in browser: localhost:3000/api/courses/9/2020
    res.send(req.params); //object with params' id, and year
});

app.get('/api/courses/:id/:year', (req, res) => {
    //type in browser: localhost:3000/api/courses/9/2020?sortBy=name
    res.send(req.query); //object with query string params
});

/* Handling HTTP GET Requests: */
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) {//404 object not found
        return (
            res.status(404).send("Course not found")
        )
    }
    res.send(course);
});

/* Handling HTTP POST Requests: */
app.post('/api/courses', (req, res) => {//create a course
    //input validation:
    const { error } = validateCourse(req.body);//es6 obj destructuring
    if (error) {
        // 400 bad request:
        res.status(400).send(error.details[0].message);
        return; //must return, so remainder of function is NOT executed
    }
    
    const course = {
        id: courses.length + 1, //when using a db, id is auto assigned
        name: req.body.name
    };
    courses.push(course);
    res.send(course);// convention to return in res body, to see the new resource id
});

/* Handling HTTP PUT Requests: */
app.put('/api/courses/:id', (req, res) => {
    // Look up course
    // If not existing, return 404
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) {
        return (
            res.status(404).send("Course not found")
        )
    }
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validateCourse(req.body);//es6 obj destructuring
    if (error) {
        res.status(400).send(error.details[0].message);
        return; //must return, so remainder of function is NOT executed
    }
    // Update course
    course.name = req.body.name;
    // Return the updated course to client
    res.send(course);
});

// Input validation reuseable function
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate({name: course.name});
}

/* Handling HTTP DELETE Requests: */
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // Not existing, return 404
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) {
        return (
            res.status(404).send("Course not found")
        )
    }
    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1); //removes course
    // By convention, return the course deleted
    res.send(course);
})

// Environment variable:
//      A variable part of the environment in which the process runs,
//      Its value is set outside of the application
// global 'process' object
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
