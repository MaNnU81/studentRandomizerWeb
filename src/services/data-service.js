
import Student from "../model/student.js";

export default class DataService {
    constructor() { }

    // useResponse(response){
    //     const jsonPromise = response.json();
    //     jsonPromise.then((json) => console.log(json)
    //     );
    //     jsonPromise.catch((error) => console.log(error)
    //     );
        
    // }


    // handleError(response){
    //     console.log('brutta storia', response);
        

    // }



   async  getStudentsData() {



        // const responsePromise =  fetch("/assets/students.json");   //  oppure usare ../../assets/students.json  con i .. per tornare alle cart precedenti. invece solo / parte da roots.
        // responsePromise.then(this.useResponse);
        // responsePromise.catch(this.handleError);

        const studentsPromise = fetch("./assets/students.json")
        .then(resp => resp.json())
        .then(jsonData => {
                const students = this.createStudentsFromRowData(jsonData)
                
                return students
            }
            )
        .catch(error => console.log(error))

                                      
            return studentsPromise;

        
        


        // Funzione per capitalizzare la prima lettera
        // const capitalizeFirstLetter = (string) => {
        //     return string.charAt(0).toUpperCase() + string.slice(1);
        // };



        // // Capitalizza la prima lettera di name e surname
        // data.forEach(student => {
        //     student.name = capitalizeFirstLetter(student.name);
        //     student.surname = capitalizeFirstLetter(student.surname);
        // });

        // data.sort((a, b) => a.name.localeCompare(b.name));


        // return data;

    }

    getStudentsByName(){
        return this.getStudentsData().then( students => {
            const studentsClone = students.slice();
            studentsClone.sort((s1, s2) => s1.compareByName(s2));
            return studentsClone;
        })
        
    }

    getStudentsByAge(){

       return this.getStudentsData().then( students => {
        const studentsClone = students.slice();
        studentsClone.sort((s1, s2) => s1.compareByAge(s2));
        return studentsClone;
       })
        
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
        return shuffledStudents
    }

    shuffleArray(array){
        // const newArray = array.slice();
        // newArray.sort(() => Math.random()-0.5);
        // return newArray;
        const cloneArray = array.slice();
        const newArray = [];

        while(cloneArray.length > 0){
            const randomIndex = Math.round(Math.random() * (cloneArray.length -1));
            const randomStudent = cloneArray[randomIndex];
            newArray.push(randomStudent);
            cloneArray.splice(randomIndex, 1);
        }
        return newArray;
    }
}


