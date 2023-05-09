// Import required modules and functions
const fs = require('fs');
const path = require('path');
const { getDataFromFile, orderArrayByDate } = require('../middlewares/FilesData');
const { registerOutput, printOutput, balanceOutput } = require('./outputs');
const { getAllFilesData } = require('./dataFiles');



const register = (argv) => {
    // This function reads data from specified files, processes it, and generates a register output
    getAllFilesData(argv.file,(files)=>{
        let array = [] ; 
        files.forEach(file=>{ 
            const fileData = getDataFromFile(argv.priceDb,file);
            fileData.forEach(object=>{
                array.push(object);
            })
        })
        
        if(argv.sort){
            array = orderArrayByDate(array);
        }

        registerOutput(array);
    });
}
// This function reads data from specified files, processes it, and generates a balance output
const balance = (argv) => {
    getAllFilesData(argv.file,(files)=>{
        let array = [] ; 
        files.forEach(file=>{ 
            const fileData = getDataFromFile(argv.priceDb,file);
            fileData.forEach(object=>{
                array.push(object);
            })
        })

        if(argv.sort){
            array = orderArrayByDate(array);
        }
        balanceOutput(array);
    })
}
// This function reads data from specified files, processes it, and generates a print output
const print = (argv) => {
    console.log(argv);
    getAllFilesData(argv.file,(files)=>{
        let array = [] ; 
        files.forEach(file=>{ 
            const fileData = getDataFromFile(argv.priceDb,file);
            fileData.forEach(object=>{
                array.push(object);
            })
        })
        array = orderArrayByDate(array);
        printOutput(array);
    });
}

// Export the functions
module.exports = {
    register,
    balance,
    print
}