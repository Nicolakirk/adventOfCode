
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
const findValidInput = () => {
    returnText((linesArray) => {
        console.log(linesArray);

        // Regex to match do(), don't(), mul(x,y) where x and y are numbers
        const regexPattern = /(do\(\))|(don't\(\))|mul\((\d+),(\d*)\)/g;
        
        let mulEnabled = false;  // Start with mul disabled
        let validMultiplications = [];
        let match;

        // Process each line
        while ((match = regexPattern.exec(linesArray)) !== null) {
            if (match[1]) {  // "do()"
                mulEnabled = true;  // Enable mul
                console.log("mul enabled.");
            } else if (match[2]) {  // "don't()"
                mulEnabled = false;  // Disable mul
                console.log("mul disabled.");
            } else if (match[3] && match[4]) {  // "mul(x, y)"
                let x = match[3];
                let y = match[4];

                // Check if 'y' is empty (incomplete multiplication)
                if (y === "") {
                    console.log(`Invalid mul(${x},) found, skipping.`);
                } else if (mulEnabled) {  // Only include mul if mulEnabled is true
                    validMultiplications.push(`(${x}*${y})`);
                } else {
                    console.log(`mul(${x},${y}) ignored due to mul being disabled.`);
                }
            }
        }

        // Join all valid multiplications with " + " and evaluate the expression
        let finalExpression = validMultiplications.join(" + ");
        if (finalExpression) {
            let result = eval(finalExpression);
            console.log(result);
        } else {
            console.log("No valid multiplications.");
        }
    });
};

findValidInput();
