let Util = {};
Util.StringToArray = (value) => {
    return value.split();
}
//有数组的配置的sql
Util.QueryString = (condition, field, type) => {
    let tempArr = condition;
    let str = `\nAND`;
    // console.log(typeof condition);
    if(typeof condition === 'string') {
        tempArr = condition.split();
    }
    for(let i = 0; i < tempArr.length; i++) {
        if(type === "String") {
            tempArr[i] = `'${tempArr[i]}'`;
        } else {
            tempArr[i] = `${tempArr[i]}`
        }
    }
    tempArr = tempArr.join(',');
    if(type === "String") {
        str += ` ${field} IN(${tempArr})`
    } else {
        str += ` ${field} &&('{${tempArr}}')`
    }
    // console.log('str', str);
    return str;
}
//直拼AND 条件  不同字段的and
Util.QueryAndString = (condition, field, like) => {
    let str = `\nAND `;
    if(like) return str += ` ${field} like '%${condition}%'`;
    else {
        return str += ` ${field} = '${condition}'`;
    }
}
//不同的字段传入数组拼接为多个and 类似Trend:[1, 2, 3, 4] AND a.q=1 AND a.w=2 AND a.e=3 AND a.r=4
//fieldArr需要拼接的字段
Util.QueryStringDiffCondition = (fieldArr, conditionArr) => {
    let tempArr = condition;
    let str = `\nAND`;
    // console.log(typeof condition);
    if(typeof condition === 'string') {
        tempArr = condition.split();
    }
    for(let i = 0; i < tempArr.length; i++) {
        
    }
    // console.log('str', str);
    return str;
}
Util.GetNumber = (text) => {
    let value = text.replace(/[^0-9]/ig,""); 
    return value;
}
//数组每一项拼接用单引号字符串
Util.ArrayToStringWithComma = (arr) => {
    let sqlStr = ``;
    if(arr) {
        if(typeof arr === 'string') arr = arr.split();
        for(let i = 0; i < arr.length; i++) {
            sqlStr += `'${arr[i]}',`;
        }
        sqlStr = sqlStr.substring(0, sqlStr.length-1);
        return sqlStr;
    }
}

//数组每一项拼接用单引号字符串
Util.ArrayToStringWithNumber = (arr) => {
    let sqlStr = ``;
    if(arr) {
        if(typeof arr === 'string') arr = arr.split();
        for(let i = 0; i < arr.length; i++) {
            sqlStr += `${arr[i]},`;
        }
        sqlStr = sqlStr.substring(0, sqlStr.length-1);
        return sqlStr;
    }
}

Util.TurnToArray = (condition) => {
    let str = ``;
    if(condition) {
        if(typeof condition === 'string') {
            return str = "'{" + condition + "}'";
        } else {
            return str = "'{" + condition.join(',') + "}'";
        }
    } else {
        return str = `'{}'`;
    }
}
Util.setDate =(date) =>  {
    if(date.getFullYear) {
      let y = date.getFullYear();  
      let m = date.getMonth() + 1;  
      m = m < 10 ? '0' + m : m;  
      let d = date.getDate();  
      d = d < 10 ? ('0' + d) : d
      return y + '-' + m + '-' + d;
    }else {
      return date;
    }
}
module.exports = Util;