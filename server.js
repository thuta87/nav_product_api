var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var helmet = require('helmet');

var getCode = require(__dirname + '/routes/getCode.js');
var getItem = require(__dirname + '/routes/getItem.js');
var getSize = require(__dirname + '/routes/getSize.js');

var app;
var router;
var port = 3000;
 
app = express();
 
app.use(morgan('combined')); 
//logger
app.use(bodyParser.json());

app.use(helmet());
 
router = express.Router();

router.get('/get_code',getCode.get);
router.get('/get_item', getItem.get);
router.get('/get_size', getSize.get);

 
app.use('/api', router);

app.listen(port, function() {
    console.log('Web server listening on localhost:' + port);
});

