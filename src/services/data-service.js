import Student from "../model/student.js";

export default class DataService {
    constructor() { }

    async getStudentsData() {
        let studentsArray = [];

        // Controllo se esiste un array salvato nel localStorage
        const storedStudents = localStorage.getItem('students');
        if (storedStudents) {
            console.log("Recupero studenti dal localStorage.");
            const parsedStudents = JSON.parse(storedStudents);
            // Convertiamo ogni oggetto "plain" in una vera istanza della classe Student
            studentsArray = parsedStudents.map(student => new Student(
                student.name,
                student.surname,
                student.yob,
                student.gender,
                student.nationality,
                student.marks
            ));
        } else {
            console.log("Nessun dato nel localStorage. Recupero dal file JSON e salvo nel localStorage.");
            const studentsPromise = await fetch("./assets/students.json")
                .then(resp => resp.json())
                .then(jsonData => {
                    studentsArray = this.createStudentsFromRowData(jsonData);

                    // Salvo i dati nel localStorage per future sessioni
                    localStorage.setItem('students', JSON.stringify(studentsArray));
                    return studentsArray;
                })
                .catch(error => console.error("Errore nel recupero dei dati:", error));
        }

        return studentsArray;
    }

    getStudentsByName() {
        return this.getStudentsData().then(students => {
            const studentsClone = students.slice();
            studentsClone.sort((s1, s2) => s1.compareByName(s2)); // Funziona ora che abbiamo istanze di Student
            return studentsClone;
        });
    }

    getStudentsByAge() {
        return this.getStudentsData().then(students => {
            const studentsClone = students.slice();
            studentsClone.sort((s1, s2) => s1.compareByAge(s2));
            return studentsClone;
        });
    }

    createStudentsFromRowData(data) {
        const students = [];
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const newStudent = new Student(element.name, element.surname, element.yob, element.gender, element.nationality, element.marks);
            students.push(newStudent);
        }
        return students;
    }

    async getShuffledStudents() {
        const students = await this.getStudentsData();
        const studentsClone = students.slice();
        const shuffledStudents = this.shuffleArray(studentsClone);
        return shuffledStudents;
    }

    shuffleArray(array) {
        const cloneArray = array.slice();
        const newArray = [];

        while (cloneArray.length > 0) {
            const randomIndex = Math.round(Math.random() * (cloneArray.length - 1));
            const randomStudent = cloneArray[randomIndex];
            newArray.push(randomStudent);
            cloneArray.splice(randomIndex, 1);
        }
        return newArray;
    }
}
