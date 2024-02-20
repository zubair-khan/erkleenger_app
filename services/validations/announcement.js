const { check, body } = require('express-validator');

const ValidationRules = {};

let isFieldValid = (field) => field && field.length > 0 && field !== " " && field != 'undefined'; // number does not have a length

ValidationRules.rule = (method) => {
    switch (method) {

        case 'create': {
            return [
                check('name').notEmpty().isString().trim().withMessage("required"),
                check('bellboy_id').isString().trim().withMessage('required'),
                check('organization_id').isInt().trim().withMessage('required'),
                check('created_by').isInt().trim().withMessage('required')
            ]
        }
        case 'list': {
            return [
                check('organization_id').isInt().trim().withMessage('required')
            ]
        }
        case 'count': {
            return [
                check('organization_id').isInt().trim().withMessage('required')
            ]
        }
        case 'request': {
            return [
                check('special_instructions').notEmpty().isString().trim().withMessage("required"),
                check('organization_id').isInt().trim().withMessage('required'),
                check('tenant_id').isInt().trim().withMessage('required')
            ]
        }
        case 'searchBellboys': {
            return [
                check('search').notEmpty().trim().withMessage('required'),
                check('organization_id').isInt().trim().withMessage('required')
            ]
        }
        case 'showRequests': {
            return [
                check('organization_id').isInt().trim().withMessage('required')
            ]
        }
    }
}

module.exports = ValidationRules;