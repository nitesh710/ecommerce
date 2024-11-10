export interface CartItemModel {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    total: number
}

export interface CartCalc {
    subTotal: number;
    shipping: number;
    total: number;
}
