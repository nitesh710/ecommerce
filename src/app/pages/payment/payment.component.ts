import { Component, ElementRef, inject, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { StripeFactoryService, StripeInstance, StripeService } from "ngx-stripe";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { switchMap } from "rxjs";
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart/cart.service';
import { loadStripe, StripeCardElement, StripeCardElementOptions, StripeElements } from '@stripe/stripe-js';
import { Router } from '@angular/router';

const host = 'http://localhost:7000';
declare var Stripe: any;

interface IStripeSession {
  id: string;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  public stripe: any;
  public stripeAmount!: number;
  isLoading: boolean = false;
  
  cartService = inject(CartService);

  constructor(private http: HttpClient, private stripeFactory: StripeFactoryService, private stripeService: StripeService) { }


  /* public clientSecret: string = '';
  public paymentIntentId: string = '';
  public items = [{ id: "xl-tshirt", amount: 1000 }];

  router = inject(Router); */


  ngOnInit(): void {
    this.stripe = this.stripeFactory.create(environment.stripe.publicKey)!;
    this.stripeAmount = this.cartService.getCartCalc().total;
    
    // this.initialize();
  }

  /* initialize() {
    this.http.post(host + '/create-payment-intent', { items: this.items }).subscribe((response: any) => {
      this.clientSecret = response.clientSecret;
      this.paymentIntentId = response.paymentIntentId;
      const appearance = {
        theme: 'stripe',
      };
      const elements = this.stripe.elements({ appearance, clientSecret: this.clientSecret });
    
      const paymentElementOptions = {
        layout: "tabs",
      };
  
      const paymentElement = elements.create("payment", paymentElementOptions);
      paymentElement.mount("#payment-element");
    })
  
  }

  handleSubmit() {
    this.setLoading(true);
    this.http.post(host + '/confirm-payment/' + this.paymentIntentId, { }).subscribe((response: any) => {
      this.router.navigate(['/payment-success']);
      this.setLoading(false);
    })
  }

  setLoading(isLoading: boolean) {
    if (isLoading) {
      // Disable the button and show a spinner
      this.submitBtn?.nativeElement.disabled('true');
      this.spinner?.nativeElement.classList.remove('hidden');
      this.buttonText?.nativeElement.classList.add('hidden');
    } else {
      this.submitBtn?.nativeElement.disabled('false');
      this.spinner?.nativeElement.classList.add('hidden');
      this.buttonText?.nativeElement.classList.remove('hidden');
    }
  } */

  checkout() {
    this.isLoading = true;
    this.http.post(host + '/create-checkout-session', { data: { amount: this.stripeAmount * 100 } }, { observe: 'response' })
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
      });
  }
}
