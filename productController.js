var db = require("./db_config.js");

exports.list = function(req,res) {
    db.query(
        'SELECT * FROM db_product',
        (error, results) => {
          if(error){
            res.send(error)
          }
          else {
            res.json({
                message:"Product retrieved successfully",
                data: results
            });
          }
        }
    );
}

exports.create = function(req,res) {
  var values = [req.body.nama_product, req.body.jumlah, req.body.Harga];
  db.query(
      'INSERT INTO db_product (nama_product, jumlah, Harga) VALUES (?)',[values],
      (error, results) => {
        if(error){
          res.send(error)
        }
        else {
          res.json({
              message:"Product successfully add",
          });
        }
      }
  );
}

exports.update = function(req,res) {

  db.query(
      'UPDATE db_product SET nama_product = ?, jumlah = ?, Harga = ? WHERE No = ?',
      [req.body.nama_product, req.body.jumlah, req.body.Harga, req.params.no],
      (error, results) => {
        if(error){
          res.send(error)
        }
        else {
          res.json({
              message:"Product successfully update",
          });
        }
      }
  );
      // console.log(query.sql);
}

exports.detail = function(req,res) {
  db.query(
      'SELECT * FROM db_product WHERE No = ?',
      [req.params.no],
      (error, results) => {
        if(error){
          res.send(error)
        }
        else {
          res.json({
              message:"Product retrieved successfully",
              data: results
          });
        }
      }
  );
}


exports.delete = function(req,res) {
  db.query(
    'DELETE FROM db_product WHERE No = ?',
    [req.params.no],
    (error, results) => {
      if(error){
        res.send(error)
      }
      else {
        res.json({
            message:"Product successfully delete"
        });
      }      
    }
  );
}