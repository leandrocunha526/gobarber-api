module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Files', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            path: {
                type: Sequelize.STRING,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    // eslint-disable-next-line no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Files');
    },
};
