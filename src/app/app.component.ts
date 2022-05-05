import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SecondPartService } from "./second-part.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  formGroup: FormGroup;

  urlFormControl = new FormControl('https://random-data-api.com/api/restaurant/random_restaurant', [Validators.required]);
  topTenListObservable: any = null;
  topTenList = [];
  disableApiRequestButton = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private secondPartService: SecondPartService) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.topTenListObservable = this.secondPartService.topWordsObservable.subscribe(state => {
      this.topTenList = state;
      this.disableApiRequestButton = false;
    })
  }

  getErrorMessage() {
    if (this.formGroup.controls['email'].hasError('required')) {
      return 'You must enter an email';
    }

    return this.formGroup.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._snackBar.open('You entered a valid email', 'Ok', {
        duration: 3000
      });
    } else {
      this._snackBar.open(this.getErrorMessage(), 'Ok', {
        duration: 3000
      });
    }
  }

  getSummary() {
    if (this.urlFormControl.valid) {
      this.disableApiRequestButton = true;
      this.secondPartService.getSummary(this.urlFormControl.value);
    } else {
      this._snackBar.open('Please enter an URL', 'Ok', {
        duration: 3000
      });
    }

  }

  ngOnDestroy() {
    this.topTenListObservable.unsubscribe();
  }

}
