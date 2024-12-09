const fs = require('fs');


const returnText = (callback) => {
    fs.readFile('day_two.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        const linesArray = data.split('\n');
        callback(linesArray); 
        
    });
};

const compareStepCount = () => {

   let numArr = [];
    
    returnText((linesArray) => {
        const arrays = linesArray.map(str => str.split(' ').map(Number));
        const differences = arrays.map(arr => {
            return arr.slice(1).map((num, index) => num - arr[index]);
          });
          
        
         
          const safeArrays = differences.map((diff) => {
            return diff.map((num) => {
        const isIncrease = num > 0 && num <= 3;
        const isDecrease = num < 0 && num >= -3;
       
                if (isIncrease){
                    return isIncrease;}
                else if (isDecrease)   {
                    return false 
                }   else {
                 return 0;
                }
            })
        });
        const result = []
       safeArrays.forEach((arr) => {
        let safe = arr.includes(true) && !arr.includes(false) && !arr.includes(0)
        let safe2 = arr.includes(false) && !arr.includes(true) && !arr.includes(0)
        if( safe || safe2){
            result.push(true)
        }
        
       })
       console.log(result.length)

    })

}

compareStepCount()