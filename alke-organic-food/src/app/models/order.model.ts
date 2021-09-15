
export class ProductResponseModel {
    prod_id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}


export class OrderResponse {
    order_id: number;
    success: boolean;
    message: string;
    products: [{
        id: string;
        itemsInCart: string;
    }]
}