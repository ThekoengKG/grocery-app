export class Product{
    category: string;
    prod_id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    
}


export class ServerResponse {
    count: Number;
    products: Product[];
}

export class ProductModel {
    id: number;
    name: string;
    price: number;
    quantityOrdered: number;
}



