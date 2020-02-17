const csv = require('csv-parser')
const fs = require('fs')
const results = [];
 
fs.createReadStream('./resources/about_me.csv')
  .pipe(csv({ headers: false }))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    let data = JSON.stringify(results);
    fs.writeFileSync('./src/json/home.json', data);
  });