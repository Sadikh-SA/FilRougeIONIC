import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {


 // validations_form: FormGroup;

  constructor(
      public formBuilder: FormBuilder,
      private router: Router
  ) { }

  ngOnInit() {}

}
