import { Injectable } from "@angular/core";
import { DUMMY_PRODUCTS } from "./dummy_products";

@Injectable({providedIn: 'root'})
export class ProductService {
    private products = DUMMY_PRODUCTS;

    getAllProducts() {
        return this.products;
    }

    getProduct(id: string) {
        return this.products.find(p => p.id === id)!;
    }

    getBestSellingProducts() {
        return this.products.slice(0,3);
    }
}