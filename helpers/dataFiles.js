// Import required modules
const fs = require('fs');
const path = require('path');

// This function reads all files in a directory
// Returns an array of filenames if successful, otherwise returns an error
const getDataDir = async () => {
    try {
        return await fs.promises.readdir(path.resolve(__dirname, '../files'));
    } catch (err) {
        console.log(err);
        return Error(err);
    }
}

// This function reads data from a specified file or from all files in a directory
// The callback function is called with an array of data as its argument
const getAllFilesData = (file,callback) => {
    let dataFile = [];
    if(typeof file!=='undefined'){
        // Read data from a specified file
        const fileData = fs.readFileSync(path.resolve(__dirname, '../files/' + file), 'utf8');
        dataFile.push(fileData);
        callback(dataFile)
    }else{
        // Read data from all files in a directory
        getDataDir().then(data => {
            if (data) {
                data.forEach(fileName => {
                    const file = fs.readFileSync(path.resolve(__dirname, '../files/' + fileName), 'utf8');
                    dataFile.push(file);
                })
                callback(dataFile)
            }
        });
    }
}
// This function reads data from a specified database file
// The callback function is called with the data as its argument
const getPriceDBFile = (fileName,callback) => {
    const fileData = fs.readFileSync(path.resolve(__dirname, '../db/' + fileName), 'utf8');
    callback(fileData)
}
// Export the functions

module.exports = {
    getAllFilesData,
    getPriceDBFile
}