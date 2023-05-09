const moment = require('moment');

require ('colors');

const stringSizeLimit = (string) => {
    let shortString = string;
    if(shortString.length>30){
        shortString = string.slice(0,30)+'...';
    }
    return shortString
}

const registerOutput = (data) => {
    data.map(item=>{
        console.log(
            `${ moment(item.date,'yyyy/MM/DD').format("YY-MMM-DD ").grey.padEnd(20)} `+
            `${ stringSizeLimit(item.concept).padEnd(35)} `+
            `${ item.secondLine[0].brightBlue.padEnd(40)} `+
            `${ item.secondLine[1].brightRed.padEnd(30)} ` +
            `$${ 0}` + '\n' +
            `${''.padEnd(47)+item.thirdLine[0].brightBlue.padEnd(40)} ` +
            `${
                item.thirdLine[1]
                ? item?.thirdLine[1]?.padEnd(20)
                : ''.padEnd(20)
            }`+ 
            ` $${0}`
            
        );

    })
}

const printOutput = (data) => {
    data.map(item=>{
        console.log(
            `${ item.date} `+
            `${ item.concept} `+ '\n'+
            `${''.padEnd(2) + item.secondLine[0].padEnd(30)} ` +
            `${ item.secondLine[1]} ` + '\n'+
            `${''.padEnd(2)+item.thirdLine[0].padEnd(30)} ` +
            `${
                item.thirdLine[1]
                ? item?.thirdLine[1]?.padEnd(20)
                : ''.padEnd(20)
            }`
            + '\n'
        );

    })
}

module.exports = {
    registerOutput,
    printOutput
}