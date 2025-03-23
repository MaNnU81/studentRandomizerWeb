import DataService from "./services/data-service.js";
import Student from "./model/student.js";

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



function saveNewStudent(event) { 
    event.preventDefault()
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const birthDate = document.getElementById('yob').value;
    const yob = parseInt(birthDate.split('-')[0]); 
    const gender = document.getElementById('gender').value;
    const nationality = document.getElementById('nationality').value;

    const newStudent = new Student(name, surname, yob, gender, nationality);
   
     


    service.saveStudentToLocalStorage(newStudent);
    alert('Utente salvato con successo!');
    document.getElementById('student-form').reset();
}
document.getElementById('student-form').addEventListener('submit', saveNewStudent);

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

        const nameContainer = createTextElement(
            "h3",
            `${capitalizeFirstLetter(student.name)} ${capitalizeFirstLetter(student.surname)}`
        );
        const countryContainer = createTextElement("span", `nazionalita: ${student.nationality}`);
        const genderContainer = createTextElement("span", `genere: ${student.gender}`);
        const ageContainer = createTextElement("span", `eta: ${student.getAge()}`);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edita Studente';
        editButton.addEventListener('click', () => {
            openEditPopup(student, i);
        });

        studentContainer.appendChild(nameContainer);
        studentContainer.appendChild(countryContainer);
        studentContainer.appendChild(genderContainer);
        studentContainer.appendChild(ageContainer);
        studentContainer.appendChild(editButton); 
        container.appendChild(studentContainer);
    }
}

function createTextElement(elementType, text) {
    const element = document.createElement(elementType);
    const node = document.createTextNode(text);
    element.appendChild(node);
    return element;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

///POP UP per aggiungere Studente////
const openPopupBtn = document.getElementById('open-popupbtn');
const popupContainer = document.getElementById('popup-container');
const closePopupBtn = document.getElementById('close-popup-btn');

openPopupBtn.addEventListener('click', () => {
    popupContainer.classList.remove('hidden');
});

closePopupBtn.addEventListener('click', () => {
    popupContainer.classList.add('hidden');
});

///POP UP per editare Studente esistente////

function openEditPopup(student, index) {
    popupContainer.classList.remove('hidden');

    document.getElementById('name').value = student.name;
    document.getElementById('surname').value = student.surname;
    document.getElementById('yob').value = student.yob;
    document.getElementById('gender').value = student.gender;
    document.getElementById('nationality').value = student.nationality;

    const form = document.getElementById('student-form');
    form.onsubmit = (event) => {
        event.preventDefault();

       // Aggiorna i dati dello studente
       const updatedStudent = new Student(
        document.getElementById('name').value,
        document.getElementById('surname').value,
        parseInt(document.getElementById('yob').value),
        document.getElementById('gender').value,
        document.getElementById('nationality').value
    );

    let students = service.getStudentsFromLocalStorage();
    students[index] = updatedStudent;

       
        localStorage.setItem('students', JSON.stringify(students));

        popupContainer.classList.add('hidden');

        form.onsubmit = saveNewStudent;

        render(students);





    };

    const existingDeleteButton = document.getElementById('delete-button');
    if (existingDeleteButton) {
        existingDeleteButton.remove();
    }
    // Aggiungi il bottone "Cancella Utente"
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Cancella Utente';
    deleteButton.classList.add('bottoni'); // Usa la classe CSS esistente
    deleteButton.style.marginLeft = '10px'; // Aggiungi un po' di spazio tra i bottoni
    deleteButton.addEventListener('click', () => {
        deleteStudent(index);
    });

   
    const formContainer = form.parentElement;
    formContainer.appendChild(deleteButton);
    

    function deleteStudent(index) {

        let students = service.getStudentsFromLocalStorage();
        students.splice(index, 1);

        localStorage.setItem('students', JSON.stringify(students));
       
        popupContainer.classList.add('hidden');
        render(students);


        
    }
    
}