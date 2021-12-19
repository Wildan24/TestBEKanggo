module.exports  = (sequelize, Sequelize) => {
    const Product   = sequelize.define("product", {
        product_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        product_name: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.DECIMAL
        },
        qty: {
            type: Sequelize.INTEGER
        }
    });

    return Product;
}