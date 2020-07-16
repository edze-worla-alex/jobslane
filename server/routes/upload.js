var express = require('express');
var router = express.Router();
var multer  = require('multer')
var path = require("path")

function check_file_type(req,file,cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname){
  	return cb(null,true);
  }
  else{
  	return cb("invalid image")
  }
}

function get_month_name(date_data){
	var month = date_data.getMonth();
	var months = [0,1,2,3,4,5,6,7,8,9,10,11];
	switch(month){
		case 0:
		return "January";
		case 1:
		return "February";
		case 2:
		return "March";
		case 3:
		return "April";
		case 4:
		return "May";
		case 5:
		return "June";
		case 6:
		return "July";
		case 7:
		return "August";
		case 8:
		return "September";
		case 9:
		return "October";
		case 10:
		return "November";
		case 11:
		return "December";
	}
	
}

function upload(arg,dir) {
var date = new Date(Date.now());
var location = "public/storage/uploads/" + date.getFullYear() + "/" + get_month_name(date) +"/"+ dir;
var storage = multer.diskStorage({
 destination: location,
 filename: function(req,file,cb){
	cb(null,file.originalname.replace(path.extname(file.originalname),"")+"-"+file.fieldname + "_" +  Date.now().toString() + path.extname(file.originalname))
 }
})
	return multer({
	storage:storage,
	limits:{fileSize:546555},
	fileFilter:function (req,file,cb) {
		check_file_type(req,file,cb);	
	}
}).single(arg);

}

module.exports = upload;
