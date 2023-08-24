const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

const createArray = (length) => {
    const result = [];

    for (let i = 0; i < length; i++) {
        result.push(i);
    }

    return result;
};

const createData = () => {
    const current = new Date();
    current.setDate(1);

    const startDay = current.getDay(); // Day of the week (0-6) of the 1st day
    const daysInMonth = getDaysInMonth(current);

    const weeks = createArray(Math.ceil((startDay + daysInMonth) / 7));
    const result = [];

    for (const weekIndex of weeks) {
        result.push({
            week: weekIndex + 1,
            days: []
        });

        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            const day = dayIndex + 1 + weekIndex * 7 - startDay;
            const isValid = day > 0 && day <= daysInMonth;

            result[weekIndex].days.push({
                dayOfWeek: dayIndex,
                value: isValid ? day : '',
            });
        }
    }

    return result;
};

const createHtml = (data) => {
    let result = '';

    for (const { week, days } of data) {
        let inner = "";
        inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${week}`);

        for (const { dayOfWeek, value } of days) {
            const isToday = new Date().getDate() === value;
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const isAlternate = week % 2 === 0;

            let classString = 'table__cell';
            if (isToday) classString += ' table__cell_today';
            if (isWeekend) classString += ' table__cell_weekend';
            if (isAlternate) classString += ' table__cell_alternate';

            inner = addCell(inner, classString, value);
        }

        result += `
            <tr>${inner}</tr>
        `;
    }

    return result;
};

