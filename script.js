// 计算当前日期是第几周（周日为周起始日）
function getWeekNumber(date) {
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date - yearStart) / (24*60*60*1000)) + 1;
  const jan1Day = yearStart.getDay(); // 0=周日
  return Math.ceil((dayOfYear + jan1Day) / 7);
}

// 本周进度
function getWeekProgress(date) {
  const dayOfWeek = date.getDay(); // 0=周日
  return Math.round(((dayOfWeek + 1)/7)*100);
}

// 本年进度
function getYearProgress(date) {
  const year = date.getFullYear();
  const start = new Date(year,0,1);
  const end = new Date(year,11,31);
  const passed = date - start;
  const total = end - start + 24*60*60*1000;
  return Math.round((passed/total)*100);
}

// 剩余天数
function getRemainingDays(date) {
  const end = new Date(date.getFullYear(),11,31);
  return Math.ceil((end - date)/(24*60*60*1000));
}

// 更新左边信息栏
function updateInfo() {
  const today = new Date();
  document.getElementById('date-line').textContent = today.toISOString().slice(0,10).replace(/-/g,'/');
  document.getElementById('week-line').textContent = `第 ${getWeekNumber(today)} 周`;
  document.getElementById('week-progress-line').textContent = `本周进度：${getWeekProgress(today)}%`;
  document.getElementById('remaining-days-line').textContent = `今年剩余：${getRemainingDays(today)} 天`;
  document.getElementById('year-progress-line').textContent = `本年进度：${getYearProgress(today)}%`;
}

// 生成日历
function generateCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-11
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month+1, 0).getDate();

  // 标题
  document.getElementById('month-title').textContent = `${year} 年 ${month+1} 月`;

  // 星期行
  const weekdays = ['日','一','二','三','四','五','六'];
  const weekdaysDiv = document.getElementById('weekdays');
  weekdaysDiv.innerHTML = '';
  weekdays.forEach(d => {
    const el = document.createElement('div');
    el.textContent = d;
    weekdaysDiv.appendChild(el);
  });

  // 日历格
  const daysGrid = document.getElementById('days-grid');
  daysGrid.innerHTML = '';

  // 前置空格
  for(let i=0;i<firstDay;i++){
    daysGrid.appendChild(document.createElement('div'));
  }

  for(let d=1;d<=lastDate;d++){
    const dayDiv = document.createElement('div');
    dayDiv.textContent = d;
    dayDiv.classList.add('day');
    if(d === today.getDate()) dayDiv.classList.add('today');
    daysGrid.appendChild(dayDiv);
  }
}

// 初始化
updateInfo();
generateCalendar();
