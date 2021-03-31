import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenNames = ['Anna', 'Mark'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.isForbiddenName.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.isForbiddenEmail),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([new FormControl(), new FormControl()]),
    });

    // this.signupForm.controls.userData.valueChanges.subscribe((value) => {
    //   console.log(value);
    // })

    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    })

    this.signupForm.setValue({
      'userData': {
        'username': 'Vikus',
        'email': 'vikus@test.com'
      },
      'gender': 'female',
      'hobbies': [],
    })

    this.signupForm.patchValue({
      'hobbies': ['reading', 'watching movies'],
    })
  }

  isForbiddenName(control: FormControl): { [s: string] : boolean } {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }

    return null;
  }

  isForbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    let response = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidde': true});
        }
        resolve(null);
      }, 1500);
    })

    return response;
  }

  onSubmit(): void {
    console.log(this.signupForm);
  }


  addHobby(): void {
    let hobby = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(hobby);
  }

  getHobbiesControls(): AbstractControl[] {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }
}
