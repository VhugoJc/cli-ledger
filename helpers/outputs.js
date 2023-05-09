const moment = require('moment');
require('colors');

let acumUSD = 0;
let acumBTC = 0;

const stringSizeLimit = (concept) => {
    let shortString = concept;
    if (shortString.length > 30) {
        shortString = concept.slice(0, 30) + '...';
    }
    return shortString;
}

const stringToDollar = (stringAmount) => {
    if (stringAmount.includes('$')) {
        const numberAux = stringAmount.replace('$', '');
        if (numberAux < 0) {
            return `${'-$'.brightRed + (parseFloat(numberAux) * -1).toFixed(2).brightRed.padEnd(28)}`
        }
        return `$${parseFloat(numberAux).toFixed(2).white.padEnd(29)}`
    }
    
    if (stringAmount.includes('-')) {
        return `${stringAmount.brightRed.padEnd(30)}`
    }
    return stringAmount.padEnd(20)
}

const getTotalReg = (stringAmount) => {
    if (acumUSD !== 0) {
        if (acumUSD < 0) {
            return stringToDollar('-$' + acumUSD * -1)
        } else {
            return stringToDollar('$' + acumUSD)
        }
    }
    return stringToDollar(stringAmount);
}


const regHandle = (firstAmount, secondAmount) => {
    if (typeof secondAmount === 'undefined') {
        if (firstAmount.includes('-')) {
            firstAmount = firstAmount.replace('-', '');
        } else {
            firstAmount = '-' + firstAmount;
        }
        if (firstAmount.includes('BTC')) {
            const number = parseFloat(firstAmount.replace('BTC', ''));
            acumBTC += number;
        }
        return stringToDollar(firstAmount) + ` ${0} ${acumBTC!=0 ?'\n'+''.padEnd(99)+stringToDollar(acumBTC+' BTC') :''}`
    }

    if (secondAmount.includes('$')) {
        const number = parseFloat(secondAmount.replace('$', ''));
        acumUSD += number;
    }

    if (acumUSD !== 0) {
        if (acumUSD > 0) {
            return stringToDollar(secondAmount) + ` ${stringToDollar('$' + acumUSD)} ${acumBTC!=0 ?'\n'+''.padEnd(99)+stringToDollar(acumBTC+' BTC') :''}`
        } else {
            return stringToDollar(secondAmount) + ` ${stringToDollar('-$' + acumUSD * -1)} ${acumBTC!=0 ?'\n'+''.padEnd(99)+stringToDollar(acumBTC+' BTC') :''}`
        }
    }

    
}

const filterBTC = (stringAmount) => {
    if (stringAmount.includes('BTC')) {
        const number = parseFloat(stringAmount.replace('BTC', ''));
        acumBTC += number;
    }
    return stringToDollar(stringAmount);
}
const registerOutput = (data) => {
    data.map(item => {
        console.log(
            `${moment(item.date, 'yyyy/MM/DD').format("YY-MMM-DD ").grey.padEnd(20)} ` +
            `${stringSizeLimit(item.concept).padEnd(35)} ` +
            `${item.secondLine[0].brightBlue.padEnd(40)} ` +
            `${filterBTC(item.secondLine[1])} ` +
            `${getTotalReg(item.secondLine[1])}` + '\n' +


            `${''.padEnd(47) + item.thirdLine[0].brightBlue.padEnd(40)} ` +
            `${regHandle(item.secondLine[1], item.thirdLine[1])}`
        );

    })
}

const printOutput = (data) => {
    data.map(item => {
        console.log(
            `${item.date} ` +
            `${item.concept} ` + '\n' +
            `${''.padEnd(2) + item.secondLine[0].padEnd(30)} ` +
            `${item.secondLine[1]} ` + '\n' +
            `${''.padEnd(2) + item.thirdLine[0].padEnd(30)} ` +
            `${item.thirdLine[1]
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