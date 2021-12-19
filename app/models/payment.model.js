module.exports  = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {
        payment_id: {
            allowNull: false,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        order_id: {
            type: Sequelize.INTEGER,
        },
        status: {
            type: Sequelize.DataTypes.ENUM('PAID'),
            defaultValue: 'PAID',
        },
        amount: {
            type: Sequelize.DECIMAL
        },
    });

    return Payment;
}