import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {

  paymentForm:FormGroup;
 

  constructor(
    private router: Router
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
    });
  }


  ngOnInit(): void {
    this.paymentForm=new FormGroup({
      country: new FormControl('',[Validators.required]),
      newOnCardNumber: new FormControl('',[Validators.required]),
      cardNumber: new FormControl('',[Validators.required]),
      monthANDyear: new FormControl('',[Validators.required]),
      securityCode: new FormControl('',[Validators.required]),
      postalCode: new FormControl('',[Validators.required]),
      RememberCard: new FormControl('',[Validators.required]),
    })
  }
  submitPayment(){
    if(this.paymentForm.valid){
      this.paymentForm.reset();
    }else{
    }
  }

  gotoStudentDashbordMethod(){
      this.router.navigate(['/student/studentlearning']);
  }

  // /student/studentlearning
}
