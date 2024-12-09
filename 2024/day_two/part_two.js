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

const compareStepCount = () => {

   let numArr = [];
    
    returnText((linesArray) => {
        const arrays = linesArray.map(str => str.split(' ').map(Number));
        const differences = arrays.map(arr => {
            return arr.slice(1).map((num, index) => num - arr[index]);
          });

          console.log(differences)
          
        
         
          const editedArrays = differences.map((diff) => {
            return diff.map((num) => {
        const isIncrease = num > 0 && num <= 3;
        const isDecrease = num < 0 && num >= -3;
       
                if (isIncrease){
                    return "isIncrease"}
                else if (isDecrease)   {
                    return "isDecrease"
                }   else {
                 return 0;
                }
            })
        });
        console.log(editedArrays)

        const result = []
        const badResult = [];
       editedArrays.forEach((arr, index) => {
        let safe = arr.includes("isIncrease") && !arr.includes("isDecrease" )&& !arr.includes(0)
        let safe2 = arr.includes("isDecrease") && !arr.includes("isIncrease")&& !arr.includes(0)
        if( safe || safe2){
            result.push(true)
        } else{badResult.push(index )}
        
       })

       console.log(badResult)
       console.log(result.length)
     

    })

}

compareStepCount()