module.exports  = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        order_id: {
            allowNull: false,
            autoIncrement: true,
            type: Sequelize.INTEGER,
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
            type: Sequelize.DataTypes.ENUM('PENDING', 'PAID'),
            defaultValue: 'PENDING',
        }
    });

    return Transaction;
}