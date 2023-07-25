import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
    customer: this.formBuilder.group( {
      firstName: [''],
      lastName: [''],
      email: ['']
    })
    });
  }
  
onSubmit() {
  console.log("Handling the  submit button");
  console.log(this.checkoutFormGroup.get('customer')?.value);
  console.log("the email address is " + this.checkoutFormGroup.get('customer')?.value.email);
}
}
