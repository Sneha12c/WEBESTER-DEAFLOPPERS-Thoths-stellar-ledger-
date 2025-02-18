const expressAsyncHandler = require("express-async-handler");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const pdf = require('pdf-parse');
const {Promptforextractingdata} = require("../helpers/data.js");
const {API_KEY} = require("../constant.js");
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

const extractpdf = expressAsyncHandler(async(req , res)=>{
   if(!req.file){
   return res.status(200).json({message : 'No file uploaded'});
   }
   try{
   const pdfbuffer = fs.readFileSync(req.file.path);
   const data = await pdf(pdfbuffer);
   const text = data.text;
   fs.unlinkSync(req.file.path);
   const response = await model.generateContent(Promptforextractingdata + text);
   const extractData = response.response.text();
   const jsonString = JSON.parse(extractData.slice(8 , extractData.length -4));
   return res.status(200).send(jsonString);
   }
   catch(err){
   return res.status(400).json({message : "Error while extracting " , err});
   }  
});

const extractImage = expressAsyncHandler(async(req , res)=>{
    console.log(req.file);
    if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
    }
    try{
        const filepath = req.file.path;
        const stats = fs.statSync(filepath);
        if(stats.size > 4*1024*1024){
          throw new Error('File size too large. Maximum size is 4MB');
        }
        const validmimetypes = ['image/png' , 'image/jpg' , 'image/jpeg' , 'image/wbep'];
        if(!validmimetypes.includes(req.file.mimetype)){
           throw new Error(
            'Invalid file type. Supported types are JPEG , JPG , PNG, and WebP'
            );
        }
        const imageBuffer = fs.readFileSync(filepath); 
        const imagebase = imageBuffer.toString('base64');
        const imagePart = {
            inlineData : {
             data : imagebase,
             mimetype : req.file.mimetype,
            }
        }
        fs.unlinkSync(filepath);
        const visionmodel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const response = await visionmodel.generateContent(Promptforextractingdata + imagePart);
        const extractData = response.response.text();
        const jsonString = JSON.parse(extractData.slice(8 , extractData.length-4));

        res.status(400).json({message : jsonString});
    }
    catch(err){
     console.log(err);
     return res.status(400).json({message : "Error while extracting " , err});   
    }
});

const extractExcel = expressAsyncHandler(async(req , res)=>{
    if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
    }
    try{
    const filepath = req.file.path;
    const fileExtension = path.extname(req.file.originalname);
    if(fileExtension !== ".xls" && fileExtension !== ".xlsx") {
     return res.status(400).json({ message: "Invalid file format. Only excel files are allowed." });
    }
    const workbook = xlsx.readFile(filepath);
    const sheetName = workbook.SheetNames[0];
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    fs.unlinkSync(filepath);
    const visionmodel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const responsepromise = visionmodel.generateContent(Promptforextractingdata + jsonData);
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout: Gemini API took too long to respond")), 12000000)
      );
    const response = Promise.race([responsepromise , timeoutPromise]);
    
    const extractData = response.response.text();
    const jsonString = JSON.parse(extractData.slice(8 , extractData.length-4));
    return res.status(200).send(jsonString);
    }
    catch(err){
      console.log(err);
      return res.status(400).json({message : "Error while extracting " , err});   
    }
});

module.exports = {extractpdf ,extractImage , extractExcel};

