const sequelize = require("./../sequelize/sequelize");
const admins = new sequelize.db(sequelize.models.admins);
const admins_authorizations_keys = new sequelize.db(sequelize.models.admins_authorizations_keys);
//--//
const Op = sequelize.sequelize.Op;
//--//
const findUser = async function (username) {
    try {
        let email = String(username);
        let phone = String(parseInt(username));
        let findQuery = {
            [Op.or]: {
                phone: phone,
                email: email
            }
        };
        return await admins.fetchOne(findQuery);
    }
    catch (error) { return [undefined, error]; }
};
const findUser2 = async function (phone, email) {
    try {
        let findQuery = {
            [Op.or]: {
                phone: phone,
                email: email
            }
        };
        return await users.fetchOne(findQuery);
    }
    catch (error) { return [undefined, error]; }
};
const findByEmail = async function (email) {
    try {
        let findQuery = { email: email };
        return await users.fetchOne(findQuery);
    }
    catch (error) { return [undefined, error]; }
};
const findByPhone = async function (phone) {
    try {
        let findQuery = { phone: phone };
        return await users.fetchOne(findQuery);
    }
    catch (error) { return [undefined, error]; }
};
//--//
const generateOTP = async function (user_id, user_phone) {
    try { return await users_otp.create({ user_id: user_id, user_phone: user_phone }); }
    catch (error) { return [undefined, error]; }
};
const removeAuthorization = async function (authorization_id) {
    try { return await admins_authorizations_keys.destroy({ where: { id: authorization_id } }); }
    catch (error) { return [undefined, error]; }
};
const removeAuthorizations = async function (user_id) {
    try { return await admins_authorizations_keys.destroy({ where: { user_id: user_id }, force: true }); }
    catch (error) { return [undefined, error]; }
};

const checkAuthorization = async function (user_id, req) {
    try {
        admins_authorizations_keys.pro
        return await admins_authorizations_keys.findOne({
            where: {
                admin_id: user_id,
                device_type: req.body.device_type,
                device_token: req.body.device_token,
            }
        });
    }
    catch (error) { return [undefined, error]; }
};

const generateAuthorization = async function (user_id, req) {
    let body = {
        admin_id: user_id,
        device_type: req.body.device_type || null,
        device_token: req.body.device_token || null
    };
    try { return await admins_authorizations_keys.create(body); }
    catch (error) { return [undefined, error]; }
};
//--//
module.exports = {
    findUser,
    findUser2,
    findByEmail,
    findByPhone,
    generateOTP,
    removeAuthorization,
    removeAuthorizations,
    checkAuthorization,
    generateAuthorization
};
