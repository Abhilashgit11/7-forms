# 7Forms

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

-------------Angular tutorial from Udemy with Maximilian-----------------
-------------Angular 8 The Complete Guide-----------------

# Handling Forms in Angular can be done in two ways
1. Template Driven approach
2. Reactive Approach

## Template Driven approach

1. (15.5) Registering the form with Angular
    We add ngModel and name to the html input tags.
    like: <input type="text" id="username" class="form-control" ngModel name="username">

    This way angular knows that this values needs to be submitted.
2. Adding Local reference to submit the form
    in app.component.html
    <form (ngSubmit)="onSubmit(f)" #f="ngForm">
    in app.component.ts
    @ViewChild('f') signupForm!: NgForm
3. (15.9) Addign Validation to Form
    Since it is Template driven approach we can add validations in html only
    Added "required" , "email" to input fields
    e.g.
    <input type="text" id="username" class="form-control" ngModel name="username" required>
    <input type="email" id="email" class="form-control" ngModel name="email" required email>
    Note: Additionally, you might also want to enable HTML5 validation (by default, Angular disables it). You can do so by adding the ngNativeValidate  to a control in your template.
    Note: For list of directives: https://angular.io/api?type=directive 
4. Addign message for validation
    1. Creating a reference variable: "email"
        <input type="email" id="email" class="form-control" [ngModel] = "deafultEmail" name="email" required email #email="ngModel">
    2. With the help of reference variable email we are accessing the properties "valid" & "touched" to output a message 
    <span  *ngIf="!email.valid && email.touched">Please enter a valid value</span>
5. (15.13) Setting default values
    1. creating three properties in app.component.ts
        1. deafultName = 'Abhi';
        2. deafultEmail = 'Abhi@gmail.com';
        3. deafultQuestion = 'pet';
    2. Binding these properties in the template like this:
        1.  <button class="btn btn-default" type="button">Suggest an Username</button>
        2. <input type="email" id="email" class="form-control" [ngModel] = "deafultEmail" name="email" required email #email="ngModel">
        3. <select id="secret" class="form-control" [ngModel] = "deafultQuestion" name="secret">
6. Using two-way data binding
     <div class="form-group">
          <textarea name="questionAnswer"  rows="5" [(ngModel)] = "answer"></textarea>
    </div>
    <p>Your Reply is: {{answer}}</p>
7. (15.15) Grouping Form Controls with "ngModelGroup"
    <div id="user-data" ngModelGroup = "user-data">
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" class="form-control" [ngModel] = "deafultName" name="username" required>
        </div>
        <button class="btn btn-default" type="button">Suggest an Username</button>
        <div class="form-group">
            <label for="email">Mail</label>
            <input type="email" id="email" class="form-control" [ngModel] = "deafultEmail" name="email" required email #email="ngModel">
            <span  *ngIf="!email.valid && email.touched">Please enter a valid value</span>
        </div>
    </div>
8. Handling radio button
    <div class="radio" *ngFor="let gender of genders">
          <label>
            <input type="radio" name="gender" ngModel [value] = "gender" required> {{gender}}
          </label>
    </div>
9. settign and Patching form values
    Setting:
    this.signupForm.setValue({
      userData: {
        username: suggestedName,
        email: ''
      },
      secret: 'pet',
      questionAnswer: '',
      gender: 'male'
    });

    Patching:
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });

## Reactive approach
1. Created a FormGroup e.g.   reactiveSignupForm!: FormGroup; (app.component.ts)
2. This "reactiveSignupForm" needs to be initialized before the template is rendered. So we can initialize this in ngOnInit()
    ngOnInit(){
        this.reactiveSignupForm = new FormGroup({
        'username': new FormControl(null),
        'email': new FormControl(null),
        'gender': new FormControl('male')
        })
    }
3. Bind reactiveSignupForm to template
    e.g.  <form [formGroup]="reactiveSignupForm">
4. After that we can bind the (ngSubmit)
    e.g.  <form [formGroup]="reactiveSignupForm" (ngSubmit)="onReactiveSubmit()">
5. Adding Validation
    ngOnInit(){
    this.reactiveSignupForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'gender': new FormControl('male')
    })
   }
6. Adding a message for validation
    e.g. <span *ngIf="!reactiveSignupForm.get('username')!.valid && reactiveSignupForm.get('username')!.touched">Please enter a valid username</span>
7. Grouping Controls :  <div formGroupName="userData">
8. Reactive arrays (Need to try more approaches)
    in app.component.html
    <div formArrayName="hobbies">
      <h4>Your Hobbies</h4>
      <button btn btn-default type="button" (click)="onAddHobby()">Add Hobby</button>
      <div class="form-group" *ngFor="let hobbyControl of getControls(); let i = index">
        <input type="text" class="form-control" [formControlName]="i">
      </div>
    </div>

    in app.component.ts
    onAddHobby() {
        const control = new FormControl(null, Validators.required);
        (<FormArray>this.reactiveSignupForm.get('hobbies')).push(control);
    }

    getControls() {
        return (<FormArray>this.reactiveSignupForm.get('hobbies')).controls;
    }
9. (15.31) Custom Validators (Didnot work)
10. (15.32) Reactive Using Error Codes (Didnot work)
11. (15.33) Reactive Creating a custom Async Validator : Refer to forbiddenEmails() in app.component.ts
12. (15.34) Reacting to statusChanges and valueChanges
    1. valueChanges : we can subscribe to each and every key stroke on a particular input field
    2. statusChanges : It shows whether the complete form is valid or invalid
13. Assignment:


    