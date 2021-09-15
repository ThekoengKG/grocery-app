import { Product } from './product.model';



export class Cart{
    total: number;
    data: [{
        product: Product,
        itemsInCart: number
    }];
}


export class CartPublicModel{
    total: number;
    prodData: [{
        prod_id: number,
        inCart: number
    }]
}