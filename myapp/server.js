const express = require('express')
const app = express()
const port = 8080
const fs = require('fs');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/students", (req, res, next) => {
  res.json({
      responseId: 1234,
      students: [
          {name: "Jordi", studentId: '12345678a'},
          {name: "Marta", studentId: '12345678b'}
  ]});
});

app.use(express.json());

app.post('/newstudent', (req, res, next) => {
  for(var i in req.body.students){
      console.log(req.body.students[i].name+'\n');
  }
  res.status(201);
  res.end(); 
}) 


app.post('/newrental', (req,res,next) => {
  var carsJSON;
  if (!fs.existsSync('cars.json')){
    carsJSON = {"cars": []};
    //fs.writeFileSync("cars.json", JSON.stringify(carsJSON));
  }
  else {
    carsFileRawData = fs.readFileSync('cars.json');
    carsJSON = JSON.parse(carsFileRawData);
  }

  for (var i in req.body.cars){
    carsJSON['cars'].push(req.body.cars[i]);
  }
  console.log(carsJSON);
  fs.writeFileSync("cars.json", JSON.stringify(carsJSON));
  
  res.status(201);
  res.end();
})




app.get("/cars", (req, res, next) => {
  var carsJSON;
  if (fs.existsSync('cars.json')){
    carsFileRawData = fs.readFileSync('cars.json');
    carsJSON = JSON.parse(carsFileRawData);
  } 
  else carsJSON = {"cars": []};

  res.json(carsJSON);
});





app.listen(port, () => {
  console.log(`PTI HTTP Server listening at http://localhost:${port}`)
})
