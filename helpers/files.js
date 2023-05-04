const fs = require('fs');
const path = require('path');
const { getDataFromFile } = require('../middlewares/FilesData');
const { printRegister } = require('./outputs');

const pathIncome = '../files/Income.ledger';
const pathBitcoin = '../files/Bitcoin.ledger';
const pathExpenses = '../files/Expenses.ledger';
const pathPayable = '../files/Payable.ledger';
const pathReceivable = '../files/Receivable.ledger';


const register = () => {
    fs.readFile(path.resolve(__dirname,pathIncome), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const fileData = getDataFromFile(data);
        printRegister(fileData);
    });
}
const balance = () => {
    console.log("#Balance#");
}
const print = () => {
    console.log("#print#");
}

module.exports = {
    register,
    balance,
    print
}