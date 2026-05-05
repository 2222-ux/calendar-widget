// 固定今年第一周开始日期
const firstWeekDate = new Date(2026,0,4); // 2026.1.4 周日

function getWeekNumber(date){
  const diff = date - firstWeekDate;
  const weekNum = Math.floor(diff / (7*24*60*60*1000)) + 1;
  return weekNum;
}

function getWeekProgress(date){
  return Math.round(((date.getDay()+1)/7)*100);
}

function getYearProgress(date){
  const year = date.getFullYear();
  const start = firstWeekDate;
  const end = new Date(year,11,31);
  return Math.round(((date - start)/(end - start + 24*60*60*1000))*100);
}

function getRemainingDays(date){
  const end = new Date(date.getFullYear(),11,31);
  return Math.ceil((end - date)/(24*60*60*1000));
}

function updateInfo(){
  const today = new Date();
  const weekdays = ['周日','周一','周二','周三','周四','周五','周六'];
  document.getElementById('date-line').textContent = today.toISOString().slice(0,10).replace(/-/g,'/');
  const weekNum = getWeekNumber(today);
  document.getElementById('week-day-line').textContent = `今天是第 ${weekNum} 周，${weekdays[today.getDay()]}`;
  document.getElementById('week-progress-line').textContent = `本周进度：${getWeekProgress(today)}%`;
  document.getElementById('remaining-days-line').textContent = `今年剩余：${getRemainingDays(today)} 天`;
  document.getElementById('year-progress-line').textContent = `本年进度：${getYearProgress(today)}%`;
}

function generateCalendar(){
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month+1, 0).getDate();
  const currentWeekNum = getWeekNumber(today);

  document.getElementById('month-title').textContent = `${year} 年 ${month+1} 月`;

  // 星期行
  const weekdaysDiv = document.getElementById('weekdays');
  weekdaysDiv.innerHTML = '';
  const weekdays = ['日','一','二','三','四','五','六'];
  weekdays.forEach((d,i)=>{
    const wDiv = document.createElement('div');
    wDiv.textContent = d;
    wDiv.classList.add('weekday');
    if(i===today.getDay()) wDiv.classList.add('today');
    weekdaysDiv.appendChild(wDiv);
  });

  // 日历格
  const daysGrid = document.getElementById('days-grid');
  daysGrid.innerHTML = '';

  for(let i=0;i<firstDay;i++) daysGrid.appendChild(document.createElement('div'));

  for(let d=1; d<=lastDate; d++){
    const dayDiv = document.createElement('div');
    dayDiv.textContent = d;
    dayDiv.classList.add('day');
    const dateObj = new Date(year, month, d);
    if(d===today.getDate()) dayDiv.classList.add('today');
    if(getWeekNumber(dateObj)===currentWeekNum) dayDiv.classList.add('week-highlight');
    daysGrid.appendChild(dayDiv);
  }
}

// 初始化
updateInfo();
generateCalendar();
