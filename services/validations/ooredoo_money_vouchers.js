const {body, param, query} = require('express-validator');
const ValidationRules = {};


ValidationRules.rule = (method) => {
    switch (method) {
      // CMS validations
      case 'addOoredooMoneyVoucher': {
        return [
            body('parents_id').not().isEmpty().trim().withMessage("parents_id is required.").isInt({ min:1}).withMessage('parents_id cannot be 0'),
            body('offer_name').not().isEmpty().trim().withMessage("offer_name is required.").isLength({min: 1}).withMessage('offer_name must be at least 1 chars long'),
            body('quantity').not().isEmpty().trim().withMessage("quantity is required."),
            body('categories').isArray().withMessage("categories is required.").isLength({min: 1}).withMessage('category is required'),
            body('price').not().isEmpty().trim().withMessage("price is required."),
            body('saving_amount').not().isEmpty().trim().withMessage("saving_amount is required."),
            body('subtext').not().isEmpty().trim().withMessage("subtext is required."),
            body('details').not().isEmpty().trim().withMessage("details is required."),
            body('start_datetime').not().isEmpty().trim().withMessage("start_datetime is required."),
            body('end_datetime').not().isEmpty().trim().withMessage("end_datetime is required."),
            body('type').trim().isIn(['normal', 'ramadan']).withMessage('type must normal or ramadan'),
        ]
      }
      case 'updateOoredooMoneyVoucher': {
        return [
            body('id').not().isEmpty().trim().withMessage("id is required.").isInt({ min:1}).withMessage('id cannot be 0').isLength({min: 1}).withMessage('id must be at least 1 chars long'),
            body('parents_id').optional().trim().isInt({ min:1}).withMessage('parents_id cannot be 0'),
            body('type').optional().trim().isIn(['normal', 'ramadan']).withMessage('type must normal or ramadan'),
        ]
      }
      case 'addVoucherCategories': {
        return [
            body('name').not().isEmpty().trim().withMessage("name is required.").isLength({min: 1}).withMessage('name must be at least 1 chars long'),
            body('status').optional().trim().isIn(['0', '1']).withMessage('status must be 0 or 1')
        ]
      }
      case 'updateVoucherCategories': {
        return [
            query('id').not().isEmpty().trim().isInt({ min:1}).withMessage("id is required.").isLength({min: 1}).withMessage('id must be at least 1 chars long'),
            body('name').optional().not().isEmpty().trim().withMessage("name is required.").isLength({min: 1}).withMessage('name must be at least 1 chars long'),
            body('status').optional().trim().isIn(['0', '1']).withMessage('status must be 0 or 1')
        ]
      }
      case 'deleteVoucherCategories': {
        return [
            query('id').not().isEmpty().trim().withMessage("id is required.").isLength({min: 1}).withMessage('id must be at least 1 chars long'),
        ]
      }
      case 'checkBrandValidation': {
        return [
          query('parents_id').not().isEmpty().trim().withMessage("parents_id is required.").isInt({ min:1}).withMessage('parents_id cannot be 0').isLength({min: 1}).withMessage('parents_id must be at least 1 chars long'),
        ]
      }

      // OM Validations 
      case 'getBuyOffers': {
        return [
          query('purchaser_wallet_id').not().isEmpty().trim().withMessage("purchaser_wallet_id").isInt({ min:1}).withMessage('purchaser_wallet_id_int'),
          query('category_id').optional().not().isEmpty().trim().withMessage("category_id").isLength({min: 1}).withMessage("category_id").isInt({ min:1}).withMessage('category_id_int'),
        ]
      }
      case 'purchaseOffer': {
        return [
            body('purchaser_wallet_id').not().isEmpty().trim().withMessage("purchaser_wallet_id").isInt({ min:1}).withMessage('purchaser_wallet_id_int'),
            body('receiver_wallet_id').optional().not().isEmpty().trim().withMessage("receiver_wallet_id").isInt({ min:1}).withMessage('receiver_wallet_id_int'),
            body('quantity').not().isEmpty().trim().withMessage("quantity").isInt({ min:1}).withMessage('quantity_int'),
            body('ooredoo_money_voucher_id').not().isEmpty().trim().withMessage("ooredoo_money_voucher_id").isInt({ min:1}).withMessage('ooredoo_money_voucher_id_int'),
            body('type').trim().isIn(['self', 'gift']).withMessage('type'),
            body('price').not().isEmpty().trim().withMessage("price").isFloat({ min:1.00}).withMessage('price_float'),
            body('transaction_id').not().isEmpty().trim().withMessage("transaction_id").isInt({ min:1}).withMessage('transaction_id_int'),
        ]
      }
      case 'getPurchasedOffers': {
        return [
          query('wallet_id').not().isEmpty().trim().withMessage("wallet_id").isInt({ min:1}).withMessage('wallet_id_int')
        ]
      }
      case 'getOutletsByBrandId': {
        return [
          query('brand_id').not().isEmpty().trim().withMessage("brand_id").isInt({ min:1}).withMessage('brand_id_int')
        ]
      }
      case 'redeemOffer': {
        return [
          body('ooredoo_money_voucher_order_id').not().isEmpty().trim().withMessage("ooredoo_money_voucher_order_id").isInt({ min:1}).withMessage('ooredoo_money_voucher_order_id_int'),
          body('outlet_id').not().isEmpty().trim().withMessage("outlet_id").isInt({ min:1}).withMessage('outlet_id_int'),
          body('pin').not().isEmpty().trim().withMessage("pin").isLength({min: 4}).withMessage('pin'),
          body('receiver_wallet_id').not().isEmpty().trim().withMessage("receiver_wallet_id").isInt({ min:1}).withMessage('receiver_wallet_id_int'),
        ]
      }
      case 'voucherReconciliation': {
        return [
          query('transaction_id').not().isEmpty().trim().withMessage("transaction_id").isInt({ min:1}).withMessage('transaction_id_int'),
        ]
      }
      case 'getVoucherDetails': {
        return [
          query('ooredoo_money_voucher_id').not().isEmpty().trim().withMessage("ooredoo_money_voucher_id").isInt({ min:1}).withMessage('ooredoo_money_voucher_id_int'),
          query('purchaser_wallet_id').not().isEmpty().trim().withMessage("purchaser_wallet_id").isInt({ min:1}).withMessage('purchaser_wallet_id_int'),
        ]
      }
    }
  }
  module.exports = ValidationRules;