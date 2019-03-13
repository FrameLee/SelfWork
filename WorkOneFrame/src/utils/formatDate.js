import NepaliDate  from 'nepali-date';
import moment from 'moment';
export function formatDate(originDate) {
  const date = moment(originDate, 'YYYY-MM-DD HH:mm:ss');
  const nepaliDate = new NepaliDate(date._d);
  return nepaliDate.format('YYYY-MM-DD') + ' ' + date.format('HH:mm:ss')
}
export function getNepaliRangeDate(languageType, monthLength=1) {
  if ( languageType ) {
    return {
      startDate: moment().subtract(monthLength, 'months'),
      endDate: moment(),
    }
  } else {
    const startNepaliDate = new NepaliDate();
    const month = startNepaliDate.getMonth() - monthLength;
    startNepaliDate.setMonth(month);
    return {
      startDate: moment(startNepaliDate.timestamp),
      endDate: moment(),
    }
  }
  
}