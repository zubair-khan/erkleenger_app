module.exports = function (sequelize, Sequelize) {
    let Model = sequelize.define('app_invoices', {
        id: {
            type: Sequelize.BIGINT(20).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        file_name: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
        subject: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
        application_id: {
            type: Sequelize.BIGINT(20),
            allowNull: true
        },
        folder_id: {
            type: Sequelize.BIGINT(20),
            allowNull: true
        },
        file_base64: {
            type: Sequelize.STRING('long'),
            allowNull: true
        }, 
        status: {
            type: Sequelize.ENUM('0', '1'),
            allowNull: true,
            defaultValue: '0'

        }, 
        file_base64: {
            type: Sequelize.STRING(),
            allowNull: true
        },
        response: {
            type: Sequelize.STRING(),
            allowNull: true
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: null
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: null
        },
    }, {
        tableName: 'app_invoices',
        timestamps: false,
        underscored: true,

    });
    return Model;
};
