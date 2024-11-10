import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../pages/product-lists/product.service';
import { CartService } from '../../pages/cart/cart.service';
import { ProductModel } from '../../pages/product-lists/product.model';
import { DialogModalService } from '../../shared/dialogs/dialog-modal.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productService = inject(ProductService);
  cartService = inject(CartService);
  modalService = inject(DialogModalService);

  products = this.productService.getBestSellingProducts();

	open(product: ProductModel) {
    this.modalService.addToCartModal(product).then((result: any) => {
      this.addToCart(result.product, result.quantity);
    })
	}

  addToCart(product: any, quantity: number) {
    product.quantity = quantity;
    this.cartService.addItemToCart(product);
  }
}
