/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Appointments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            date: {
                type: Sequelize.DATE,
            },
            canceled_at: {
                type: Sequelize.DATE,
            },
            past: {
                type: Sequelize.STRING,
            },
            cancelable: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Appointments');
    },
};
