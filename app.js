const express = require("express");
const app = express();

app.use(express.static("public"))

app.get("/", function(req, res){
   res.sendFile(path.join(__dirname + "/public/index.html"))
})

const port = process.env.PORT || 3000;
const ip = process.env.IP || "0.0.0.0/0";
app.listen(port, function(){

});