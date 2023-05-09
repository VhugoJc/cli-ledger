const fs = require('fs');
const path = require('path');
const { getDataFromFile, orderArrayByDate } = require('../middlewares/FilesData');
const { registerOutput, printOutput } = require('./outputs');
const { getAllFilesData } = require('./data');



const register = () => {
    getAllFilesData((files)=>{
        let array = [] ; 
        files.forEach(file=>{ 
            const fileData = getDataFromFile(file);
            fileData.forEach(object=>{
                array.push(object);
            })
        })
        array = orderArrayByDate(array);
        registerOutput(array);
    });
}
const balance = () => {
    console.log("#Balance#");
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