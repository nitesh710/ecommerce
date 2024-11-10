import { Injectable } from "@angular/core";
import { CartCalc, CartItemModel } from "./cart.model";

@Injectable({providedIn: 'root'})
export class CartService {
    private cartItems: CartItemModel[] = [];
    private cartCalc: CartCalc = {
        subTotal: 0,
        shipping: 0,
        total: 0
    }

    constructor() {
        const cartItems = localStorage.getItem('cartItems');

        if(cartItems) {
            this.cartItems = JSON.parse(cartItems);
        }
    }

    getCartItems() {
        return this.cartItems;
    }

    addItemToCart(cartItem: CartItemModel) {
        let cartMenu = this.cartItems.find(menu => menu.id === cartItem.id);
        if(cartMenu) {
            cartMenu.quantity += cartItem.quantity;
            cartMenu.total = cartItem.price * cartMenu.quantity;
        } else {
            cartItem.total = cartItem.price * cartItem.quantity;
            this.cartItems.push(cartItem);
        }
        this.saveCartItems();
    }

    updateItemToCart(cartId: string, quantity: number) {
        let item = this.cartItems.find(c => c.id === cartId)!;
        item.quantity = quantity;
        item.total = item.price * item.quantity;
        this.saveCartItems();
    }

    removeItemFromCart(cartId: string) {
        this.cartItems = this.cartItems.filter(c => c.id !== cartId);
        this.saveCartItems();
    }

    getCartCalc() {
        this.cartCalc = {
            subTotal: 0,
            shipping: 0,
            total: 0
        }
        this.cartItems.map(c => this.cartCalc.subTotal += c.total);
        this.cartCalc.subTotal = +this.cartCalc.subTotal.toFixed(2);
        this.cartCalc.shipping = +(0.1 * this.cartCalc.subTotal).toFixed(2);
        this.cartCalc.total = +(this.cartCalc.subTotal + this.cartCalc.shipping).toFixed(2);
        return this.cartCalc;
    }

    getCartCount() {
        return this.cartItems.length;
    }

    clearCart() {
        this.cartItems = [];
        this.saveCartItems();
    }

    private saveCartItems() {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
}