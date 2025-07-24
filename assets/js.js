function updateUTCClock() {
      const now = new Date();
      const hh = String(now.getUTCHours()).padStart(2, '0');
      const mm = String(now.getUTCMinutes()).padStart(2, '0');
      const ss = String(now.getUTCSeconds()).padStart(2, '0');
      document.getElementById('utcClock').textContent = `${hh}:${mm}:${ss} UTC`;
    }

    updateUTCClock();
    setInterval(updateUTCClock, 1000);


const monthYear = document.getElementById('month-year');
  const calendarDates = document.getElementById('calendar-dates');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  let currentDate = new Date();

  const eventsMap = {
    '2025-07': {
       3: { text: "NIGHT QUIZ", url: "../quiznight/index.html" },
      10: { text: "NIGHT QUIZ", url: "../quiznight/index.html" },
      11: { text: "POKER TOURNAMENT", url: "../poker/index.html" },
      17: { text: "NIGHT QUIZ", url: "../quiznight/index.html" },
      24: { text: "NIGHT QUIZ", url: "../quiznight/index.html" },
      31: { text: "NIGHT QUIZ", url: "../quiznight/index.html" },
      24: { text: "HOUSE OF STAKE", url: "../houseofstake/index.html" }
    },
    '2025-08': {
       7: { text: "NIGHT QUIZ", url: "#" },
      14: { text: "NIGHT QUIZ", url: "#" },
      21: { text: "NIGHT QUIZ", url: "#" },
      28: { text: "NIGHT QUIZ", url: "#" }
    }
  };

  function formatKeyUTC(date) {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
  }

  function renderCalendar(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();

    const today = new Date();
    const isCurrentMonth = year === today.getUTCFullYear() && month === today.getUTCMonth();
    const key = formatKeyUTC(date);
    const events = eventsMap[key] || {};

    monthYear.textContent = `${date.toLocaleString('default', { month: 'long', timeZone: 'UTC' })} ${year}`;
    calendarDates.innerHTML = '';

    const firstDayOfMonth = new Date(Date.UTC(year, month, 1)).getUTCDay();
    const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    const daysInPrevMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

    const totalCells = 42;
    const startDay = firstDayOfMonth;
    let day = 1;
    let nextMonthDay = 1;

    for (let i = 0; i < totalCells; i++) {
      let cellHTML = '';
      let cellClass = 'calendar-cell';
      let content = '';
      let tooltip = '';

      if (i < startDay) {
        content = daysInPrevMonth - (startDay - i - 1);
        cellClass += ' other-month';
      } else if (day <= daysInMonth) {
        content = day;
        const isToday = isCurrentMonth && day === today.getUTCDate();
        if (isToday) cellClass += ' today';

        const event = events[day];
        if (event) {
          cellClass += ' blinking';
          tooltip = `<div class="tooltip"><a href="${event.url}" target="_blank">${event.text}</a></div>`;
        }

        day++;
      } else {
        content = nextMonthDay++;
        cellClass += ' other-month';
      }

      calendarDates.innerHTML += `
        <div class="${cellClass}" tabindex="0">
          ${content}
          ${tooltip}
        </div>
      `;
    }
  }

  prevBtn.addEventListener('click', () => {
    currentDate.setUTCMonth(currentDate.getUTCMonth() - 1);
    renderCalendar(currentDate);
  });

  nextBtn.addEventListener('click', () => {
    currentDate.setUTCMonth(currentDate.getUTCMonth() + 1);
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);