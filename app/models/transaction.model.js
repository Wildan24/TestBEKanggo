module.exports  = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        order_id: {
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        product_id: {
            type: Sequelize.INTEGER
        },
        amount: {
            type: Sequelize.DECIMAL
        },
        status: {
            type: Sequelize.ENUM,
            values: ['PENDING']
        }
    });

    return Transaction;
}