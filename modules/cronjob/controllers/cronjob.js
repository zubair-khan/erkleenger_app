const smsSender = require("../../../helpers/sms_sender");
const sequelize = require("../../../sequelize/sequelize");
const Op = sequelize.sequelize.Op;
const Sequelize = require('sequelize')
const commonStrings = require('../../../helpers/commonStrings.json');
const solrCore = require('../../../helpers/solrCore');
//--//

// currently depriciated not being used on any ENV because of phone no changes 
// Voucher Expired 
const voucherExpiredNotfication7daysBefore = async (req, res, next) => {
  try{
      let findQuery = {
          where:{redeemed:'0',
          [Op.and]: Sequelize.literal("DATE(expired_at) = DATE(DATE_ADD(NOW(), INTERVAL 7 DAY))"),
          },
          include: [
              {
                model: sequelize.models.ooredoo_money_vouchers,
                as: "ooredoo_money_vouchers",
                required: true
              },
            ], 
      }
      let aboutToExpiredOrders = await sequelize.models.ooredoo_money_voucher_orders.findAll(findQuery)
      if(aboutToExpiredOrders && aboutToExpiredOrders.length > 0){
          for(let order of aboutToExpiredOrders){
              let outletParentsQuery = {id:order.dataValues.ooredoo_money_vouchers.parents_id };
              let outletsParent = await solrCore.performSearch('outlets_parents', outletParentsQuery);
              let brand_name = outletsParent[0].name;
              // sending sms to customer 
              let text = commonStrings.ooredoo.expiry_notification_within_7days.replace('$[offer_name]', order.dataValues.ooredoo_money_vouchers.dataValues.offer_name).replace('$[brand_name]', brand_name);
              let phone = order.phone || "";
              let type = 0;
              let smsType = "money_voucher";
              let sms = await smsSender.sendSmsWithLogging(req, text, phone, type, smsType);
          }
          let response = "Expired Offer Sms sent";
          return next(response);
      }
      return next(404);
  }catch(error){
      return next(error);
  }
};
const voucherExpiredNotfication3daysBefore = async (req, res, next) => {
      try{
          let findQuery = {
              where:{redeemed:'0',
              [Op.and]: Sequelize.literal("DATE(expired_at) = DATE(DATE_ADD(NOW(), INTERVAL 3 DAY))"),
              },
              include: [
                  {
                    model: sequelize.models.ooredoo_money_vouchers,
                    as: "ooredoo_money_vouchers",
                    required: true
                  },
                ], 
          }
          let aboutToExpiredOrders = await sequelize.models.ooredoo_money_voucher_orders.findAll(findQuery)
          if(aboutToExpiredOrders && aboutToExpiredOrders.length > 0){
              for(let order of aboutToExpiredOrders){
                  // sending sms to customer 
                  let outletParentsQuery = {id:order.dataValues.ooredoo_money_vouchers.parents_id };
                  let outletsParent = await solrCore.performSearch('outlets_parents', outletParentsQuery);
                  let brand_name = outletsParent[0].name;
                  let text = commonStrings.ooredoo.expiry_notification_within_3days.replace('$[saving_amount]', order.saving_amount).replace('$[offer_name]', order.dataValues.ooredoo_money_vouchers.dataValues.offer_name).replace('$[brand_name]', brand_name);
                  let phone = order.phone || "";
                  let type = 0;
                  let smsType = "money_voucher";
                  let sms = await smsSender.sendSmsWithLogging(req, text, phone, type, smsType);
              }
              let response = "Expired Offer Sms sent";
              return next(response);
          }
          return next(404);
      }catch(error){
          return next(error);
      }
};
const voucherExpiredNotfication1dayBefore = async (req, res, next) => {
      try{
          let response = {
              status: 404,
              message: "No Offer found with expiry date within 1 day.",
              data: null,
              error: null,
          };
          let findQuery = {
              where:{redeemed:'0',
              [Op.and]: Sequelize.literal("DATE(expired_at) = DATE(DATE_ADD(NOW(), INTERVAL 1 DAY)) AND HOUR(expired_at) = HOUR(DATE_ADD(NOW(), INTERVAL 1 DAY))"),
              },
              include: [
                  {
                    model: sequelize.models.ooredoo_money_vouchers,
                    as: "ooredoo_money_vouchers",
                    required: true
                  },
                ], 
          }
          let aboutToExpiredOrders = await sequelize.models.ooredoo_money_voucher_orders.findAll(findQuery)
          if(aboutToExpiredOrders && aboutToExpiredOrders.length > 0){
              for(let order of aboutToExpiredOrders){
                  // sending sms to customer 
                  let outletParentsQuery = {id:order.dataValues.ooredoo_money_vouchers.parents_id };
                  let outletsParent = await solrCore.performSearch('outlets_parents', outletParentsQuery);
                  let brand_name = outletsParent[0].name;
                  let text = commonStrings.ooredoo.expiry_notification_within_1day.replace('$[offer_name]', order.dataValues.ooredoo_money_vouchers.dataValues.offer_name).replace('$[brand_name]', brand_name);
                  let phone = order.phone || "";
                  let type = 0;
                  let smsType = "money_voucher";
                  let sms = await smsSender.sendSmsWithLogging(req, text, phone, type, smsType);
              }
              let response = "Expired Offer Sms sent";
              return next(response);
          }
          return next(404);
      }catch(error){
          return next(error);
      }
};

//--//
module.exports = { voucherExpiredNotfication7daysBefore, voucherExpiredNotfication3daysBefore, voucherExpiredNotfication1dayBefore };
