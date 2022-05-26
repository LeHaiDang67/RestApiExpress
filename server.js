require('dotenv').config();
let express = require("express");
let bodyParser = require('body-parser');
let app = express();
let port = process.env.PORT || 3003;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

let routes = require('./api/router');
routes(app);

app.listen(port);
console.log('RESTful API server started on: ' + port);
