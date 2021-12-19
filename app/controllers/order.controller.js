const db = require("../models");
const Product = db.product;
const Transaction = db.transaction;
const Payment = db.payment;

exports.orderPage = (req, res) => {

    // Validate request
    if (!req.body.productId) {
        res.status(400).send({
            message: "Product Tidak Ada"
        });
        return;
    }

    Product.findOne({
        where: {
            product_id: req.body.productId
        }
    }).then(product => {
        if (!product) { return res.status(404).send({ message: "product tidak ditemukan" }); }

        const loginId = req.userId;
        const order = Transaction.create({
            user_id: loginId,
            product_id: req.body.productId,
            amount: product.price,
        });
        return order;
    }).then(result => {
        res.status(201).json({
          message: "Order berhasil!",
            createdOrder: {
                order_id: result.order_id,
                product_id: result.product_id,
                amount: result.amount
            }
        });
    }).catch(err => {
        res.status(500).json({
          error: err
        });
    });
};

exports.orderPageId = (req, res) => {
    const order_id = req.params.order_id;

    Transaction.findOne({
        where: {
            order_id: order_id
        }
    }).then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Transaksi tidak ditemukan dengan id=${order_id}.`
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: "Kesalahan id=" + order_id
        });
    });
};

exports.paymentPage = (req, res) => {

    const order_id = req.params.order_id;

    Transaction.findByPk(order_id)
    .then(transaction => {
        if (!transaction) { return res.status(404).send({ message: "transaction tidak ditemukan" }); }

        const data_payment = Payment.create({
            order_id: transaction.order_id,
            amount: transaction.price
        });
        return data_payment;
    }).then(result => {
        res.status(201).json({
          message: "Pembayaran berhasil!",
        });

        Transaction.update(
            { status: "PAID" },
            { where: { order_id: order_id } }
        );

    }).catch(err => {
        res.status(500).json({
          error: err
        });
    });
};