var express = require('express');
var request = require('request');
var _ = require('underscore');
var countries = require('../public/javascripts/countryList');
var router = express.Router();
var countryCodeUrl = "http://opendata.socrata.com/resource/s8we-gpvp.json?name="

/* GET Internet Data for Country */
router.get('/api/internet/:countryName', function(req, res) {
  var countryName = req.params.countryName;
  var countryCode;

  if(_.contains(countries, countryName)){

    request(countryCodeUrl+countryName, function(error, response, body){
      countryCode = JSON.parse(body)[0].code;
      var internetDataUrl = "http://api.worldbank.org/countries/"+countryCode+"/indicators/IT.NET.USER.P2?format=json&date=2005:2013";
      request(internetDataUrl, function(error, response, body){

          res.json(JSON.parse(body));

      });



    })


  }
  else{
    res.json([{error: "Country Name Not Found"}]);
  }


});

/* GET CellPhone Data for Country */
router.get('/api/cellphone/:countryName', function(req, res) {
  var countryName = req.params.countryName;
  var countryCode;

  if(_.contains(countries, countryName)){

    request(countryCodeUrl+countryName, function(error, response, body){
      countryCode = JSON.parse(body)[0].code;
      var cellPhoneUrl = "http://api.worldbank.org/countries/"+countryCode+"/indicators/IT.CEL.SETS.P2?format=json&date=2005:2013";
      request(cellPhoneUrl, function(error, response, body){

          res.json(JSON.parse(body));

      });



    })


  }

  else{
    res.json([{error: "Country Name Not Found"}]);
  }




});

module.exports = router;
