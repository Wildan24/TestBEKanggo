module.exports  = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name_role: {
            type: Sequelize.STRING
        }
    });

    return Role;
}