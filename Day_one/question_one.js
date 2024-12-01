
const fs = require('fs');

const returnText = (callback) => {
    fs.readFile('test_data.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        const linesArray = data.split('\n');
        callback(linesArray); 
    });
};

const readFirstAndLastNumber = () => {
  let result;
  returnText((linesArray) => {
   console.log(linesArray)

    const regex = /([0-9])/g;
    const newArray = [];
    const finalFilter = [];
    linesArray.forEach((input) => {
      const matches = input.match(regex);
      console.log(matches)
      if (matches && matches.length > 1) {
        newArray.push(matches.shift() + matches.pop());
      } else if (matches.length === 1) {
       
        const singleNum = matches + matches;
        newArray.push(singleNum);
      }
    });
  
    const numberArray = newArray.map(Number);
    console.log(numberArray)
    result = numberArray.reduce((accum, current) => {
      return accum + current;
    });
    console.log(result);
    return result;
  });
  
 
};

readFirstAndLastNumber();
