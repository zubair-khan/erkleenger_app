/*******************************************************/
//Database Functions.
/*******************************************************/
const save = async(model) =>{
    return await model.save().then(function(data){
        return data;
    }).catch(function(err){
        return {
            "code": 422,
            "error": err
        };
    });
};
const find = async(model, id) =>{
    return await model.findByPk(id);
};
const findOne = async(model, where) =>{
    return await model.findOne({
        where: where
    });
};
const fetch = async(model, where, orderWith, orderBy) =>{
    return await model.findAll({
        where: where,
        order: [[orderWith, orderBy]]
    });
};
const fetchAll = async(model, orderWith, orderBy) =>{
    return await model.findAll({
        order: [[orderWith, orderBy]]
    });
};
const find_One = async(model, query) =>{
    // added by bilal jafar
    return await model.findOne(query);
};
const find_All = async(model, query) =>{
    // added by bilal jafar
    return await model.findAll(query);
};
const remove = async(model, id) =>{
    const record = await model.findByPk(id);
    record.status = "0";
    return await record.save();
};
const customQuery = async (table, query) => {
    return await models.instance.query(query, {
        mapToModel: true,
        model: models.table,
        type: sequelize.QueryTypes.SELECT
    }).then(function (data) {
        return data;
     }).catch(function (error) {
        return {
            "code": 422,
            "error": error
        };
    });
};
/*******************************************************/
//Database Helper Functions.
/*******************************************************/
const isAvailable = async(model, where) =>{
    return await model.findOne({
        where: where
    });
};
const getUserTags = async(model, tag) =>{
    return await model.findOne({
        where: {
            tag: tag
        }
    });
};
//--------------------
const countAll = async(model, query) => {
    return await model.count(query);
};
/*******************************************************/
// Exporting Controllers.
/*******************************************************/
module.exports = {
    save,
    find,
    findOne,
    find_One,
    find_All,
    fetch,
    fetchAll,
    remove,
    isAvailable,
    getUserTags,
    customQuery,
    countAll
};
