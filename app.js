const express = require("express");
const https = require("https"); //NATIVE NODE MODULE So you dont need to install it 
const bodyParser = require("body-parser") // MODULE REQUIRED TO PASS THROUGH THE BODY OF THE POST REQUEST
const app = express();

app.use(bodyParser.urlencoded({extended: true})); //nec. code for paasing through body of post req

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req,res) {
  const q = req.body.cityName
  const appid = "5716a7b54e0794ce8f8ef4886cc68521";
  const units = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + q + "&appid=" + appid + "&units=" + units;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const des = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<p>The weather is currently " + des + "<p>");
      res.write("<h1>The temperature in " + q + " is " + temp + " degrees Celcius</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    })
  })

})



app.listen(3000, function() {
  console.log("The server is running on port 3000");
})
