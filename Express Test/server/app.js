const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();

app.use("/", cookieParser());

app.use("/", (req, res, next) => {
    // req.cookies.time = undefined;
    if (!req.cookies.time) {
        let date = new Date();
        res.cookie('time', '' + date.getHours() + ':' + date.getMinutes() + '.' + date.getSeconds(), {
            maxAge: 3.6e6,
        });
    }
    
    next();
});

app.get("/", (req, res) => {
    // res.render("<h1>Hello World</h1>");
    res.send('Last cookie time : ' + req.cookies.time);
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Is running localhost:${port}`);
})


// Add middleware to the "/" route that sets current time to the cookie if there was no cookie for time