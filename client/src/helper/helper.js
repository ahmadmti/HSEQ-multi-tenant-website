export function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export function DateStringFormater(date) {
    var d = new Date(date);
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var yy = d.getFullYear();

    return yy + '-' + ((mm >= 10) ? mm : '0' + mm) + '-' + ((dd >= 10) ? dd : '0' + dd);
}