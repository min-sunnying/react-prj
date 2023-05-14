const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());
const cors = require('cors');
app.use(cors());

//JSON read
const rawData = fs.readFileSync('studentJSON.json');
const data = JSON.parse(rawData);

//data send
app.get('/api/data', (req, res) => {
  res.json(data);
});

app.listen(8080, () => console.log('Server started on port 8080'));
