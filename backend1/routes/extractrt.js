const express = require("express");
const multer = require("multer");
const {extractpdf , extractImage , extractExcel} = require("../controller/extract")
const extractrouter = express.Router();

const storage = multer.diskStorage({
  destination : function(req , file , cb){
    cb(null , 'uploads/');
  },
  filename : function(req , file , cb){
    cb(null , Date.now() + '-' + Math.round(Math.random()*1e9) + '-'+ file.originalname );
  }
})

const upload = multer({storage : storage});

extractrouter.post("/invoicepdf" , upload.single('file') , async(req, res , next)=>{
    extractpdf(req, res);
});

extractrouter.post("/invoiceimage" , upload.single('file') , async(req, res , next)=>{
    extractImage(req, res);
});

extractrouter.post("/invoiceexcel" , upload.single('file') , async(req, res , next)=>{
    extractExcel(req, res);
});

module.exports = extractrouter;
