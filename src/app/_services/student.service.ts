import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../_models/student.type';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private studentList: Student[] = [
    { id: 1, name: 'Miguel', lastName: 'Campos', country: 'Chile' },
    { id: 2, name: 'Carlos', lastName: 'Cardenas', country: 'Peru' },
    { id: 3, name: 'Jose', lastName: 'Montiel', country: 'Argentina' },
    { id: 4, name: 'Carmen', lastName: 'Navas', country: 'Costa Rica' },
    { id: 5, name: 'Radamel', lastName: 'Falcao', country: 'Colombia' },
    { id: 6, name: 'Luis', lastName: 'Suarez', country: 'Uruguay' },
  ];

  private countries: string[] = [
    'Chile',
    'Peru',
    'Argentina',
    'Costa Rica',
    'Colombia',
    'Uruguay',
  ];

  private studentListSubject: BehaviorSubject<Student[]>;
  private countriesSubject: BehaviorSubject<string[]>;
  constructor() {
    this.studentListSubject = new BehaviorSubject(this.studentList);
    this.countriesSubject = new BehaviorSubject(this.countries);
  }

  getStudentList() {
    return this.studentListSubject.asObservable();
  }

  getCountries() {
    return this.countriesSubject.asObservable();
  }

  deleteStudent(id: number) {
    let index = this.studentList.findIndex((s) => s.id == id);
    console.log(index);
    if (index >= 0) {
      console.log('entri');
      this.studentList.splice(index, 1);
      this.notifyChangeStudentList();
    }
  }

  addStudent(student: Student) {
    this.studentList.push(student);
    this.notifyChangeStudentList();
  }

  filterStudents(criteria: string) {
    let copyStudentList = [...this.studentList];

    let filteredStudentList: Student[] = copyStudentList.filter(
      (student) =>
        student.id.toString().includes(criteria) ||
        student.name.toUpperCase().includes(criteria) ||
        student.lastName.toUpperCase().includes(criteria) ||
        student.country.toUpperCase().includes(criteria)
    );

    this.studentListSubject.next(filteredStudentList);
  }

  updateStudent(student: Student) {
    let studentUpdate = this.studentList.find((s) => s.id == student.id);

    if (studentUpdate) {
      studentUpdate.name = student.name;
      studentUpdate.lastName = student.lastName;
      studentUpdate.country = student.country;
      this.notifyChangeStudentList();
    }
  }
  private notifyChangeStudentList() {
    this.studentListSubject.next(this.studentList);
  }
}
