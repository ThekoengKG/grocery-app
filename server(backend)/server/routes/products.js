var express = require('express');
var router = express.Router();
const {database} = require('../config/helpers'); 




/*Get all products*/
router.get('/', (req,res) => {
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;   // set limit of items per page
    let startV;
    let endV;


    if (page > 0) {
        startV = (page * limit) - limit;     
        endV = page * limit;                  
    } else {
        startV = 0;
        endV = 10;
    }

    database.table('products as p')
        .join([
            {
                table: "categories as c",
                on: `c.id = p.cat_id`
            }
        ])
        .withFields([
            'c.title as category',
            'p.prod_id',
            'p.name',
            'p.price',
            'p.quantity',
            'p.image',
        ])
        .slice(startV, endV)
        .sort({id: .1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({message: "No products found"});
            }
        })
        .catch(err => console.log(err));
});

//Getting one product
router.get('/:id', (req, res) => {
    let product = req.params.id;


    console.log(product);

    database.table('products as p')
        .join([
            {
                table: "categories as c",
                on: `c.id = p.cat_id`
            }
        ])
        .withFields([
            'c.title as category',
            'p.prod_id',
            'p.name',
            'p.price',
            'p.quantity',
            'p.image',
        ])
        .filter({'p.prod_id' : product})
        .get()
        .then(prod => {
            if (prod) {
                res.status(200).json(prod);
            } else {
                res.json({message: `Product id ${product} is not found`});
            }
        })
        .catch(err => console.log(err));

});


//Getting product by category name
router.get('/category/:categoryName', (req, res) => {
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;   // set limit of items per page
    let startV;
    let endV;


    if (page > 0) {
        startV = (page * limit) - limit;     
        endV = page * limit;                  
    } else {
        startV = 0;
        endV = 10;
    }

    const catName = req.params.categoryName;

    database.table('products as p')
        .join([
            {
                table: "categories as c",
                on: `c.id = p.cat_id WHERE c.title LIKE '%${catName}%' `
            }
        ])
        .withFields([
            'c.title as category',
            'p.prod_id',
            'p.name',
            'p.price',
            'p.quantity',
            'p.image',
        ])
        .slice(startV, endV)
        .sort({id: .1})
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({message: `No products matching ${catName} category`});
            }
        })
        .catch(err => console.log(err));
});

//Create Product
router.post('/add', (req, res)=> {

    let prodName = req.body.name;
    let prodPrice = req.body.price;
    let prodQuantity = req.body.quantity;
    let prodImage =  req.body.image;
    let prodCat =  req.body.cat_id

    database.table('products')
    .insert({
        name: prodName,
        price: prodPrice,
        quantity: prodQuantity,
        image: prodImage,
        cat_id: prodCat
    })
    .then(data => {
      if (data != undefined) {
          res.status(200).json({
              message: 'data inserted'
          });
      } else {
          res.json({message: "Data not inserted"});
      }
  })
  .catch(err => console.log(err));
});

//Update Product



//Delete one product
router.delete("/delete/:prodId", (req, res) => {
    let prodId = req.params.prodId;
  
    if (!isNaN(prodId)) {
      database
        .table("products")
        .filter({prod_id: prodId })
        .remove()
          .then(successNum => {
              if (successNum == 1) {
                  res.status(200).json({
                      message: `Record deleted with product id ${prodId}`,
                      status: 'success'
                  });
              } else {
                  res.status(500).json({status: 'failure', message: 'Cannot delete the product'});
            }
        })
        .catch((err) => res.status(500).json(err));
    } else {
      res
        .status(500)
        .json({ message: "ID is not a valid number", status: "failure" });
    }
  });



module.exports = router;