
const fs = require('fs');


const returnText = (callback) => {
    fs.readFile('day_three.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        const linesArray = data.split('\n');
        callback(linesArray); 
    });
};

const findValidInput = () => {
    returnText((linesArray)=> {
        console.log(linesArray)
        // # Regex to match mul(x, y)
        const regexPattern = /mul\((\d+),(\d+)\)/g
        
        let validMultiplications = [];
        let match;
        
        // Find all matches and transform them into 'x*y' format
        while ((match = regexPattern.exec(linesArray)) !== null) {
            validMultiplications.push(`(${match[1]}*${match[2]})`);
        }
        
        let finalExpression = validMultiplications.join(" + ");

        // Evaluate the final expression
        let result = eval(finalExpression);
        
        console.log(result);
    })
}

findValidInput()
