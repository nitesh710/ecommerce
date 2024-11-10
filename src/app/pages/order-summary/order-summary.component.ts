import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit {
  constructor(private cartService: CartService) {}
  
  ngOnInit(): void {
    this.cartService.clearCart();
  }
}
