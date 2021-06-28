const date = new Date();
const day = require('../constants/date')

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

exports.getTodayDay = () => {
    return day.getDayToDay[date.getDay()]
}

