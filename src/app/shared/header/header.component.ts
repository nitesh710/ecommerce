import { Component, DoCheck, HostListener, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../pages/cart/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements DoCheck {
  cartService = inject(CartService);
  isScroll = false;

  cartCount = this.cartService.getCartCount();

  ngDoCheck(): void {
    this.cartCount = this.cartService.getCartCount();
  }
}
