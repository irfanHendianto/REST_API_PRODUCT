let bodyParser = require('body-parser');

let express = require('express');

let app = express();

let apiRoutes = require("./api-routes");

var cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());

app.use('/',apiRoutes);

app.listen(function() {
    console.log("Running on port " + 3000);
})
  

app.listen(3000);