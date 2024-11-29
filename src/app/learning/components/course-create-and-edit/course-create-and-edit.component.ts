import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Course} from '../../model/course.entity';
import {FormsModule, NgForm} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-course-create-and-edit',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatButton
  ],
  templateUrl: './course-create-and-edit.component.html',
  styleUrl: './course-create-and-edit.component.css'
})
export class CourseCreateAndEditComponent {

  @Input() protected course!: Course;
  @Input() protected editMode: boolean = false;
  @Output() protected courseAdded = new EventEmitter<Course>();
  @Output() protected courseUpdated = new EventEmitter<Course>();
  @Output() protected editCancelled = new EventEmitter<void>();

  @ViewChild('courseForm', {static: false}) protected courseForm!: NgForm;
  Edit: any;

  constructor() {
    this.course = new Course({});
  }

  private resetEditState() {
    this.course = new Course({});
    this.editMode = false;
    this.courseForm.reset()
  }

  private isValid(): boolean{
    return this.courseForm.valid || false;
  }

  protected onSubmit() {
    if (this.isValid()) {
      let emiter = this.editMode ? this.courseUpdated : this.courseAdded;
      emiter.emit(this.course);
      this.resetEditState();
    } else{
      console.error('Invalid form data');
    }
  }

  protected onCancel() {
    this.editCancelled.emit();
    this.resetEditState();
  }



}
