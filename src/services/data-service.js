export default class DataService {
    constructor() {}

     getStudentsData() {
        const data = [
            {
                "name": "lorenzo",
                "surname": "puppo",
                "yob": 1995,
                "nationality": "italy",
                "gender": "m",
                "marks": [
                    8,
                    9,
                    10
                ]
            },
            {
                "name": "jan",
                "surname": "stigliani",
                "yob": 2000,
                "nationality": "italy",
                "gender": "m",
                "marks": [
                    7,
                    7,
                    8
                ]
            },
            {
                "name": "giovanni",
                "surname": "sussarellu",
                "yob": 1981,
                "nationality": "italy",
                "gender": "m",
                "marks": [
                    7,
                    6,
                    8
                ]
            },
            {
                "name": "sara",
                "surname": "de prà",
                "yob": 1989,
                "nationality": "italy",
                "gender": "fluid",
                "marks": [
                    9,
                    6,
                    8
                ]
            },
            {
                "name": "jeremias",
                "surname": "cedeno",
                "yob": 2003,
                "nationality": "ecuador",
                "gender": "m",
                "marks": [
                    6,
                    10,
                    7
                ]
            },
            {
                "name": "laura",
                "surname": "mazza",
                "yob": 1984,
                "nationality": "italy",
                "gender": "f",
                "marks": [
                    4,
                    2,
                    6
                ]
            },
            {
                "name": "eusebio",
                "surname": "veizi",
                "yob": 1993,
                "nationality": "albanese",
                "gender": "peanut",
                "marks": [
                    5,
                    7,
                    6
                ]
            },
            {
                "name": "hugo",
                "surname": "martinez",
                "yob": 1994,
                "nationality": "elSalvador",
                "gender": "f",
                "marks": [
                    10,
                    10,
                    8
                ]
            }
        ]
        // Funzione per capitalizzare la prima lettera
        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        // Capitalizza la prima lettera di name e surname
        data.forEach(student => {
            student.name = capitalizeFirstLetter(student.name);
            student.surname = capitalizeFirstLetter(student.surname);
        });

        data.sort((a, b) => a.name.localeCompare(b.name));
        return data;
    
}
}


