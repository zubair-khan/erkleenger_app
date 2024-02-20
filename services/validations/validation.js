const { validationResult } = require('express-validator');

exports.validate = async (req, res, next) => {
    let code = 500;
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (!errors.isEmpty()) {
            if (errors.array()[0].msg === 'Invalid value') {
                let err = new TypeError(`Invalid value for ${errors.array()[0].param}`)
                next(err)
            }
            else if (errors.array()[0].msg === 'required') {
                let err = new TypeError(`${errors.array()[0].param} is required`)
                next(err)
            }
            else if (errors.array()[0].msg === 'string') {
                let err = new TypeError(`${errors.array()[0].param} should be string`)
                next(err)
            }
            else if (errors.array()[0].msg === 'int') {
                let err = new TypeError(`${errors.array()[0].param} should be a number`)
                next(err)
            }
            else if (errors.array()[0].msg === 'array') {
                let err = new TypeError(`${errors.array()[0].param} should be array`)
                next(err)
            }
            else if (errors.array()[0].msg === 'invalid_value') {
                let err = new TypeError(`Invalid value for ${errors.array()[0].param}`)
                next(err)
            }
            else {
                let err = new TypeError(errors.array()[0].msg)
                next(err)
            }

            // let returnObj = { data: [], status: false, statusCode: 412, message: `Validation Error`, error: errors.array() }
            // res.status(returnObj.statusCode).send(returnObj);
        } else {
            next();
        }
    } catch (err) {
        returnObj = { data: [], status: false, statusCode: 500, message: `Bad Request`, error: [] }
        next(returnObj)
        // res.status(returnObj.statusCode).send(returnObj);
        // throw (e);
    }
}