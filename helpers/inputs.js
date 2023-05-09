const fs = require('fs');
const path = require('path');
const { getDataFromFile, orderArrayByDate } = require('../middlewares/FilesData');
const { registerOutput, printOutput, balanceOutput } = require('./outputs');
const { getAllFilesData } = require('./dataFiles');



const register = (argv) => {
    
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

module.exports = {
    register,
    balance,
    print
}