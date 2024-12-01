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


const compareNumbersBySize = () => {
    let result;
    let array1 = [];
   let array2 = [];
  
   let differenceArray = [];
  
    returnText((linesArray) => {
        
console.log(linesArray)
         linesArray.forEach(element => {
            const columns = element.split(/\s+/)
            array1.push(parseInt(columns[0]));
           array2.push(parseInt(columns[1]));      
        
    })
    const sortedAscending1 = array1.sort((a, b) => a - b);
const sortedAscending2 = array2.sort((a, b) => a - b);
console.log(sortedAscending1, sortedAscending2)
 sortedAscending1.forEach((element,index) =>{
 
    if (element > sortedAscending2[index]){
       
   differenceArray.push(element - sortedAscending2[index])
    } 
   else if  (element < sortedAscending2[index]){
    differenceArray.push(sortedAscending2[index] - element)
    }
    
 })
console.log(differenceArray)
result = differenceArray.reduce((accum, curr) => {
    return accum + curr}, 0)
    console.log(result)
});


    
};

compareNumbersBySize()

