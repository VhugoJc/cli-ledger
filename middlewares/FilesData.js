
const getDataFromFile = (data) => {
    let newData = JSON.stringify(data).split('\\n');
    let ledgerArrayData = [];
    newData.shift();
    
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
    getDataFromFile
}