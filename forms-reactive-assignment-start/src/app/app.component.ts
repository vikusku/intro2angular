import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatuses = ['Stable', 'Critical', 'Finished'];
  projectInfo: FormGroup;

  ngOnInit(): void {
    this.projectInfo = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, this.fobiddenProjectName]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail),
      'projecStatus': new FormControl('Critical'),
    })
  }

  onSubmit(): void {
    console.log(this.projectInfo);
  }

  fobiddenProjectName(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'Test') {
      return {'forbiddenProjectName': true};
    }

    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    let result = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'forbiddenProjectEmail': true});
        } else {
          resolve(null);
        }

      }, 1500)
    })

    return result;
  }

}
