import { Component, DoCheck, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from './cart.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CartCalc } from './cart.model';
import { timer } from 'rxjs';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, FormsModule, LoaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, DoCheck {
  cartService = inject(CartService);
  cartItems = this.cartService.getCartItems();
  router = inject(Router)
  isLoading = true;
  cartCalc: CartCalc = {
    subTotal: 0,
    shipping: 0,
    total: 0
  }

  ngOnInit(): void {
    this.getCartCalc();
    timer(1000).subscribe(() => {
      this.isLoading = false;
    })
  }

  ngDoCheck(): void {
    if(!this.cartService.getCartCount()) {
      this.router.navigate(['/products']);
    }
  }

  removeItem(cartId: string) {
    this.cartService.removeItemFromCart(cartId);
    this.cartItems = this.cartService.getCartItems();
    this.getCartCalc();
  }

  updateCart(cartId: string, quantity: number) {
    this.cartService.updateItemToCart(cartId, quantity);
    this.getCartCalc();
  }

  getCartCalc() {
    this.cartCalc = this.cartService.getCartCalc();
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
