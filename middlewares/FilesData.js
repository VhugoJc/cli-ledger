const moment= require("moment");
const { getPriceDBFile } = require("../helpers/data");

const orderArrayByDate = (array) => {
    array.sort((obj1,obj2)=>moment(obj1.date, 'yyyy/MM/DD')-moment(obj2.date, 'yyyy/MM/DD'));
    return array;
}

const priceDBChange = (arrayData,priceDb,callback) => {
    getPriceDBFile(priceDb,(data)=>{
        let docData = JSON.stringify(data).split('\\n');
        docData.forEach(item=>{
            if(item.split(' ')[3]===arrayData[1]?.split(' ')[1]){
                // console.log(arrayData[1].split(' ')[0]);
                const valueDB=parseFloat(item.split(' ')[4].replace('$',''));
                const valueFile=parseFloat(arrayData[1].split(' ')[0]);
                
                const total = valueDB*valueFile;
                arrayData = [
                    arrayData[0],
                    `${
                        total>0
                        ? '$'+total
                        : '-$'+total*-1
                    }`
                ]
            }
        })
        callback(arrayData);
    })
}

const getDataFromFile = (priceDb, data) => {
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
        let secondLine = newData[index+1].split('\\t').filter(item=>item!=='')
        let thirdLine = newData[index+2].split('\\t').filter(item=>item!=='')
        
        if(typeof priceDb!=='undefined'){
            priceDBChange(secondLine, priceDb,(data)=>{
                secondLine = data;
            })
            priceDBChange(thirdLine, priceDb,(data)=>{
                thirdLine = data;
            })
            // thirdLine = priceDBChange(thirdLine, priceDb)
        }

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