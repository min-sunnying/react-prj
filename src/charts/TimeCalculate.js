export function splitISO8601ToWeekly(dateString) {
    const date = new Date(dateString);
    const firstDayOfWeek = 0; // 원하는 첫 주의 시작 요일 (1: 월요일, 0: 일요일, ...)
  
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dayOfWeek = date.getDay();
  
    const diff = (dayOfWeek - firstDayOfWeek + 7) % 7;
    const firstDayOfWeekDate = new Date(year, month, day - diff);
  
    const weeklyStartDates = [];
    let currentWeekStartDate = firstDayOfWeekDate;
  
    while (currentWeekStartDate <= date) {
      weeklyStartDates.push(new Date(currentWeekStartDate));
      currentWeekStartDate.setDate(currentWeekStartDate.getDate() + 7);
    }
  
    return weeklyStartDates;
  }

export function dateCompareWeek(dateString1, dateString2){
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    if (date1 < date2) {
    console.log('date1 is before date2');
    } else if (date1 > date2) {
    console.log('date1 is after date2');
    } else {
    console.log('date1 and date2 are the same');
    }

  }