import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProductService } from './product.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { CartService } from '../cart/cart.service';
import { ProductModel } from './product.model';
import { DialogModalService } from '../../shared/dialogs/dialog-modal.service';

@Component({
  selector: 'app-product-lists',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './product-lists.component.html',
  styleUrl: './product-lists.component.css'
})
export class ProductListsComponent implements OnInit  {
  productService = inject(ProductService);
  cartService = inject(CartService);
  modalService = inject(DialogModalService);

  products: ProductModel[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.getProducts();
    this.isLoading = false;
  }

	open(product: ProductModel) {
    this.modalService.addToCartModal(product).then((result: any) => {
      this.addToCart(result.product, result.quantity);
    })
	}

  addToCart(product: any, quantity: number) {
    product.quantity = quantity;
    this.cartService.addItemToCart(product);
  }

  getProducts() {
    this.products = this.productService.getAllProducts();
  }
}
