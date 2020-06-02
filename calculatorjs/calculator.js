const express = require("expresS");
const bodyParser = require("body-parser");

const app = express();

// use urlencoded to parse data from html form. 
//  extended: true, allows us to post nested objects.
//  other bodyParser methods exist for example, text, json
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {//show contents in index.html page
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {//allow post requests in our app
    // have access to req.body via body-parser
    const num1 = req.body.num1;
    const num2 = req.body.num2;
    const result = Number(num1) + Number(num2);

    res.send(`The result of the calculation is ${result}`);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});