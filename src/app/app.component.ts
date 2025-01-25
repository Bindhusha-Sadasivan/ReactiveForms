import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
      'username' : new FormControl (null, Validators.required),
      'email' : new FormControl(null,[Validators.required, Validators.email]),
      'gender': new FormControl(null)
    })
  }

  onSubmit(){
    console.log(this.signupForm)
  }
}
