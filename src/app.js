import DataService from "./services/data-service.js";

///https://caniuse.com/?search=appendchild
const service = new DataService();

const studentData = service.getShuffledStudents()

const container = document.getElementById('students-container')
container.classList.add('father-container');
for (let i = 0; i < studentData.length; i++) {
    const student = studentData[i];
    const studentContainer = document.createElement('div');
    studentContainer.classList.add('student-container');

     // Aggiungi l'immagine del logo
     const logo = document.createElement('img');
     logo.src =  './assets/dice2.webp'; // Sostituisci con il percorso del tuo logo
     logo.classList.add('student-logo');
     studentContainer.appendChild(logo);


    const nameContainer = document.createElement('h3');
    // nameContainer.style.color = red;
    const nameNode = document.createTextNode(student.name + ' ' + student.surname);
    nameContainer.appendChild(nameNode);
    const countryContainer = document.createElement('span');
    const countryNode = document.createTextNode('nazionalita: '+ student.nationality);
    const genderContainer = document.createElement('span');
    const genderNode = document.createTextNode('genere: '+ student.gender)
    
    const ageContainer = document.createElement('span');
    const ageNode = document.createTextNode('eta: '+ student.getAge());


   ageContainer.appendChild(ageNode);
    genderContainer.appendChild(genderNode);
    countryContainer.appendChild(countryNode);
    studentContainer.appendChild(nameContainer);
    studentContainer.appendChild(countryContainer);
    studentContainer.appendChild(genderContainer);
    studentContainer.appendChild(ageContainer);
    container.appendChild(studentContainer);
   
}

console.log(container);





///To DO 
//- aggiungere  genere
//- aggiungere eta
//- allineare le schede degli studenti a 2 a 2 
//- rendere il sito molto bello per il docente
//- ordinare gli studenti per ordine alfabetico di nome 
