class Student {
    constructor(name, surname, yob, gender, nationality, marks =[]) {
        this.name = name;
        this.surname = surname;
        this.yob = yob;
        this.gender = gender;
        this.nationality = nationality;
        this.marks = marks;
    }
    getAge(){
        const now = new Date();
        const actualYear = now.getFullYear();
        const age = actualYear - this.yob;
        return age;
    }

    compareByName(secondStudent){
        const myName = this.name;
        const yourName = secondStudent.name;
        return myName.localeCompare(yourName);
    }
}

export default Student;