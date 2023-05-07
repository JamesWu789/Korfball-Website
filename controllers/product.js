const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
    console.log("main:post");
    const provider = req.body.provider;
    const specification = req.body.specification;
    const product = new Product(
        provider,
        idNumber,
        specification,
        quantity,
        price,
        texture,
        null);
    product
        .save()
        .then(() => {
            console.log('Created Product');
            // console.log(req.body);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProducts = (req, res, next) => {
    res.render('user/product_list')
};

exports.getEditProduct = (req, res, next) => {
    const prodID = req.params.productId;    // 就是網址後方的 /:內容
    Product.findById(prodID)            // mongodb取的ID  (Tab_page.ejs的prods._id)  //呼叫Product.findById功能
        .then(product => {
            res.render('admin/edit-product', {
                prods: product
            });
        })
        .catch(err => console.log(err));
};


exports.postEditProduct = (req, res, next) => {
    console.log("main:post:edit");
    const providerUpdate = req.body.provider;
    const idNumber = req.body.idNumber;
    const specificationUpdate = req.body.specification;
    const quantityUpdate = req.body.quantity;
    const priceUpdate = req.body.price;
    const textureUpdate = req.body.texture;
    const prodId = req.body.productId;

    const product = new Product(
        providerUpdate,
        idNumber,
        specificationUpdate,
        quantityUpdate,
        priceUpdate,
        textureUpdate,
        prodId
    );
    product
        .save()
        .then(result => {
            console.log('Update Product');
            res.redirect('/admin/product?edit=true');
        })
        .catch(err => console.log(err));
};

exports.getDeleteProduct = (req, res, next) => {
    const prodID = req.params.productId;
    Product.deleteById(prodID)
        .then(() => {
            console.log('Delete Product');
            res.redirect('/admin/product?edit=true');
        }).catch(err => console.log(err));
};
