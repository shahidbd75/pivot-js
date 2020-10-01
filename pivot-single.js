makeDataPivot(getData,'diseaseName','genotypeName','affected');

function makeDataPivot(dataArray, rowName, columnName, ValueName) {
    var result = [];

    var fixedColumnName =  new Object('diseaseName');
    var dynamicColumnName = new Object(columnName);
    var valueField  = new Object(ValueName);
    for (let i = 0; i < dataArray.length; i++) {
        const element = dataArray[i];
        var eachObject = {};
        const existData = result.filter(x=> x[fixedColumnName] === element[rowName]);
        if(existData.length > 0) {
            let colExist = existData.filter(y=> y[dynamicColumnName] === element[dynamicColumnName])[0]; 
            if(colExist) {
                // If duplicate found
            } else {
                let index = result.findIndex(z=> z[fixedColumnName] === element[fixedColumnName]);
                if(index !== -1) {
                    result.splice(index,1);
                }                
                eachObject[element[columnName]] = element[valueField]; 
                var oo = Object.assign({}, ...existData, eachObject);
                result.push(oo);
            }
        } else {
            eachObject[fixedColumnName] =  element[rowName];
            eachObject[element[columnName]] = element[valueField];
            result.push({...eachObject});
        }
    }
    return result;
}
