// 1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// // treb7uchet


const fs = require('fs');

const returnText = (callback) => {
    fs.readFile('day_one.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        const linesArray = data.split('\n');
        callback(linesArray); 
    });
};

const adventArray = ["1abc2", 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'];

const readFirstAndLastNumber = () => {
    let result;
    returnText((linesArray) => {
        console.log('Lines array:', linesArray);

        const regex = /([0-9])/g;
        const newArray = [];
        const finalFilter = []
        linesArray.forEach((input) => {
            
            const matches = input.match(regex);
            console.log(matches.length)
            if (matches && matches.length > 1) {
                newArray.push(matches.shift() + matches.pop());
            }    
            else if (matches.length === 1){
                console.log(matches.length)
                const singleNum = matches + matches
                newArray.push(singleNum)
            }
        });
        const numberArray = newArray.map(Number)
        result = numberArray.reduce((accum,current)=> {return  accum +current})

        console.log('Extracted numbers:', result);
    });
    return result;
};

readFirstAndLastNumber();
