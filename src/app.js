import DataService from "./services/data-service.js";


const service = new DataService();

const studentData = service.getStudentsData()


const container = document.getElementById('students-container')

for (let i = 0; i < studentData.length; i++) {
    const student = studentData[i];
    const studentContainer = document.createElement('div');
    studentContainer.classList.add('student-container');
    const nameContainer = document.createElement('h3');
    // nameContainer.style.color = red;
    const nameNode = document.createTextNode(student.name + ' ' + student.surname);
    nameContainer.appendChild(nameNode);
    const countryContainer = document.createElement('span');
    const countryNode = document.createTextNode('nazionalita: '+ student.nationality)
    countryContainer.appendChild(countryNode);
    studentContainer.appendChild(nameContainer);
    studentContainer.appendChild(countryContainer);
    container.appendChild(studentContainer);
}

console.log(container);





