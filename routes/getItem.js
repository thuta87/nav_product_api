var sql = require('msnodesqlv8');
var assert = require('assert');
var config = require(__dirname + '../../config.js');
 
function get(req, res, next) {

    // open connection
    sql.open(config, function (err, conn) {
        console.log(err);
        
        //console.log(req.query.id);

        if (err===false) {
            err=null;
        }
        assert.ifError(err);
        // prepare a statement which can be re-used'
        
        var query =
            `SELECT I.No_ As [Item Code],I.Description As [Item Name],
            I.[Search Description] As [Item Name 2],I.[Base Unit of Measure] As [Unit Type],
            I.[Unit Price],I.[Unit Price Including VAT],I.[Item Category Code],IC.Description As [Category Name],
            IsNull(IV.Code,'') as [Variant Code],IsNull(IV.Description,'') as [Item Detail],
            IsNull(IV.[Description 2],'') as [Item Detail 2] 
            FROM [DE Dynamic Fashion Co_, Ltd$Item] as I
            Left Join [DE Dynamic Fashion Co_, Ltd$Item Variant] IV
            On I.No_=IV.[Item No_]
            Inner Join [DE Dynamic Fashion Co_, Ltd$Item Category] IC
            On I.[Item Category Code]=IC.Code Where I.No_=?`;        
        conn.prepare(query, function (e, ps) {
            // called back with a prepared statement
            console.log(ps.getMeta());
            // prepared query meta data avaialble to view

            assert.ifError(err);
            // execute with expected paramater
            //01028103
            //req.query.id
            console.log(req.query.id);
            ps.preparedQuery([String(req.query.id)], function(err, fetched) {
                if (fetched =='') {
                    console.log(fetched);
                    res.status(404).json(['No record found.']);
                }else{
                    console.log(fetched);
                    res.status(200).json(fetched);
                }
                // can call again with new parameters.
                // note - free the statement when no longer used,
                // else resources will be leaked.]
            });
        });
    
    });
    
}        

module.exports.get = get;
