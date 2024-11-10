import { Component, inject, OnChanges, OnInit, viewChild } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { switchMap, timer } from 'rxjs';
import { BillingInfoModel } from './billing-info.model';
import { FormsModule, NgForm } from '@angular/forms';
import { BillingInfoService } from './billing-info.service';
import { PaymentComponent } from '../payment/payment.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { StripeFactoryService } from 'ngx-stripe';
import { environment } from '../environments/environment';

const host = 'http://localhost:7000';

interface IStripeSession {
  id: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [LoaderComponent, FormsModule, PaymentComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  public stripe: any;
  public stripeAmount!: number;
  isLoading: boolean = false;
  
  cartService = inject(CartService);

  constructor(private http: HttpClient, private stripeFactory: StripeFactoryService) { }

  billingInfoService = inject(BillingInfoService);
  form = viewChild.required<NgForm>('form');
  shippingForm = viewChild.required<NgForm>('shippingForm');

  cartItems = this.cartService.getCartItems();
  cartCalc = this.cartService.getCartCalc();

  ngOnInit(): void {
    this.stripe = this.stripeFactory.create(environment.stripe.publicKey)!;
    this.stripeAmount = this.cartService.getCartCalc().total;
    timer(1000).subscribe(() => {
      this.isLoading = false;
    })
    setTimeout(() => {
      this.form().setValue(this.billingInfoService.getBillingInfo());
      this.shippingForm().setValue(this.billingInfoService.getShippingInfo());
    }, 1);
  }

  onSubmit(formData: NgForm) {
    this.billingInfoService.saveBillingInfo(formData.form.value);
  }

  sameBillingAddress() {
    this.shippingForm().setValue(this.billingInfoService.getBillingInfo());
  }

  onUpdateShippingInfo(formData: NgForm) {
    this.billingInfoService.saveShippingInfo(formData.form.value);
  }

  checkout() {
    this.isLoading = true;
    this.http.post(host + '/stripe/create-checkout-session', { data: { amount: this.stripeAmount * 100 } }, { observe: 'response' })
      .pipe(
        switchMap((response: HttpResponse<Object>) => {
          const session: IStripeSession = response.body as IStripeSession;
          return this.stripe.redirectToCheckout({ sessionId: session.id });
        })
      )
      .subscribe((result: any) => {
        // If `redirectToCheckout` fails due to a browser or network
        if (result.error) {
          console.log(result.error)
        }
        this.isLoading = false;
      });
  }
}
