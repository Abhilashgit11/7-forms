import { Component, OnInit, ViewChild } from '@angular/core';
import { AsyncValidatorFn, FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
@ViewChild('f') signupForm!: NgForm
deafultName = 'Abhi';
deafultEmail = 'Abhi@gmail.com';
deafultQuestion = 'pet';
// deafultQuestion = 'Your first car?';
answer!: '';
genders = ['female', 'male'];
user = {
  username: '',
  email: '',
  secretQuestion: '',
  answer: '',
  gender: ''
}
submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // Not a better approach
    // It populates all the values in the form
    // Use this when you want to populate all the values in the form
    this.signupForm.setValue({
      userData: {
        username: suggestedName,
        email: ''
      },
      secret: 'pet',
      questionAnswer: '',
      gender: 'male'
    });

    // Use this approach when you want to populate parts of your form
    /* this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    }); */
  }

  /* onSubmit(form: NgForm) {
    console.log(form);
  } */

  // Using with @Viewchild
  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;
    this.signupForm.reset();
  }

// Assignment
subscriptions = ['Basic', 'Advanced', 'Pro'];
selectedSubscription = 'Advanced';
selectedNumber = 1;
@ViewChild('assignmentSignupForm') assgmntSignupForm!: NgForm;

onNewSubmit() {
  console.log(this.assgmntSignupForm);
}  

  // For Reactive Approach
 reactiveSignupForm!: FormGroup;
 forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(){
    this.reactiveSignupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails as AsyncValidatorFn),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // this.reactiveSignupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.reactiveSignupForm.statusChanges.subscribe(
      (value) => console.log(value)
    );
    this.reactiveSignupForm.setValue({
        'userData': {
          'username': 'Max',
          'email': 'max@test.com'
        },
        'gender': 'male',
        'hobbies': []
    });

    this.reactiveSignupForm.patchValue({
      'userData': {
        'username': 'Anna',
        'email': 'max@test.com'
      }
    });

    // Reactive Form Assignment
    this.reactiveSignupFormAssignment = new FormGroup({
      'projectName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'prjectStatus': new FormControl(null)
    })
  }

  onReactiveSubmit() {
    console.log(this.reactiveSignupForm);
    this.reactiveSignupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.reactiveSignupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.reactiveSignupForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    // if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
    if (this.forbiddenUsernames.includes(control.value)) {
      return {'nameIsForbidden': true};
    }
    return {s:false};
    // return {'nameIsForbidden':null};
    // return null; // As shown in the video 15.31 we have to return null here. But it throws an error. (Need to research more)
    // return;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  // Reactive Form Assignment
  reactiveSignupFormAssignment!: FormGroup;
  projectStatus = ['Stable', 'Critical', 'Finished'];

  onReactiveAssignmentSubmit() {
    console.log('Reactive Form Assignment: ' + this.reactiveSignupFormAssignment);
    this.reactiveSignupFormAssignment.reset();
  }

}
