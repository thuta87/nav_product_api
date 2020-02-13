var request = require("request");
var URI = require("uri-js");

function get(req, res, next) {

var apikey=req.query.apikey;
var url=req.query.url;    

var tmp=encodeURI(req.query.url);                 
console.log(tmp);

console.log('start');
request.get("https://api.ocr.space/parse/imageurl?apikey="+apikey+"&url="+url,
            {
              apikey : req.query.apikey,
              url : req.query.url
            }        
  , function(error, response, body) {
  res.status(200).json(body);
});
console.log('end');

}
module.exports.get = get;
