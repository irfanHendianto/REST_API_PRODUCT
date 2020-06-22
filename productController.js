var db = require("./db_config.js");
let importExcel = require('convert-excel-to-json');
let del = require('del'); 
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
  
  db.query(
      'INSERT INTO db_product (nama_product, jumlah, Harga) VALUES (?,?,?)',[req.body.nama_product, req.body.jumlah, req.body.Harga],
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

exports.upload = function(req, res){
  let file = req.files.files;
  let filename = file.name
  file.mv('./excel/'+filename, (err) =>{
    if(err){
      res.send({
        message: "Error"
      })
    }else{
        let result = importExcel ({
          sourceFile : './excel/'+filename,
          header: {rows:1},
          columnToKey: {
             A: 'nama_product', 
             B: 'jumlah', 
             C: 'Harga'
            },
        });
        del(['excel/'+filename]);
        for (let i = 0; i < result.Sheet1.length; i++) {
          db.query(
            'INSERT INTO db_product (nama_product, jumlah, Harga) VALUES (?,?,?)',
            [result.Sheet1[i].nama_product, result.Sheet1[i].jumlah, result.Sheet1[i].Harga]
          );
        }
        res.send({
          data: result.Sheet1,
          message: "Sukses"
        })
    }
  });
}