const moment = require('moment');

require ('colors');

const printRegister = (data) => {
    data.map(item=>{
        console.log(
            `${ moment(item.date,'yyyy/MM/DD').format("YY-MMM-DD ").grey.padEnd(20)} `+
            `${ item.concept.padEnd(35)} `+
            `${ item.secondLine[0].brightBlue.padEnd(40)} `+
            `${ item.secondLine[1].brightRed.padEnd(30)} ` +
            `$${ 0}`
            // moment(item.date,'yyyy/MM/DD').format("YY-MMM-DD ").grey +item.concept.padEnd(30)+
            // item.secondLine[0].brightBlue.padEnd(30)+item.secondLine[1].brightRed+
            // '\n'+item.thirdLine[0].brightBlue.padEnd(20)+'$100.00'
        );
    })
}

module.exports = {
    printRegister
}