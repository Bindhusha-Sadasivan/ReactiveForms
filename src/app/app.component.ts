import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ReactiveForms';
  genders:any = ['male','female'];
  signupForm!:FormGroup;


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
          'username' : new FormControl (null, Validators.required),
          'email' : new FormControl(null,[Validators.required, Validators.email])
      }),
      'gender': new FormControl(null),
      'hobbies' : new FormArray([]),
    })
  }

  get username(){
    // return this.signupForm.get('username');
    return this.signupForm.get('userData.username');
  }

  get email(){
    // return this.signupForm.get('email');
    return this.signupForm.get('userData.email');
  }

  get hobbies(){
    return this.signupForm.get('hobbies');
  }

  get hobbiesControls(){
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  onSubmit(){
    console.log(this.signupForm)
  }

  onClickHobbies(){
    const control = new FormControl('', Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }
}
