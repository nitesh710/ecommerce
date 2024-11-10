import { inject, Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductModel } from "../../pages/product-lists/product.model";
import { AddProductComponent } from "./add-product/add-product.component";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class DialogModalService {
    private modalService = inject(NgbModal);

    addToCartModal(product: ProductModel) {
        const modalRef = this.modalService.open(AddProductComponent);
        modalRef.componentInstance.product = product;
        return modalRef.result;
    }
}