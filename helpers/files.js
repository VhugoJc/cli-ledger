const fs = require('fs');
const path = require('path');
const { getDataFromFile, orderArrayByDate } = require('../middlewares/FilesData');
const { registerOutput, printOutput, balanceOutput } = require('./outputs');
const { getAllFilesData } = require('./data');



const register = (argv) => {
    getAllFilesData((files)=>{
        let array = [] ; 
        files.forEach(file=>{ 
            const fileData = getDataFromFile(file);
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
    getAllFilesData((files)=>{
        let array = [] ; 
        files.forEach(file=>{ 
            const fileData = getDataFromFile(file);
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
const print = () => {
    getAllFilesData((files)=>{
        let array = [] ; 
        files.forEach(file=>{ 
            const fileData = getDataFromFile(file);
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