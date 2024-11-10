import { Component, inject, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { RouterLink } from '@angular/router';
import { DialogModalService } from '../../../shared/dialogs/dialog-modal.service';
import { ProductModel } from '../product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  productService = inject(ProductService);
  cartService = inject(CartService);
  modalService = inject(DialogModalService);

  @Input({required: true}) id! : string;

  products = this.productService.getBestSellingProducts();

  get product() {
    return this.productService.getProduct(this.id);
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
}
