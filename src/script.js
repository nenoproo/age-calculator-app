const dayInput = document.getElementById('day-input');
const monthInput = document.getElementById('month-input');
const yearInput = document.getElementById('year-input');
// displays
const yearsDisplay = document.getElementById('years-display');
const monthsDisplay = document.getElementById('months-display');
const daysDisplay = document.getElementById('days-display');

const submitBtn = document.getElementById('submit-button');
// error messages
const dayError = document.getElementById('day-error');
const monthError = document.getElementById('month-error');
const yearError = document.getElementById('year-error');

const date = new Date();
let currentDay = date.getDate();
let currentMonth = date.getMonth() + 1;
let currentYear = date.getFullYear();
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // an array containing number of days in each month. months[0] corresponds to January which returns 31 days

function validate() {
    const inputs = document.querySelectorAll('input'); // Select all input elements and store in a variable called inputs
    let validator = true; // креираме дифолтен валидатор кој што е true но ако најде грешка, да смени го во false
    inputs.forEach((input) => {
        const parent = input.parentElement; // gets the direct parent of that input and stores this parent element in a variable called parent - за да може да го пристапиме параграфот под конкретниот инпут
    if (!input.value) { // оваа проверка е само за доколку некој од сите инпути е празен да ги аплицира стиловите:
        parent.querySelector('label').style.color = "#FF5757";
        input.style.borderColor = "#FF5757";
        parent.querySelector('p').innerText = "This field is required";
        validator = false;
    }
    else if (input === monthInput && (monthInput.value > 12 || monthInput.value <= 0)) { // најпрвин го проверува дали инпутот е monthInput и потоа условот ги проверува во заградата вредностите
        monthInput.parentElement.querySelector('label').style.color = "#FF5757";
        monthInput.style.borderColor = "#FF5757";
        monthInput.parentElement.querySelector('p').innerText = "Must be valid month";
        validator = false;
    }
    else if (input === dayInput && (dayInput.value > 31 || dayInput.value <= 0)) {
        dayInput.parentElement.querySelector('label').style.color = "#FF5757";
        dayInput.style.borderColor = "#FF5757";
        dayInput.parentElement.querySelector('p').innerText = "Must be a valid day";
        validator = false;
    }
    else if (input === yearInput && yearInput.value > 2025) {
        yearInput.parentElement.querySelector('label').style.color = "#FF5757";
        yearInput.style.borderColor = "#FF5757";
        yearInput.parentElement.querySelector('p').innerText = "Must be in the past";
        validator = false;
    }
    else { // ако се` е во ред да си тече нормално
        input.style.borderColor = "#F0F0F0";
        parent.querySelector('p').innerText = ""; // парентот на сите инпути кој што има параграф како чајлд
    }  
    }); // Тука завршува forEach
    return validator; // функцијата на крај враќа true or false и потоа 
};

function handleSubmit(e) {
    e.preventDefault();
    // ако валидаторот е false, тогаш се` што е во овој if statement нема да се изврши, значи ако има невалиден внес, корисникот мора прво да ги исправи грешките за да може валидаторото да стане true и пресметката да се изврши
    if (validate()) {
        let birthDay = parseInt(dayInput.value);
        let birthMonth = parseInt(monthInput.value);
        let birthYear = parseInt(yearInput.value);

        if (birthDay > currentDay) {
            currentDay += months[currentMonth - 2];
            currentMonth -= 1;
        }

        if (birthMonth > currentMonth) {
            currentMonth += 12;
            currentYear -= 1;
        }

        daysDisplay.innerHTML = currentDay - birthDay;
        monthsDisplay.innerHTML = currentMonth - birthMonth;
        yearsDisplay.innerHTML = currentYear - birthYear;
    }
}

submitBtn.addEventListener('click', handleSubmit);
