import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

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
  forbiddenNames:Array<string>=['Anna', 'Chris'];


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
          // 'username' : new FormControl (null, [Validators.required, this.forebiddenNames.bind(this)]),
          'username' : new FormControl (null, [Validators.required, this.forebiddenNames(this.forbiddenNames)]),
          'email' : new FormControl (null, {
            validators: [Validators.required, Validators.email],
            asyncValidators: [this.forebiddenEmails]
          }
          )
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

  // forebiddenNames(control:FormControl): any{
  //   if(this.forbiddenNames.indexOf(control.value) !==1){
  //     return {'nameIsForbidden':true};
  //   }
  //   return null;
  // }

  //This error (nameIsForbidden: true) is added on the individual form controls not on the whole general form control.
  //In general form control  errors will be displayed as null
  forebiddenNames(forbiddenNames: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (forbiddenNames.indexOf(control.value) !== -1) {
        return { nameIsForbidden: true };
      }
      return null;
    };
  }

  // forebiddenEmails(control:FormControl) : Promise<any> | Observable<any>{
  //   const promise:any = new Promise<any>((resolve, reject) => {
  //     setTimeout(() => {
  //       if(control.value === 'test@test.com')
  //         resolve({'forebiddenEmail':true});
  //       else
  //         resolve(null);
  //     },2000);
  //   });
  //   return promise;
  // }

  forebiddenEmails(control: AbstractControl): Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ forebiddenEmail: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }

}
