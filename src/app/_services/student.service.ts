import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../_models/student.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  url = `${environment.ENDPOINT}/students`;

  private countries: string[] = [
    'Chile',
    'Peru',
    'Argentina',
    'Costa Rica',
    'Colombia',
    'Uruguay',
  ];

  private studentListSubject: Subject<Student[]>;

  constructor(private http: HttpClient) {
    this.studentListSubject = new Subject<Student[]>();
  }

  refreshListStudent(): void {
    this.getListStudent().subscribe((response) =>
      this.studentListSubject.next(response)
    );
  }

  getStudentListObservable() {
    return this.studentListSubject.asObservable();
  }

  getCountries() {
    return of(this.countries);
  }

  getListStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.url, student);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.url}/${student.id}`, student);
  }

  deleteStudent(id: number): Observable<Student> {
    return this.http.delete<Student>(`${this.url}/${id}`);
  }

  filterStudents(criteria: string) {
    this.getListStudent().subscribe((students) => {
      let copyStudentList = [...students];

      let filteredStudentList: Student[] = copyStudentList.filter(
        (student) =>
          student.id.toString().includes(criteria) ||
          student.name.toUpperCase().includes(criteria) ||
          student.lastName.toUpperCase().includes(criteria) ||
          student.country.toUpperCase().includes(criteria)
      );

      this.studentListSubject.next(filteredStudentList);
    });
  }
}
