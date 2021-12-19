const { authJwt } = require("../middleware");
const controller = require("../controllers/order.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.get(
        "/api/order/:id",
        [authJwt.verifyToken],
        controller.orderPageId
    );

    app.put(
        "/api/payment/:id",
        [authJwt.verifyToken],
        controller.paymentPage
    );

    app.post(
        "/api/order",
        [authJwt.verifyToken],
        controller.orderPage
    );

};