export function dateToweek(createdDateString){
  let createdDate = new Date(createdDateString)
  // Jan : 0
  if (createdDate < (new Date(2023, 3, 5))){
    return 0;
  }
  if (createdDate < (new Date(2023, 3, 12))){
    return 1;
  }
  if (createdDate < (new Date(2023, 3, 25))){
    return 2;
  }
  if (createdDate < (new Date(2023, 4, 3))){
    return 3;
  }
  if (createdDate < (new Date(2023, 4, 11))){
    return 4;
  }
  if (createdDate < (new Date(2023, 4, 18))){
    //console.log(createdDate);

    return 5;
  }
  if (createdDate < (new Date(2023, 4, 25))){

    return 6;
  }
  if (createdDate < (new Date(2023, 5, 1))){
    return 7;
  }
  if (createdDate < (new Date(2023, 5, 8))){
    return 8;
  }else{
    return 9;
  }
}

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

  export function countCharacters(text) {
    var count = 0;
    
    for (var i = 0; i < text.length; i++) {
      var char = text.charAt(i);
      
      // 한글인지 확인
      if (/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(char)) {
        count += 2; // 한글은 2글자로 계산
      } else {
        count += 1; // 그 외의 경우는 1글자로 계산
      }
    }
    
    return count;
  }