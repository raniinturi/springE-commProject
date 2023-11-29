import { Order } from './../../common/order';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonth: number[] = [];

  countries: Country[] = [];


  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];


  constructor(private formBuilder: FormBuilder,
              private luv2ShopFormService: Luv2ShopFormService,
              private cartService:CartService,
              private checkoutService:CheckoutService,
              private router:Router) { }

  ngOnInit(): void {

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace]),
        lastName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace]),
        email: new FormControl('',
          [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2),
                               Luv2ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2),
                              Luv2ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2),
                                  Luv2ShopValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2),
                               Luv2ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2),
                              Luv2ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2),
                              Luv2ShopValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard:  new FormControl('', [Validators.required, Validators.minLength(2), 
                                          Luv2ShopValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    //populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth:" + startMonth);

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months:" + JSON.stringify(data));
        this.creditCardMonth = data;
      }
    );

    //populate dredit card years

    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("The Retrived Credit card year:" + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    //populate countries

    this.luv2ShopFormService.getCountries().subscribe(
      data => {
        console.log("Recieved countries:" + JSON.stringify(data));
        this.countries = data;
      }
    );


  }
  reviewCartDetails() {
     // subscribe to cartService.totalQuantity
     this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
  
  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  copyShippingAddressToBillingAddress(event: Event): void {
    // Get the target checkbox element
    const target = event.target as HTMLInputElement;

    // Get references to the shipping and billing address form groups
    const shippingAddress = this.checkoutFormGroup.get('shippingAddress');
    const billingAddress = this.checkoutFormGroup.get('billingAddress');

    // Check if the checkbox is checked and if the form groups exist
    if (target.checked && shippingAddress && billingAddress) {
      // Get a copy of the shipping address value
      const shippingAddressValue = { ...shippingAddress.value };

      // Set the billing address form group value
      billingAddress.setValue({
        // Copy all properties from the shipping address value
        ...shippingAddressValue,
        // Create a copy of the state object within the shipping address
        state: { ...shippingAddressValue.state },
      });

      // Update the billingAddressStates array with the state from the billing address
      const billingState = billingAddress.get('state')?.value;
      if (billingState) {
        this.billingAddressStates = [billingState];
      } else {
        this.billingAddressStates = [];
      }

      // Log the updated values in the billing address
      console.log('Updated Billing Address:', billingAddress.value);
      console.log('Updated Billing Address States:', this.billingAddressStates);
    } else {
      // If the checkbox is not checked or form groups are missing, reset the billing address
      billingAddress?.reset();
      this.billingAddressStates = [];
    }
  }





  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    //ser up order
    const orderInstance = new Order(this.totalPrice,this.totalQuantity);
    orderInstance.totalPrice=this.totalPrice;
    orderInstance.totalQuantity=this.totalQuantity;

    //get cart items

    //create orderItems from cartItems

    //set up purchase


    //poplate purchse-customer

    //poplate purchase-shipping address

    //populate purchasse-billing address


    //poulate purchase-order and orederItems

    //call REST APT via the CheckoutService
   
  }


  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    alert(currentYear)
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);
    alert(selectedYear)

    //if th ecurrent equal to the selected year

    let startMonth: number;

    if (currentYear == selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }
    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("The Retrived month" + JSON.stringify(data));
        this.creditCardMonth = data;
      }
    );
  }

  getStates(formGroupName: string) {
    const formGroup: AbstractControl<any, any> | null = this.checkoutFormGroup.get(formGroupName);
    if (formGroup !== null) {

      const countryCode = formGroup?.value.country.code;
      const countryName = formGroup?.value.country.name;

      console.log(`${formGroupName} country code: ${countryCode}`);
      console.log(`${formGroupName} country name: ${countryName}`);

      this.luv2ShopFormService.getStates(countryCode).subscribe(
        data => {
          if (formGroupName == `shippingAddress`) {
            alert(formGroup)
            this.shippingAddressStates = data;
          } else {
            this.billingAddressStates = data;
          }
          //select first item by default
          formGroup.get('state')?.setValue(data[0]);
        }
      );
    } else {
      //handle the case where formgroup is null
      console.error('Form group is null')
    }
  }
}
