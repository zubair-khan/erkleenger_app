module.exports = function(app, sequelize){
    return async function(req, res, next){
        req.hookedData = {};
        app.param("user_id", async function(req, res, next, id){
            let PK_ID = parseInt(id) || 0;
            console.log("PK_ID", PK_ID);
            if(PK_ID && PK_ID > 0){
                let instance = new sequelize.db(sequelize.models.users);
                let [data, err] = await instance.findByPk(PK_ID);
                console.log("data", data);
                if(err){console.log(err);}
                req.hookedData.user = data;
            }
        });
        return next();
    };
};
