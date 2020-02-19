const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')

const directoryPath = path.join('./', 'resources');
//passsing directoryPath and callback function

const createJsonFromCSV = (file) => {
  const results = [];
  return new Promise((resolve) => {
    return fs.createReadStream(`./resources/${file}.csv`)
      .pipe(csv({ headers: false }))
      .on('data', (data) => results.push(data))
      .on('end', () => {
        let finalJson = [];
        const sectionList = Object.values(results[0]);

        sectionList.forEach((sectionNameOrStyle) => {
          finalJson = finalJson.concat({
            title: sectionNameOrStyle,
            content: []
          })
        });

        results.slice(1).forEach((content) => {
          const itemCount = Object.keys(content);

          itemCount.forEach((value) => {
            if (!!content[value]) {
              finalJson[value].content = finalJson[value].content.concat(content[value]);
            }
          })
        })

        let data = JSON.stringify(finalJson);
        fs.writeFileSync(`./src/data/${file}.json`, data);
        resolve(true);
      })
  })
}

fs.readdir(directoryPath, function (err, files) {
  let finalResult = []
  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  let createJSONPromiseList = [];

  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    if (path.extname(file).toLowerCase() === '.csv') {
      finalResult = finalResult.concat({ name: path.basename(file, '.csv') });
      createJSONPromiseList = createJSONPromiseList.concat(createJsonFromCSV(path.basename(file, '.csv')));
    }
  });
  
  Promise.all(createJSONPromiseList);

  const data = JSON.stringify(finalResult);
  fs.writeFileSync('./src/data/route.json', data);
});