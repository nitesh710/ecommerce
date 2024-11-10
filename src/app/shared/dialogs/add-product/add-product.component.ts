import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModel } from '../../../pages/product-lists/product.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
	activeModal = inject(NgbActiveModal);

	@Input() name?: string;
	@Input() product?: ProductModel;
	@Output() returnedData: EventEmitter<any> = new EventEmitter();

	public quantity: number = 1;

	incrementQty(quantity: number) {
		++this.quantity;
	}

	decrementQty(quantity: number) {
		if(quantity > 1) {
			--this.quantity;
		}
	}

	close(product: any) {
		let data = {
			product,
			quantity: this.quantity
		}
		this.activeModal.close(data);
	}
}
