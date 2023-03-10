import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from 'src/app/shared/shared.module';

import { CourseEditComponent } from './course-edit.component';

describe('CourseEditComponent', () => {
  let component: CourseEditComponent;
  let fixture: ComponentFixture<CourseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseEditComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  */
  it('el campo nombre debería ser invalido si solo tiene 1 caracter ', () => {
    const name = component.editForm.controls['name'];
    name.setValue('R');
    expect(name.valid).toBeFalse();
  });
});
