const { error } = require('console');
const fs = require('fs');
const path = require('path');

const getDataDir = async () => {
    try {
        return await fs.promises.readdir(path.resolve(__dirname, '../files'));
    } catch (err) {
        console.log(err);
        return Error(err);
    }
}

const getAllFilesData = (callback) => {
    let dataFile = [];
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

module.exports = {
    getAllFilesData
}