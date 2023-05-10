const fs = require('fs');
const express = require('express');
const app = express();

//JSON read
const rawData = fs.readFileSync('studentJSON.json');
const data = JSON.parse(rawData);

//data send
app.get('/api/data', (req, res) => {
  res.json(data);
});

app.listen(5000, () => console.log('Server started on port 5000'));
