const moment= require("moment");

const orderArrayByDate = (array) => {
    array.sort((obj1,obj2)=>moment(obj1.date, 'yyyy/MM/DD')-moment(obj2.date, 'yyyy/MM/DD'));
    return array;
}

const getDataFromFile = (data) => {
    let newData = JSON.stringify(data).split('\\n');
    let ledgerArrayData = [];
    if(newData[0][1]===';'){
        newData.shift();
    }

    for (let i = 0; i < newData.length / 3 - 1; i++) {
        const index = i * 3;
        const firstLine = newData[index].split(' ');
        const date = firstLine.shift();
        const concept = firstLine.join(' ');
        const secondLine = newData[index+1].split('\\t').filter(item=>item!=='')
        const thirdLine = newData[index+2].split('\\t').filter(item=>item!=='')
        ledgerArrayData.push({
            date,
            concept,
            secondLine:secondLine,
            thirdLine
        })
    }
    return ledgerArrayData;
}

module.exports = {
    getDataFromFile,
    orderArrayByDate
}