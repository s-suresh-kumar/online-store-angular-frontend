import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { DeepDiscountShoppingFormService } from 'src/app/services/deep-discount-shopping-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  shippingAddressChecked = false;
  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: Country[] = [];

  constructor(private formBuilder: FormBuilder,
              private deepDiscountShoppingFormService: DeepDiscountShoppingFormService) {}

  ngOnInit(): void {
   

    this.checkoutFormGroup = this.formBuilder.group({
   
    customer: this.formBuilder.group( {
      firstName: [''],
      lastName: [''],
      email: ['']
    }),
    shippingAddress: this.formBuilder.group( {
      street: [''],
      city: [''],
      state: [''],
      country: [''],
      zipCode: ['']
    }),
    billingAddress: this.formBuilder.group( {
      street: [''],
      city: [''],
      state: [''],
      country: [''],
      zipCode: ['']
    }),
    creditCard: this.formBuilder.group( {
      cardType: [''],
      nameOnCard: [''],
      cardNumber: [''],
      securityCode: [''],
      expirationMonth: [''],
      expirationYear: ['']

    })
  });

      // populate credit card months

      const startMonth: number = new Date().getMonth() + 1;
      console.log("startMonth: " + startMonth);
  
      this.deepDiscountShoppingFormService.getCreditCardMonths(startMonth).subscribe(
        data => {
          console.log("Retrieved credit card months: " + JSON.stringify(data));
          this.creditCardMonths = data;
        }
      );
  
      // populate credit card years
  
      this.deepDiscountShoppingFormService.getCreditCardYears().subscribe(
        data => {
          console.log("Retrieved credit card years: " + JSON.stringify(data));
          this.creditCardYears = data;
        }
      );

    // populate countries

    this.deepDiscountShoppingFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );

  }

  copyShippingAddressToBillingAddress() {
    this.shippingAddressChecked = !this.shippingAddressChecked;
    if (this.shippingAddressChecked) {
      this.checkoutFormGroup.controls['billingAddress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
}
else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
}
    }
  
  // copyShippingAddressToBillingAddress(event: Event) {
  //   if (event.target instanceof HTMLElement) {
  //   if(event.target.checked) {
  //     this.checkoutFormGroup.controls['billingAddress']
  //     .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
  //   } else {
  //     this.checkoutFormGroup.controls['billingAddress'].reset();
  //   }
  //   }
  // }

onSubmit() {
  console.log("Handling the  submit button");
  console.log(this.checkoutFormGroup.get('customer')?.value);
  console.log("the email address is " + this.checkoutFormGroup.get('customer')?.value.email);
}

handleMonthsAndYears() {

  const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

  const currentYear: number = new Date().getFullYear();
  const selectedYear: number  = Number(creditCardFormGroup?.value.expirationYear);

  // if the current year equals the selected year, then start with the current month

  let startMonth: number;

  if (currentYear === selectedYear) {
    startMonth = new Date().getMonth() + 1;
  }
  else {
    startMonth = 1;
  }

  this.deepDiscountShoppingFormService.getCreditCardMonths(startMonth).subscribe(
    data => {
      console.log("Retrieved credit card months: " + JSON.stringify(data));
      this.creditCardMonths = data;
    }
  );
}
}
