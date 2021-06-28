const date = new Date();

exports.splitUTCFormat = (date) => {
    return date.split('T')[0]
};

exports.getMonthYear = () => {
   return `${String(date.getDate()).padStart(2, '0')}-${String(date.getFullYear())}`
};

exports.getInOneHour = () => {
 date.setHours(date.getHours()+1)
 return date;
}
