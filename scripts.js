// scripts.js

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

// Only edit below 

const createArray = (length) => {

    const result = [];

    for (let i = 0; i < length; i++) {
        result.push(i);     //Add value of 'i' to result array
    }

    return result;
}


const createData = () => {
    const current = new Date();
    current.setDate(1);

    const startDay = current.getDay();  //Returns the day of the week
    const daysInMonth = getDaysInMonth(current);

    const weeks = createArray(5);
    const days = createArray(7);
    // const value = null;
    const result = [];



    for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
        const value = {     //Declared value with const and fixed to be an object
            week: weekIndex + 1,
            days: []
        }


        for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
            const day = weekIndex * 7 + dayIndex - startDay + 1;    //calculate the day number of current day on calender
            const isValid = day > 0 && day <= daysInMonth;

            value.days.unshift({
                dayOfWeek: dayIndex + 1,
                value: isValid ? day : ""     // day if 'isValid' is true and null if false
            })
            
        }
        result.push(value);

    }
    return result;
}



const addCell = (existing, classString, value) => {
    const result = /* html */ `
        <td class=" ${classString}">
            ${value}
        </td>

        ${existing}
    `
    return result;
}

const createHtml = (data) => {
    let result = '';

    for (let week of data) {
        let inner = "";
       

        for (let day of week.days) {
            let classString = 'table__cell';
            const isToday = new Date().getDate() === day.value;
            const isWeekend = day.dayOfWeek === 1 || day.dayOfWeek === 7;
            const isAlternate = week.week % 2 === 0;

            // let classString = 'table__cell'

            if (isToday) classString = `${classString} table__cell_today`;      // correct syntax for interpolation
            if (isWeekend) classString = `${classString} table__cell_weekend`;    // correct syntax for interpolation
            if (isAlternate) classString = `${classString} table__cell_alternate`;    // correct syntax for interpolation 

            inner = addCell(inner, classString, day.value)
        }
        inner =  addCell(inner, 'table__cell table__cell_sidebar', `Week ${week.week}`);
        result += `<tr>${inner}</tr>`;
    }
    return result;
}

// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)