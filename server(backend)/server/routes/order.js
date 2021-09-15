var express = require('express');
var router = express.Router();
const {database} = require('../config/helpers'); 


//Get orders
router.get('/', (req, res) => {
    database.table('order_details as od')
        .join([
            {
                table: 'orders as o',
                on: 'o.id = od.order_id'
            },
            {
                table: 'products as p',
                on: 'p.prod_id = od.product_id'
            },
            {
                table: 'users as u',
                on: 'u.id = o.user_id'
            }
        ])
        .withFields(['o.id', 'p.name', 'p.price', 'u.username'])
        .sort({id: 1})
        .getAll()
        .then(orders => {
            if (orders.length > 0) {
                res.json(orders);
            } else {
                res.json({message: "No orders found"});
            }

        }).catch(err => res.json(err));
});

//Getting one order 
router.get('/:id', async (req, res) => {
    let orderID = req.params.id;
    

    database.table('order_details as od')
        .join([
            {
                table: 'orders as o',
                on: 'o.id = od.order_id'
            },
            {
                table: 'products as p',
                on: 'p.prod_id = od.product_id'
            },
            {
                table: 'users as u',
                on: 'u.id = o.user_id'
            }
        ])
        .withFields(['o.id', 'p.name', 'p.price', 'p.image', 'od.quantity as quantityOrdered', 'u.username'])
        .filter({'o.id': orderID})
        .getAll()
        .then(orders => {
            console.log(orders);
            if (orders.length > 0) {
                res.json(orders);
            } else {
                res.json({message: `No orders matching order number ${orderID}`});
            }

        }).catch(err => res.json(err));
});


//Placing new order
router.post('/newOrder', async (req, res) => {
 
    let {userID, products} = req.body;
   
    if (userID !== null && userID > 0 && !isNaN(userID)) 
    {
        database.table('orders')
            .insert({
                user_id: userID
            }).then((newOrderId) => {

            if (newOrderId > 0) {
                products.forEach(async (p) => {
                    let data = await database.table('products')
                    .filter({prod_id: p.prod_id})
                    .withFields(['quantity']).get();
                    let inCart = p.incart;

                    // Deducting the number of orders ordered from the quantity in database
                    if (data.quantity > 0) {
                        data.quantity = data.quantity - inCart;
                        if (data.quantity < 0) {
                            data.quantity = 0;
                        }
                    } else {
                        data.quantity = 0;
                    }

                    // Insert order details for the new order created
                    database.table('order_details')
                        .insert({
                            order_id: newOrderId,
                            product_id: p.prod_id,
                            quantity: inCart
                        }).then(newId => {
                        database.table('products')
                            .filter({prod_id: p.prod_id})
                            .update({
                                quantity: data.quantity
                            }).then(successNum => {})
                            .catch(err => console.log(err));
                    }).catch(err => console.log(err));
                });

            

            } 
            else {
                res.json({message: `New order failed to update order details`, success: false})
            }
            
            res.json({
                message: `Order successfully placed with order id ${newOrderId}`,
                success: true,
                order_id: newOrderId,
                products: products
            });
           
        }).catch(err => console.log(err));
    }
    else {
        res.json({message: 'New order failed', success : false});
    }
});

//Payment Gateway
router.post('/payment', (req, res) => {
    setTimeout(() => {
        res.status(200).json({success: true});
    }, 2000)

});


module.exports = router;