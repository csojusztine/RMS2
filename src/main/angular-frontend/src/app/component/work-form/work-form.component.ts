import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.css']
})
export class WorkFormComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, public dialogRef: MatDialogRef<WorkFormComponent>, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onClear() {
    this.form.reset();
    this.initializeFormGroup();
    this.success(':: Submitted successfully');
  }

  onSubmit() {
    const url = 'http://localhost:8080/api/works/addWork';
    if (this.form.valid) {
      this.httpClient.post(url, this.form.value)
      .subscribe((result) => {
          console.log(result);
      }); 
      this.form.reset();
      this.initializeFormGroup();
      this.success(':: Submitted successfully');
      this.onClose();
    }
  }

  onClose() {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }


  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  });
  
  initializeFormGroup() {
    this.form.setValue({
      id: '',
      description: '', 
      price: '',
    });
  }


  success(msg) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, '',this.config);
  }

  
  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }


}
