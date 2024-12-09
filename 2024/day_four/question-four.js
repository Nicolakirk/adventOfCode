const fs = require("fs");

const returnText = (callback) => {
  fs.readFile("day-four.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
  
    const linesArray = data.split("\n");

    callback(linesArray);
  });
};

const findAllDiagonals = (callback) => {
  let diagCount = 0;
  returnText((linesArray) => {
    const regex = /(?=(XMAS|SAMX))/g;
    const reverseRegex = /SAMX/;
    const diagonals = [];
    const numRows = linesArray.length;
    const numCols = linesArray[0].length;

    for (let col = 0; col < numCols; col++) {
      let diagonal = [];
      let row = 0;
      let c = col;
      while (row < numRows && c < numCols) {
        diagonal.push(linesArray[row][c]);
        row++;
        c++;
      }
      diagonals.push(diagonal);
    }

  
    for (let row = 1; row < numRows; row++) {
      let diagonal = [];
      let c = 0;
      let r = row;
      while (r < numRows && c < numCols) {
        diagonal.push(linesArray[r][c]);
        r++;
        c++;
      }
      diagonals.push(diagonal);
    }

  
    for (let col = numCols - 1; col >= 0; col--) {
      let diagonal = [];
      let row = 0;
      let c = col;
      while (row < numRows && c >= 0) {
        diagonal.push(linesArray[row][c]);
        row++;
        c--;
      }
      diagonals.push(diagonal);
    }

    for (let row = 1; row < numRows; row++) {
      let diagonal = [];
      let c = numCols - 1;
      let r = row;
      while (r < numRows && c >= 0) {
        diagonal.push(linesArray[r][c]);
        r++;
        c--;
      }
      diagonals.push(diagonal);
    }


    diagonals.forEach((diagonal, index) => {
        const diagFinal = []
      const diagString = diagonal.join("");
//     const matchXmas = diagString.matchAll(regex).length
//     const matchSmax = diagString.matchAll(reverseRegex).length;
//   if (matchXmas ){
//    diagCount += matchXmas
//   }
//   if (matchSmax){
//  diagCount += matchSmax
//   }
diagCount += [...diagonal.join('').matchAll(regex)].length

      })
    
    console.log(diagCount, "diag")

    callback(diagCount);
  });
};

const readHorizontalLines = (callback) => {
  let horCount = 0;
  returnText((linesArray) => {
    const regex = /(?=(XMAS|SAMX))/g;
  
    
    // Check each horizontal line for the regex patterns
    linesArray.forEach((line, index) => {
    //     const matchXmas = regex.test(line);
    // const matchSmax = reverseRegex.test(line);
      const lineString = line.replace(/\s+/g, ""); // Remove spaces between characters to form the line as a single string
    //   if (matchXmas) {
    //     horCount++;
    //   } if (matchSmax) {
    //     horCount++;
    //   }
    horCount += [...lineString.matchAll(regex)].length
    });
console.log(horCount, "hor")
    callback(horCount);
  });
};

const readVerticalLines = (callback) => {
  let verCount = 0;
  const regex = /(?=(XMAS|SAMX))/g;
  returnText((linesArray) => {
    console.log(linesArray)
    const rows = linesArray
    const numColumns = rows[0].length;
   
   
    const verticalLines = [];
  
    // Loop through each column index
    for (let col = 0; col < numColumns; col++) {
      let verticalLine = '';
      
      // Loop through each row to build the vertical line for the current column
      for (let row = 0; row < rows.length; row++) {
        verticalLine += rows[row][col];
      }
      
      // Add the vertical line to the result array
      verticalLines.push(verticalLine);
    }
    console.log(verticalLines)
    // Return the vertical lines as an array or a single string
    // return verticalLines.join('\n');

    verticalLines.forEach((line, index) => {
    //     const matchXmas = regex.test(line);
    // const matchSmax = reverseRegex.test(line);
    // //   const lineString = line.replace(/\s+/g, ""); // Remove spaces between characters to form the line as a single string
    //   if (matchXmas) {
    // verCount++;
    //   } if (matchSmax ) {
    //     verCount++;
    //   }
    verCount += [...line.matchAll(regex)].length
    });
   
    console.log(verCount, "ver")
   callback(verCount)
  });
 
  
};

const countLineTotals = async () => {
  let totalCount = 0;

  // Wait for each function to complete using Promise.all
  const verCount = await new Promise((resolve) => {
    readVerticalLines(resolve); // Resolves with verCount
  });

  const horCount = await new Promise((resolve) => {
    readHorizontalLines(resolve); // Resolves with horCount
  });

  const diagCount = await new Promise((resolve) => {
    findAllDiagonals(resolve); // Resolves with diagCount
  });

  totalCount = verCount + horCount + diagCount;

  // Log the final total count after all operations have completed
  console.log("Total Count of lines with XMAS or SAMX:", totalCount);
};

countLineTotals();

