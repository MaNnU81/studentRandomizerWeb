import DataService from "./services/data-service.js";

const service = new DataService();

function getStudents() {
    service.getStudentsData().then(studentsData => render(studentsData));
}

function orderByName() {
    service.getStudentsByName().then(studentsData => render(studentsData));
}

function orderByAge() {
    service.getStudentsByAge().then(studentsData => render(studentsData));
}

async function shuffle() {
    const studentData = await service.getShuffledStudents();
    render(studentData);
}

window.getStudents = getStudents;
window.orderByName = orderByName;
window.orderByAge = orderByAge;
window.shuffle = shuffle;

function render(data) {
    const container = document.getElementById('students-container');
    container.innerHTML = '';
    container.classList.add('father-container');

    for (let i = 0; i < data.length; i++) {
        const student = data[i];
        const studentContainer = document.createElement('div');
        studentContainer.classList.add('student-container');

        const logo = document.createElement('img');
        logo.src = './assets/dice2.webp';
        logo.classList.add('student-logo');
        studentContainer.appendChild(logo);

        const nameContainer = createTextElement("h3", `${student.name} ${student.surname}`);
        const countryContainer = createTextElement("span", `nazionalita: ${student.nationality}`);
        const genderContainer = createTextElement("span", `genere: ${student.gender}`);
        const ageContainer = createTextElement("span", `eta: ${student.getAge()}`);

        studentContainer.appendChild(nameContainer);
        studentContainer.appendChild(countryContainer);
        studentContainer.appendChild(genderContainer);
        studentContainer.appendChild(ageContainer);
        container.appendChild(studentContainer);
    }
}

function createTextElement(elementType, text) {
    const element = document.createElement(elementType);
    const node = document.createTextNode(text);
    element.appendChild(node);
    return element;
}

///POP UP////
const openPopupBtn = document.getElementById('open-popupbtn');
const popupContainer = document.getElementById('popup-container');
const closePopupBtn = document.getElementById('close-popup-btn');

openPopupBtn.addEventListener('click', () => {
    popupContainer.classList.remove('hidden');
});

closePopupBtn.addEventListener('click', () => {
    popupContainer.classList.add('hidden');
});