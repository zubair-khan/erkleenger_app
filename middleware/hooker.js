const sequelize = require("./../sequelize/sequelize");
module.exports = function(param_id, param_key, required){
    return async function(req, res, next){
        try{
            let instance;
            let invalid_code = 404;
            let not_found_code = 404;
            if(required === false){
                invalid_code = 412;
                not_found_code = 422;
            }
            //--//
            param_id = String(param_id).trim().toLowerCase();
            param_key = String(param_key).trim().toLowerCase();
            //--//
            let ID = req.body[param_id];
            if(ID === null || ID === undefined){
                if(required === false){return next();}
            }
            if(ID && !isNaN(ID)){ID = Number(ID);}
            if(!ID || ID <= 0){return next(invalid_code);}
            //--//
            if(param_id === "bank_id"){
                instance = new sequelize.db(sequelize.models.banks);
            }
            if(param_id === "fund_id"){
                instance = new sequelize.db(sequelize.models.funds);
            }
            if(param_id === "manager_id"){
                instance = new sequelize.db(sequelize.models.users);
            }
            else if(param_id === "employer_id"){
                instance = new sequelize.db(sequelize.models.employers);
            }
            else if(param_id === "employee_id"){
                instance = new sequelize.db(sequelize.models.users);
            }
            else if(param_id === "funds_groups_id"){
                instance = new sequelize.db(sequelize.models.funds_groups);
            }
            //--//
            let findQuery = {
                where: {id: ID},
                include: []
            };
            if(param_id === "employee_id"){
                findQuery.include.push({
                    attributes: [],
                    required: true,
                    model: sequelize.models.employers_employees.scope("defaultScope")
                });
            }
            if(param_id === "funds_groups_id"){
                findQuery.where["employer_id"] = req.body.employer_id;
            }
            //--//
            let [data, err] = await instance.findOne(findQuery);
            if(err){return next(err);}
            if(!data || !data.id){return next(not_found_code);}
            req[param_key] = data;
            return next();
        }
        catch(error){return next(error);}
    };
};
