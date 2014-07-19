// set up app
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

// set up tag checker
var TagChecker = require("./src/tag-checker");
var TagIterator = require("./src/tag-iterator");
var tagIterator = new TagIterator();
var tagChecker = new TagChecker();
tagChecker.setIterator(tagIterator);

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/app'));
// log every request to the console
app.use(morgan('dev'));
// to support JSON-encoded bodies
app.use(bodyParser.json()); 

// api
app.route('/api/validate')
    .post(function(req, res, next) {
        var result = tagChecker.checkTags(req.body.text);
        res.json(result);
    });

app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

// listen
app.listen(8081);
console.log("App listening on port 8081");
