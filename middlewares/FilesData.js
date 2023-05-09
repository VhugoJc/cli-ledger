const moment= require("moment");
const { getPriceDBFile } = require("../helpers/dataFiles");


/**
 * Sorts an array of objects based on the date property of the objects.
 * 
 * @param {Array} array - The array of objects to be sorted.
 * @returns {Array} - The sorted array of objects.
 */

const orderArrayByDate = (array) => {
    array.sort((obj1,obj2)=>moment(obj1.date, 'yyyy/MM/DD')-moment(obj2.date, 'yyyy/MM/DD'));
    return array;
}
/**
 * Reads data from the price database file, parses it and uses it to update the input data array.
 * 
 * @param {Array} arrayData - The input data array to be updated.
 * @param {string} priceDb - The price database file to be read.
 * @param {function} callback - The function to be called with the updated data array.
 */
const priceDBChange = (arrayData,priceDb,callback) => {
        // Read data from price database file using getPriceDBFile function
    getPriceDBFile(priceDb,(data)=>{
        // Parse the data and split it into an array
        let docData = JSON.stringify(data).split('\\n');
        docData.forEach(item=>{
            // If the item matches the second element of the input data array
            if(item.split(' ')[3]===arrayData[1]?.split(' ')[1]){
                // Get the value from the price database file and the input data array
                const valueDB=parseFloat(item.split(' ')[4].replace('$',''));
                const valueFile=parseFloat(arrayData[1].split(' ')[0]);
                // Multiply the values to get the total
                const total = valueDB*valueFile;
                // Update the input data array with the new total
                arrayData = [
                    arrayData[0],
                    `${
                        total>0
                        ? '$'+total
                        : '-$'+total*-1
                    }`
                ]
            }
        })
        // Call the callback function with the updated data array
        callback(arrayData);
    })
}
/**
 * Reads data from a file and returns an array of objects.
 * 
 * @param {string} priceDb - The price database file to be read.
 * @param {Object} data - The data to be read from the file.
 * @returns {Array} - The array of objects created from the file data.
 */
const getDataFromFile = (priceDb, data) => {
    // Parse the data and split it into an array
    let newData = JSON.stringify(data).split('\\n');
     // Create an empty array to store the ledger data
    let ledgerArrayData = [];
    // If the first element of the array is a comment, remove it
    if(newData[0][1]===';'){
        newData.shift();
    }
    
    // Iterate over each set of three lines in the input data
    for (let i = 0; i < newData.length / 3 - 1; i++) {
        const index = i * 3;
        // Parse the first line to get the date and concept
        const firstLine = newData[index].split(' ');
        const date = firstLine.shift();
        const concept = firstLine.join(' ');

        // Parse the second and third lines to get the values
        let secondLine = newData[index+1].split('\\t').filter(item=>item!=='')
        let thirdLine = newData[index+2].split('\\t').filter(item=>item!=='')
        // If a price-sb file is received
        if(typeof priceDb!=='undefined'){
            // parse de data in different value to Dollar sor second and third line 
            priceDBChange(secondLine, priceDb,(data)=>{
                secondLine = data;
            })
            priceDBChange(thirdLine, priceDb,(data)=>{
                thirdLine = data;
            })
        }
        // create and add an object with ledger data
        ledgerArrayData.push({
            date,
            concept,
            secondLine:secondLine,
            thirdLine
        })
    }
    //return the array of ledger objects
    return ledgerArrayData;
}

module.exports = {
    getDataFromFile,
    orderArrayByDate
}