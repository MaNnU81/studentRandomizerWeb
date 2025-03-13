import DataService from "./services/data-service.js";
///https://caniuse.com/?search=appendchild
const service = new DataService();
function getStudents() {
   const studentsPromise = service.getStudentsData()
   studentsPromise.then(studentsData => render(studentsData))
    
}

function orderByName() {
    const studentsPromise = service.getStudentsByName();
    studentsPromise.then(studentsData => render(studentsData))
}

function orderByAge() {
    service.getStudentsByAge().then(studentsData => render(studentsData))
   
}

async function shuffle() {
    const studentData = await service.getShuffledStudents();
    render(studentData);
}
window.getStudents = getStudents;
window.orderByName = orderByName;
window.orderByAge = orderByAge;
window.shuffle = shuffle;



// const studentData = service.getShuffledStudents()




function render(data) {
    const container = document.getElementById('students-container')
    container.innerHTML = '';
    container.classList.add('father-container');
    for (let i = 0; i < data.length; i++) {
        const student = data[i];
        const studentContainer = document.createElement('div');
        studentContainer.classList.add('student-container');

        // Aggiungi l'immagine del logo
        const logo = document.createElement('img');
        logo.src = './assets/dice2.webp'; // Sostituisci con il percorso del tuo logo
        logo.classList.add('student-logo');
        
        studentContainer.appendChild(logo);
        // nameContainer.style.color = red;
        // const nameContainer = document.createElement('h3');
        // const nameNode = document.createTextNode(student.name + ' ' + student.surname);
        // nameContainer.appendChild(nameNode);
        const nameContainer = createTextElement("h3", student.name + ' ' + student.surname);
        // const countryContainer = document.createElement('span');
        // const countryNode = document.createTextNode('nazionalita: ' + student.nationality);
        const countryContainer = createTextElement("span", 'nazionalita: ' + student.nationality);
        // const genderContainer = document.createElement('span');
        // const genderNode = document.createTextNode('genere: ' + student.gender)
        const genderContainer = createTextElement("span", 'genere: ' + student.gender);
        // const ageContainer = document.createElement('span');
        // const ageNode = document.createTextNode('eta: ' + student.getAge());
        const ageContainer = createTextElement("span", 'eta: ' + student.getAge());
       




        // ageContainer.appendChild(ageNode);
        // genderContainer.appendChild(genderNode);
        // countryContainer.appendChild(countryNode);
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



///To DO
//- aggiungere  genere
//- aggiungere eta
//- allineare le schede degli studenti a 2 a 2
//- rendere il sito molto bello per il docente
//- ordinare gli studenti per ordine alfabetico di nome 
