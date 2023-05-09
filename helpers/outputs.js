// Import moment and colors libraries
const moment = require('moment');
require('colors');

// Define variables to keep track of the total USD and BTC values
let acumUSD = 0;
let acumBTC = 0;

// Define a function to limit the length of a string to 30 characters and add "..." to the end if it's longer
const stringSizeLimit = (concept) => {
    let shortString = concept;
    if (shortString.length > 30) {
        shortString = concept.slice(0, 30) + '...';
    }
    return shortString;
}

// Define a function to convert a string representing a dollar amount into a formatted string with a dollar sign
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

// Define a function to get the total of all registered amounts
const getTotalReg = (stringAmount) => {
    if (acumUSD !== 0) {
        return positiveOrNegativDollar(acumUSD);
    }
    return stringToDollar(stringAmount);
}

// Define a function to format a dollar amount as positive or negative, depending on its sign
const positiveOrNegativDollar = (amount) => {
    if (amount > 0) {
        return stringToDollar('$' + amount);
    } else {
        return stringToDollar('-$' + amount * -1);
    }
}

// Define a function to handle a register entry and update the total USD and BTC values
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
        return stringToDollar(firstAmount) + ` ${acumUSD != 0 ? positiveOrNegativDollar(acumUSD) : 0} ${acumBTC != 0 ? '\n' + ''.padEnd(99) + stringToDollar(acumBTC + ' BTC') : ''}`
    }
    if (secondAmount.includes('$')) {
        const number = parseFloat(secondAmount.replace('$', ''));
        acumUSD += number;
    }
    if (acumUSD !== 0) {
        if (acumUSD > 0) {
            return stringToDollar(secondAmount) + ` ${stringToDollar('$' + acumUSD)} ${acumBTC != 0 ? '\n' + ''.padEnd(99) + stringToDollar(acumBTC + ' BTC') : ''}`
        } else {
            return stringToDollar(secondAmount) + ` ${stringToDollar('-$' + acumUSD * -1)} ${acumBTC != 0 ? '\n' + ''.padEnd(99) + stringToDollar(acumBTC + ' BTC') : ''}`
        }
    }
}

// Define a function to handle the balance
const balHandle = (firstAmount, secondAmount) => {
    // If the secondAmount argument is not provided, it means that we are handling a balance row
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
        return stringToDollar(firstAmount)
    }

    // If the secondAmount includes the '$' sign, extract the number and add it to the accumulator variable
    if (secondAmount.includes('$')) {
        const number = parseFloat(secondAmount.replace('$', ''));
        acumUSD += number;
    }
    // If the accumulated USD is not zero
    if (acumUSD !== 0) {
        if (acumUSD > 0) {
            return stringToDollar(secondAmount)
        } else {
            return stringToDollar(secondAmount)
        }
    }


}
const filterBTC = (stringAmount) => {
    // If the stringAmount includes the 'BTC' string, extract the number and add it to the accumulator variable
    if (stringAmount.includes('BTC')) {
        const number = parseFloat(stringAmount.replace('BTC', ''));
        acumBTC += number;
    }
    // Convert the stringAmount to a dollar string and return it
    return stringToDollar(stringAmount);
}
// Define a function to print in register format
const registerOutput = (data) => {
    data.map(item => {
        console.log(
            `${moment(item.date, 'yyyy/MM/DD').format("YY-MMM-DD ").grey.padEnd(20)} ` +
            `${stringSizeLimit(item.concept).padEnd(35)} ` +
            `${item.secondLine[0].brightBlue.padEnd(40)} ` +
            `${filterBTC(item.secondLine[1])} ` +
            `${getTotalReg(item.secondLine[1])} ${acumBTC != 0 ? '\n' + ''.padEnd(99) + stringToDollar(acumBTC + ' BTC') : ''}` + '\n' +


            `${''.padEnd(47) + item.thirdLine[0].brightBlue.padEnd(40)} ` +
            `${regHandle(item.secondLine[1], item.thirdLine[1])}`
        );
    })
}
// Define a function to print in print format
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

const balanceOutput = (data) => {
    data.map(item => {
        console.log(
            `${''.padEnd(3) + filterBTC(item.secondLine[1])} ` +
            `${item.secondLine[0].brightBlue}` + '\n' +
            `${''.padEnd(3) + balHandle(item.secondLine[1], item.thirdLine[1])} ` +
            `${item.thirdLine[0].brightBlue}`
        );
    })
    console.log('---------------------------------------------------------------');
    console.log(''.padEnd(3) + positiveOrNegativDollar(acumUSD));
    console.log(''.padEnd(3) + stringToDollar(acumBTC + ' BTC'));
}
module.exports = {
    registerOutput,
    printOutput,
    balanceOutput
}